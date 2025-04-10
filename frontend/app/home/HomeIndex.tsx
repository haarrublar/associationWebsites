import Hero from "./hero";
import PartnersLogos from "./partners";
import NewsCarousel from "./newsCarousel";
import Blog from "~/blog/blog";
import Calendar from "components/ui/calendar/calendarStr";
import { GridBoard } from "components/ui/grid/grid";
import CarouselPhotos from "components/ui/carousel/photos/carouselPhotos";
import Categories from "components/ui/categories/categories";

export default function HomeIndex() {

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-9/10">
        <PartnersLogos />
        <NewsCarousel />
        <Blog />
        <Calendar />
        <GridBoard />
        <CarouselPhotos />
        <Categories />
      </div>
    </>
  );
}