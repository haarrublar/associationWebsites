import Hero from "./hero";
import PartnersLogos from "./partners";
import NewsCarousel from "./newsCarousel";
import Blog from "~/blog/blog";
import Calendar from "components/ui/calendar/calendarStr";
import UserCalendar from "components/ui/calendar/calendar";

export default function HomeIndex() {

  return (
    <>
      <Hero />
      <PartnersLogos />
      <NewsCarousel />
      <Blog />
      <div style={{ height: "90vh" }}>
        <Calendar />
      </div>
    </>
  );
}