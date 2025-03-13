import { CalendarEventType, EventType } from "@/calendar/types/calendar.types";
import { addHours } from "date-fns";

// Conversión de EventType → CalendarEventType
export const toCalendarEvent = (event: EventType): CalendarEventType => ({
  ...event,
  start: new Date(event.start || ''), // Convierte string → Date
  end: new Date(event.end || ''),
});

// Conversión de CalendarEventType → EventType
export const toEventType = (event: CalendarEventType): EventType => ({
  ...event,
  start: (event.start || new Date()).toISOString(), // Convierte Date → string
  end: (event.end || addHours(new Date(), 2)).toISOString(),
});

// Para múltiples eventos
export const toCalendarEvents = (events: EventType[]): CalendarEventType[] => 
  events.map(toCalendarEvent);

export const toEventTypes = (events: CalendarEventType[]): EventType[] => 
  events.map(toEventType);