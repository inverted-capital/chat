// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'gpt-o1-mini',
    label: 'GPT o1 mini',
    apiIdentifier: 'o1-mini',
    description: 'reasoning, minified',
  },
  {
    id: 'gpt-o1-preview',
    label: 'GPT o1 preview',
    apiIdentifier: 'o1-preview',
    description: 'reasoning, full',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o';
