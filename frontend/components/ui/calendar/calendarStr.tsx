import { useMemo } from "react";
import {
  Calendar as BigCalendar,
  type CalendarProps,
  dateFnsLocalizer
} from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { events } from "./events";


const lang = {
  es: {
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Después",
    today: "Hoy",
    agenda: "El Diario",
    showMore: (total: number) => `+${total} más`,
  },
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { es }, 
});

export default function BasicCalendar() {
  
  const views = useMemo(() => ({
    month: true,
    week: true,
    day: false
  }), []);
  
  const culture = "es";
  const { messages } = useMemo(
    () => ({
      messages: lang[culture], 
    }),
    [culture]
  );

  return (
    <BigCalendar
    culture={culture}
    events={events}
    localizer={localizer}
    messages={messages} 
    views={["month", "week"]} 
  />
  );
}
