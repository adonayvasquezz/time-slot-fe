export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateEventData extends Omit<Event, "id"> {}
