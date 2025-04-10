import Hero from "./hero";
import PartnersLogos from "./partners";
import NewsCarousel from "./newsCarousel";
import Blog from "~/blog/blog";
import Calendar from "components/ui/calendar/calendarStr";


export default function HomeIndex() {

  return (
    <>
      <Hero />
      <PartnersLogos />
      <NewsCarousel />
      <Blog />
      <Calendar />
    </>
  );
}