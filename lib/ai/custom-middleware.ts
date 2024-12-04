import type { Experimental_LanguageModelV1Middleware } from 'ai';

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  transformParams({ params }) {
    let { mode } = params;
    if ('tools' in mode) {
      const { tools, ...rest } = mode;
      mode = rest;
    }

    const prompt = params.prompt.filter((message) => {
      if (message.role === 'system') {
        return false;
      }
      return true;
    });
    return Promise.resolve({ ...params, mode, prompt });
  },
};
