import React, { useRef, useEffect } from "react";
import { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../carouselAutoPlay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../carouseArrowButtons";
import { DotButton, useDotButton } from "../carouselDotButtons";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  
  // Shared autoplay instance
  const autoplay1 = Autoplay({ playOnInit: true, delay: 3000 });
  const autoplay2 = Autoplay({ playOnInit: true, delay: 3000 });
  
  // Initialize both carousels
  const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [autoplay1]);
  const [emblaRef2, emblaApi2] = useEmblaCarousel(options, [autoplay2]);

  // Use first carousel's API for controls
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi1);
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(emblaApi1);

  // Synchronization effect with proper TypeScript typing
// Synchronization effect - fixed version
useEffect(() => {
  if (!emblaApi1 || !emblaApi2) return;

  // Initialize sync in both directions
  const sync1to2 = () => emblaApi2.scrollTo(emblaApi1.selectedScrollSnap());
  const sync2to1 = () => emblaApi1.scrollTo(emblaApi2.selectedScrollSnap());

  // Set up bidirectional synchronization
  emblaApi1.on('select', sync1to2);
  emblaApi2.on('select', sync2to1);

  // Cleanup
  return () => {
    emblaApi1.off('select', sync1to2);
    emblaApi2.off('select', sync2to1);
  };
}, [emblaApi1, emblaApi2]);

// Autoplay initialization - fixed version
useEffect(() => {
  if (!emblaApi1 || !emblaApi2) return;

  // Force both carousels to start at same slide
  const initialSlide = 0;
  emblaApi1.scrollTo(initialSlide);
  emblaApi2.scrollTo(initialSlide);

  // Start autoplay on both
  const autoplay1 = emblaApi1.plugins().autoplay;
  const autoplay2 = emblaApi2.plugins().autoplay;
  
  autoplay1?.play();
  autoplay2?.play();

  // Cleanup
  return () => {
    autoplay1?.stop();
    autoplay2?.stop();
  };
}, [emblaApi1, emblaApi2]);

  return (
    <div className="dual-carousel-container">
      <div className="embla pb-2">
        <div className="embla__viewport" ref={emblaRef1}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide_photo" key={index}>
                <div className="embla__slide__number_photo">
                  <span>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef2}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide_photo" key={index}>
                <div className="embla__slide__number_photo">
                  <span>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shared Controls */}
      <div className="embla__controls_photo">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => {
                onDotButtonClick(index);
                emblaApi1?.scrollTo(index);
                emblaApi2?.scrollTo(index);
              }}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;