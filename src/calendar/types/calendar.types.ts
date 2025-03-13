import React from "react";
import { Event } from "react-big-calendar";

export interface CalendarEventType extends Event {
  _id?: number;
  notes?: string;
  bgColor?: string;
  user?: {
    _id: string;
    name: string;
  }
}


export interface EventType {
  _id?: number;
  title?: string | React.ReactNode;
  notes?: string;
  bgColor?: string;
  start?: string;
  end?: string;
  user?: {
    _id: string;
    name: string;
  }
}