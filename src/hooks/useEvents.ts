import { useState, useEffect } from "react";
import { Event, CreateEventData } from "@/types/event";
import { apiService } from "@/services/api";

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  updateEvent: (id: string, data: Partial<CreateEventData>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
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

  const updateEvent = async (id: string, data: Partial<CreateEventData>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEvent = await apiService.updateEvent(id, data);
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updatedEvent : event))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update event error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete event error");
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
    updateEvent,
    deleteEvent,
  };
}
