import type { Experimental_LanguageModelV1Middleware } from 'ai';

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  transformParams({ params }) {
    console.dir(params);
    const prompt = params.prompt.map((message) => {
      // TODO check 'system' role to 'developer'
      // if (message.role === 'system') {
      //   message.role = 'developer';
      // }
      return message;
    });
    return Promise.resolve({ ...params, prompt });
  },
};
