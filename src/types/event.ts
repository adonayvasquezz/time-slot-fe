export interface Event {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
}

export interface CreateEventData {
  name: string;
  date: string;
  start_time: string;
  end_time: string;
}
