import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
export const MODEL_NAME = 'gpt-4-turbo';
export const API_URL = process.env.OPENAI_API_URL; 