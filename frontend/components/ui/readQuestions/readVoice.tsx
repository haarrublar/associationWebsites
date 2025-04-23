import React, { useRef, useEffect } from 'react';
import { animate } from 'animejs';

const text = "Hola, esta es una prueba";

export const Karaoke = () => {
  const words = text.split(" ");
  const containerRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakAndHighlight = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Mónica is Spanish from Spain

    // Try to get the voice named "Mónica"
    const voice = speechSynthesis.getVoices().find(v => v.name === "Eddy");
    if (voice) utterance.voice = voice;

    const spans = containerRef.current?.querySelectorAll('span.word');
    let wordIndex = 0;

    utterance.onboundary = (event) => {
      if (event.name === 'word' && spans && wordIndex < spans.length) {
        const current = spans[wordIndex];

        animate(current, {
          scale: [
            { to: 1.3, duration: 150, ease: 'outExpo' },
            { to: 1, duration: 300, ease: 'outBounce' }
          ],
          color: [
            { to: '#f43f5e', duration: 100 },
            { to: '#000000', delay: 400 }
          ]
        });

        wordIndex++;
      }
    };

    speechSynthesis.cancel();
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll("span.word");
    spans?.forEach((span) => {
      const el = span as HTMLElement;
      el.style.color = "#000";
      el.style.display = "inline-block";
    });

    // preload voices
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => {};
    }
  }, []);

  return (
    <div className="p-6 text-xl leading-loose">
      <div ref={containerRef}>
        {words.map((word, i) => (
          <span key={i} className="word mr-2">{word}</span>
        ))}
      </div>
      <button
        onClick={speakAndHighlight}
        className="mt-6 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Speak & Highlight
      </button>
    </div>
  );
};
