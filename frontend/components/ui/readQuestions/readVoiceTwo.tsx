import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs'; // Correct import for animejs v4.0
import vozMp3 from './audios/audio1.mp3';
import timestamps from './audios/audio1_transcript.json';

export const Karaoke = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateHighlight = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) return;

      const time = audio.currentTime;

      const nextIndex = timestamps.findIndex((t, i) => {
        return time >= t.start && (i === timestamps.length - 1 || time < timestamps[i + 1].start);
      });

      if (nextIndex !== -1 && nextIndex !== currentIndex) {
        highlightWord(nextIndex);
        setCurrentIndex(nextIndex);
      }
    };

    const interval = setInterval(updateHighlight, 50);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const highlightWord = (index: number) => {
    const spans = containerRef.current?.querySelectorAll('span.word');
    const target = spans?.[index];
    if (!target) return;

    // Correct usage of animate with animejs v4.0
    animate(target, {
      scale: [
        { to: 1.2, ease: 'easeInOutQuad', duration: 200 },
        { to: 1, ease: 'easeInOutQuad', duration: 200 }
      ],
      color: [
        { to: '#f43f5e', duration: 100 },
        { to: '#000000', duration: 300, delay: 100 }
      ],
      ease: 'linear',
      rotateY: [-30, 0],
    });
  }

  const playAudio = () => {
    setCurrentIndex(null);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="flex flex-wrap gap-2 leading-relaxed"
      >
        {timestamps.map((item, i) => (
          <span
            key={i}
            className="word inline-block"
            style={{ display: 'inline-block' }}
          >
            {item.word}
          </span>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={playAudio}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
        >
          Reproducir voz & Resaltar texto
        </button>

        <audio ref={audioRef} src={vozMp3} hidden controls />
      </div>
    </div>
  );
};