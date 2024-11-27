import 'regenerator-runtime/runtime';
import { Button } from '@/components/ui/button';
import { MicIcon } from 'lucide-react';
import { cx } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface VoiceProps {
  input: string;
  onTranscription: (text: string) => void;
}

export function Voice({ input, onTranscription }: VoiceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [initialInput, setInitialInput] = useState(input);
  useEffect(() => {
    if (isRecording) {
      setInitialInput(input);
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      onTranscription(`${initialInput} ${transcript}`);
    }
  }, [transcript, isRecording, onTranscription, initialInput]);

  useEffect(() => {
    if (isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isRecording, resetTranscript]);

  return (
    <Button
      className={cx(
        'rounded-full p-1.5 h-fit absolute bottom-2 right-20 m-0.5 dark:border-zinc-700',
        isRecording &&
          'animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.7)] border-red-500/70',
      )}
      onClick={(event) => {
        event.preventDefault();
        setIsRecording(!isRecording);
      }}
      variant="outline"
    >
      <MicIcon size={14} color={isRecording ? 'red' : 'currentColor'} />
    </Button>
  );
}
