import { getKey } from '../utils/keys.js';
import { strictFormat } from '../utils/text.js';

export class GitHubCopilot {
    static prefix = 'github-copilot';
    
    constructor(model_name, url, params) {
        this.model_name = model_name || 'gpt-4o';
        this.params = params;
        this.url = url || 'https://api.githubcopilot.com';
        this.copilot_token = null;
        this.token_expires_at = null;
    }

    async getToken() {
        // Check if we have a valid token
        if (this.copilot_token && this.token_expires_at) {
            const expiresAt = new Date(this.token_expires_at);
            const now = new Date();
            // Refresh token if it expires in less than 5 minutes
            if (expiresAt > new Date(now.getTime() + 5 * 60000)) {
                return this.copilot_token;
            }
        }

        // Get new token from GitHub
        const accessToken = getKey('GITHUB_COPILOT_ACCESS_TOKEN');
        
        try {
            const response = await fetch('https://api.github.com/copilot_internal/v2/token', {
                method: 'GET',
                headers: {
                    'Authorization': `token ${accessToken}`,
                    'Accept': 'application/json',
                    'User-Agent': 'GitHubCopilotChat/0.22.4'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get Copilot token: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            this.copilot_token = data.token;
            this.token_expires_at = new Date(data.expires_at * 1000).toISOString();
            
            console.log('✓ GitHub Copilot token obtained successfully');
            return this.copilot_token;
        } catch (err) {
            console.error('Error fetching GitHub Copilot token:', err.message);
            throw new Error('Failed to authenticate with GitHub Copilot. Check your GITHUB_COPILOT_ACCESS_TOKEN in keys.json');
        }
    }

    async sendRequest(turns, systemMessage, stop_seq='***') {
        let messages = [{'role': 'system', 'content': systemMessage}].concat(turns);
        messages = strictFormat(messages);
        
        const token = await this.getToken();
        
        try {
            console.log('Awaiting GitHub Copilot api response from model', this.model_name);
            
            const response = await fetch(`${this.url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Editor-Version': 'vscode/1.95.0',
                    'Editor-Plugin-Version': 'copilot-chat/0.22.4',
                    'Copilot-Integration-Id': 'vscode-chat',
                    'User-Agent': 'GitHubCopilotChat/0.22.4'
                },
                body: JSON.stringify({
                    model: this.model_name,
                    messages: messages,
                    temperature: this.params?.temperature || 0.7,
                    max_tokens: this.params?.max_tokens || 4096,
                    stream: false,
                    stop: [stop_seq]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`GitHub Copilot API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Received.');
            
            if (!data.choices || data.choices.length === 0) {
                throw new Error('No response from GitHub Copilot');
            }

            let res = data.choices[0].message.content;
            let stop_seq_index = res.indexOf(stop_seq);
            res = stop_seq_index !== -1 ? res.slice(0, stop_seq_index) : res;
            
            return res;
        } catch (err) {
            if (err.message.includes('context') && turns.length > 1) {
                console.log('Context length exceeded, trying again with shorter context.');
                return await this.sendRequest(turns.slice(1), systemMessage, stop_seq);
            } else {
                console.error('GitHub Copilot error:', err.message);
                return 'My brain disconnected, try again.';
            }
        }
    }

    async sendVisionRequest(messages, systemMessage, imageBuffer) {
        const imageMessages = [...messages];
        imageMessages.push({
            role: "user",
            content: [
                { type: "text", text: systemMessage },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
                    }
                }
            ]
        });

        const token = await this.getToken();

        try {
            console.log('Awaiting GitHub Copilot vision api response from model', this.model_name);
            
            const response = await fetch(`${this.url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Editor-Version': 'vscode/1.95.0',
                    'Editor-Plugin-Version': 'copilot-chat/0.22.4',
                    'Copilot-Integration-Id': 'vscode-chat',
                    'User-Agent': 'GitHubCopilotChat/0.22.4'
                },
                body: JSON.stringify({
                    model: this.model_name,
                    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...imageMessages],
                    temperature: this.params?.temperature || 0.7,
                    max_tokens: this.params?.max_tokens || 4096,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`GitHub Copilot Vision API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Received vision response.');
            
            return data.choices[0].message.content;
        } catch (err) {
            console.error('GitHub Copilot vision error:', err.message);
            return 'Vision processing failed.';
        }
    }

    async embed(text) {
        // GitHub Copilot doesn't provide embeddings API
        // Return null to trigger word overlap fallback in examples.js
        return null;
    }
}
