import { useState, useEffect } from "react";
import { Event, CreateEventData } from "@/types/event";
import { apiService } from "@/services/api";

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Loading error");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: CreateEventData) => {
    try {
      setLoading(true);
      setError(null);
      const newEvent = await apiService.createEvent(data);
      setEvents((prev) => [...prev, newEvent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create event error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
  };
}
