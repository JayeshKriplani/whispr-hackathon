import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles } from 'lucide-react';

interface AIVoiceMessageProps {
  onMessageGenerated?: (audioUrl: string) => void;
}

export function AIVoiceMessage({ onMessageGenerated }: AIVoiceMessageProps) {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVoiceMessage = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call your AI text-to-speech service
      // For example, using OpenAI's TTS API or ElevenLabs
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      const { audioUrl } = await response.json();
      onMessageGenerated?.(audioUrl);
      setText('');
    } catch (error) {
      console.error('Failed to generate voice message:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-card">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message to be converted to voice..."
        className="min-h-[100px]"
      />
      <Button
        onClick={generateVoiceMessage}
        disabled={!text.trim() || isGenerating}
        className="w-full"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {isGenerating ? 'Generating Voice...' : 'Generate AI Voice Message'}
      </Button>
    </div>
  );
}
