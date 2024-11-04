import OpenAI from 'openai';
import { Thread } from 'openai/resources/beta/threads/threads';

class OpenAIService {
  private openai: OpenAI;
  private assistantId: string;
  private thread: Thread | null = null;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID;

    if (!apiKey || apiKey.includes('your-api-key')) {
      throw new Error('OpenAI API key is not properly configured');
    }

    if (!assistantId || assistantId.includes('your-assistant-id')) {
      throw new Error('OpenAI Assistant ID is not properly configured');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
    this.assistantId = assistantId;
  }

  private validateEnvironment() {
    if (!this.openai || !this.assistantId) {
      throw new Error('OpenAI service is not properly initialized');
    }
  }

  async initThread() {
    try {
      this.validateEnvironment();
      
      if (!this.thread) {
        this.thread = await this.openai.beta.threads.create();
      }
      return this.thread;
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (error.status === 404) {
        throw new Error('Assistant not found. Please check your assistant ID.');
      }
      console.error('Error initializing thread:', error);
      throw new Error('Failed to initialize chat. Please try again.');
    }
  }

  private async wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryOperation<T>(operation: () => Promise<T>, retryCount = 0): Promise<T> {
    try {
      return await operation();
    } catch (error: any) {
      if (error.status === 401 || error.status === 404) {
        throw error; // Don't retry auth errors
      }
      if (retryCount < this.maxRetries) {
        await this.wait(this.retryDelay * Math.pow(2, retryCount));
        return this.retryOperation(operation, retryCount + 1);
      }
      throw error;
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 401) {
      return 'Authentication failed. Please check your API key.';
    }
    if (error.status === 404) {
      return 'Assistant not found. Please check your configuration.';
    }
    if (error.status === 429) {
      return 'Rate limit exceeded. Please try again in a moment.';
    }
    if (error.status >= 500) {
      return 'OpenAI service is temporarily unavailable. Please try again later.';
    }
    return 'An error occurred while processing your request. Please try again.';
  }

  async sendMessage(content: string) {
    try {
      this.validateEnvironment();

      if (!content.trim()) {
        throw new Error('Please provide a valid question or request.');
      }

      if (!this.thread) {
        await this.initThread();
      }

      // Add the message to the thread with retry
      await this.retryOperation(() => 
        this.openai.beta.threads.messages.create(
          this.thread!.id,
          { role: 'user', content }
        )
      );

      // Run the assistant with retry
      const run = await this.retryOperation(() =>
        this.openai.beta.threads.runs.create(
          this.thread!.id,
          { assistant_id: this.assistantId }
        )
      );

      // Poll for completion with timeout
      let response;
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout
      
      do {
        response = await this.retryOperation(() =>
          this.openai.beta.threads.runs.retrieve(
            this.thread!.id,
            run.id
          )
        );

        if (response.status === 'completed') {
          break;
        }

        if (response.status === 'failed') {
          throw new Error('The assistant encountered an error processing your request.');
        }

        if (response.status === 'cancelled') {
          throw new Error('The request was cancelled. Please try again.');
        }

        if (response.status === 'expired') {
          throw new Error('The request expired. Please try again.');
        }

        await this.wait(1000);
        attempts++;

        if (attempts >= maxAttempts) {
          throw new Error('Request timed out. Please try again.');
        }
      } while (response.status === 'in_progress' || response.status === 'queued');

      const messages = await this.retryOperation(() =>
        this.openai.beta.threads.messages.list(this.thread!.id)
      );
      
      const lastMessage = messages.data
        .filter(msg => msg.role === 'assistant')[0];

      if (!lastMessage?.content?.[0]?.text?.value) {
        throw new Error('No response received from assistant.');
      }

      return lastMessage.content[0].text.value;

    } catch (error: any) {
      console.error('Error in OpenAI service:', error);
      
      // Reset thread on critical errors
      if (error.status === 401 || error.status === 404 || 
          error.message?.includes('Thread not found')) {
        this.thread = null;
      }

      const errorMessage = this.getErrorMessage(error);
      throw new Error(errorMessage);
    }
  }
}

export const openAIService = new OpenAIService();