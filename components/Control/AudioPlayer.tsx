import {
  PauseIcon,
  PlayIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (hasError) {
      return;
    }

    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const duration = audioRef.current.duration;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  useEffect(() => {
    const checkAudioSrc = async () => {
      try {
        const response = await fetch(src, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Audio source not found');
        }
      } catch (error) {
        setHasError(true);
      }
    };

    checkAudioSrc();

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleProgress);
      audioElement.addEventListener('ended', () => setIsPlaying(false));
      audioElement.addEventListener('error', handleError);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleProgress);
        audioElement.removeEventListener('ended', () => setIsPlaying(false));
        audioElement.removeEventListener('error', handleError);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <audio ref={audioRef} src={src}></audio>
      <div className="flex items-center justify-between mb-4">
        {hasError ? (
          <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
        ) : (
          <button onClick={togglePlayPause} className="text-blue-500">
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
        )}
        <div
          ref={progressRef}
          className={`flex-1 mx-4 bg-gray-200 h-2 rounded-full ${
            !hasError && 'cursor-pointer'
          }`}
          onClick={handleProgressClick}
        >
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
