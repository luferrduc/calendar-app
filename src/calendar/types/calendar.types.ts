import { Event } from "react-big-calendar";


export interface EventType extends Event {
  notes?: string;
  bgColor?: string;
  user?: {
    _id: string;
    name: string
  }
}
