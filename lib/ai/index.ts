import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string) => {
  if (apiIdentifier.includes('o1')) {
    return wrapLanguageModel({
      model: openai(apiIdentifier),
      middleware: customMiddleware,
    });
  }

  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: {},
  });
};
