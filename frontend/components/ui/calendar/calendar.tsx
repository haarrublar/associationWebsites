import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Define proper TypeScript types
type EventStatus = 1 | 2 | 3 | 4 | 5;

interface ApiEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  status: EventStatus;
  [key: string]: unknown;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: EventStatus;
  [key: string]: unknown;
}

const EVENT_STATUS_COLORS: Record<EventStatus, string> = {
  1: "bg-gray-500",
  2: "bg-green-500",
  3: "bg-yellow-500",
  4: "bg-blue-500",
  5: "bg-purple-500"
};

const STATUS_LABELS: Record<EventStatus, string> = {
  1: "Pending",
  2: "Confirmed",
  3: "Warning",
  4: "Info",
  5: "Special"
};

const localizer = momentLocalizer(moment);

const UserCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data: unknown = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Expected array of events");
        }

        const formattedEvents = data.map((item: unknown) => {
          const event = item as ApiEvent;
          return {
            id: event.id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            status: event.status,
            ...event
          } as CalendarEvent;
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => ({
    style: {
      backgroundColor: "",
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block"
    },
    className: EVENT_STATUS_COLORS[event.status]
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => {/* Add your onOpen logic here */}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Event
        </button>
        
        <div className="flex gap-2">
          {Object.entries(STATUS_LABELS).map(([status, label]) => (
            <span 
              key={status}
              className={`${EVENT_STATUS_COLORS[status as unknown as EventStatus]} text-white text-xs px-2 py-1 rounded-full`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default UserCalendar;