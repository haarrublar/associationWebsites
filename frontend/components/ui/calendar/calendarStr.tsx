import { useMemo } from "react";
import {
  Calendar as BigCalendar,
  type CalendarProps,
  dateFnsLocalizer
} from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { events } from "./events";

const localizer = dateFnsLocalizer({
  format: (date: Date, formatString: string) => format(date, formatString, { locale: es }),
  parse,
  startOfWeek,
  getDay,
  locales: { es }, 
});

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
    <div className="mx-auto max-w-7xl px-6 lg:px-8" style={{ height: "85vh" }}>
      <BigCalendar
      step={30}
      culture={culture}
      events={events}
      localizer={localizer}
      messages={messages} 
      views={["month", "week"]} 
      min={new Date(0, 0, 0, 6, 0, 0)}
      max={new Date(0, 0, 0, 20, 0, 0)}    
    />
    </div>
  );
}
