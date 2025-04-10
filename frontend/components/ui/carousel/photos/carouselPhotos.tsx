import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import { type EmblaOptionsType } from "embla-carousel";
import CarouselMod from "./carouselMod";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "center",
};

const SLIDE_COUNT = 15;
const slides = Array.from(Array(SLIDE_COUNT).keys()); // [0, 1, 2, 3, 4]

const CarouselPhotos = () => {
  return (
    <div className="w-full px-0 md:px-6 lg:px-8 pt-16">
      <div className="text-center">
        <h1 className="text-2xl tracking-tight text-balance sm:text-4xl font-semibold text-gray-900 hover:bg-gray-50">
          Important News
        </h1>
        <div className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          <LoremIpsum avgSentencesPerParagraph={2} />
        </div>
      </div>
      <div className="py-12">
        <CarouselMod slides={slides} options={carouselOptions} />
      </div>
    </div>
  );
};

export default CarouselPhotos;
