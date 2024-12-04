import { assert } from 'node:console';
import { auth } from '@/app/(auth)/auth';
import { OpenAI } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('missing openai api key: OPENAI_API_KEY');
}
const ai = new OpenAI({ apiKey, maxRetries: 5 });

export const maxDuration = 60;

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const formData = await request.formData();
  const audio = formData.get('audio') as File;
  assert(audio, 'audio is required');

  const transcription = await ai.audio.transcriptions.create({
    file: audio,
    model: 'whisper-1',
    prompt:
      'Backchat, GPT4, GPT3, Dreamcatcher, CRM, HAL, Deno, Stucks, Redlid, Pijul',
  });

  return Response.json({ text: transcription.text }, { status: 200 });
}
