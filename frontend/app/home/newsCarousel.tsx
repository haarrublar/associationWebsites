import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './carousel/carousel' // Adjust path if needed

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'center',
}

const SLIDE_COUNT = 5
const slides = Array.from(Array(SLIDE_COUNT).keys()) // [0, 1, 2, 3, 4]

const NewsCarousel = () => {
  return (
    <div className="mx-auto w-full md:max-w-5xl lg:max-w-7xl px-0 md:px-6 lg:px-8 pt-16">
      <div className="text-center">
        <h1 className="text-2xl tracking-tight text-balance sm:text-4xl font-semibold text-gray-900 hover:bg-gray-50">
          important News
        </h1>
      </div>
      <div className="py-12">
        <EmblaCarousel slides={slides} options={carouselOptions} />
      </div>
    </div>
  )
}

export default NewsCarousel;
