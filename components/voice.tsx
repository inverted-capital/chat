'use client';

import 'regenerator-runtime/runtime';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { MicIcon } from 'lucide-react';
import { cx } from 'class-variance-authority';
import { useEffect, useState, useRef } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface VoiceProps {
  input: string;
  onTranscription: (text: string) => void;
}

export function Voice({ input, onTranscription }: VoiceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [initialInput, setInitialInput] = useState(input);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const lastTranscriptTimeRef = useRef<Date | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isRecording) {
      setInitialInput(input);
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      // Update the last transcript time whenever a new transcript arrives
      lastTranscriptTimeRef.current = new Date();
      onTranscription(`${initialInput} ${transcript}`);
    }
  }, [transcript, isRecording, onTranscription, initialInput]);

  useEffect(() => {
    if (isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      startAudioRecording();
    } else {
      SpeechRecognition.stopListening();
      stopAudioRecording();
    }
  }, [isRecording, resetTranscript]);

  // Effect to monitor silence periods
  // useEffect(() => {
  //   let silenceInterval: NodeJS.Timeout;
  //   if (isRecording) {
  //     silenceInterval = setInterval(() => {
  //       if (lastTranscriptTimeRef.current) {
  //         const now = new Date();
  //         const diff = now.getTime() - lastTranscriptTimeRef.current.getTime();
  //         if (diff > 2000) {
  //           // 2 seconds of silence detected
  //           stopAudioRecording();
  //           sendAudioToTranscribe();
  //           // Reset for the next recording session
  //           startAudioRecording();
  //           lastTranscriptTimeRef.current = null;
  //         }
  //       }
  //     }, 1000); // Check every second
  //   }
  //   return () => clearInterval(silenceInterval);
  // }, [isRecording]);

  const startAudioRecording = async () => {
    if (navigator.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
    } else {
      console.error('getUserMedia is not supported on your browser!');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const sendAudioToTranscribe = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    audioChunksRef.current = []; // Reset for next recording

    // Prepare form data for API request
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    const transcribe = fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });
    toast.promise(transcribe, {
      loading: 'Transcribing...',
      success: async (response) => {
        const data = await response.json();
        if (data.text) {
          // Replace the current transcription with the high-quality transcription
          onTranscription(`${initialInput} ${data.text}`);
        }

        return 'Transcribed!';
      },
      error: 'Failed to transcribe.',
    });
  };

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
