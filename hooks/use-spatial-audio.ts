import { useEffect, useRef } from 'react';

export function useSpatialAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pannerRef = useRef<PannerNode | null>(null);

  useEffect(() => {
    // Initialize audio context and panner on component mount
    audioContextRef.current = new AudioContext();
    pannerRef.current = audioContextRef.current.createPanner();
    
    // Configure spatial audio settings
    if (pannerRef.current) {
      pannerRef.current.panningModel = 'HRTF';
      pannerRef.current.distanceModel = 'inverse';
      pannerRef.current.refDistance = 1;
      pannerRef.current.maxDistance = 10000;
      pannerRef.current.rolloffFactor = 1;
      pannerRef.current.coneInnerAngle = 360;
      pannerRef.current.coneOuterAngle = 0;
      pannerRef.current.coneOuterGain = 0;
    }

    return () => {
      // Cleanup on unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createSpatialAudioStream = async (stream: MediaStream) => {
    if (!audioContextRef.current || !pannerRef.current) return null;

    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(pannerRef.current);
    pannerRef.current.connect(audioContextRef.current.destination);

    return source;
  };

  const updatePosition = (x: number, y: number, z: number) => {
    if (pannerRef.current) {
      pannerRef.current.setPosition(x, y, z);
    }
  };

  return {
    createSpatialAudioStream,
    updatePosition,
  };
}
