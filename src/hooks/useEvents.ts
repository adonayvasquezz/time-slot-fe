import { useState, useEffect } from "react";
import { Event, CreateEventData } from "@/types/event";
import { apiService } from "@/services/api";
import toast from "react-hot-toast";

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

  const showErrorToast = (message: string) => {
    toast.error(message, {
      duration: 5000,
      style: {
        background: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
      },
    });
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getEvents();
      setEvents(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Loading error";
      setError(errorMessage);
      showErrorToast(errorMessage);
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
      toast.success("Evento creado exitosamente");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Create event error";
      setError(errorMessage);
      showErrorToast(errorMessage);
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
      toast.success("Evento actualizado exitosamente");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Update event error";
      setError(errorMessage);
      showErrorToast(errorMessage);
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
      toast.success("Evento eliminado exitosamente");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Delete event error";
      setError(errorMessage);
      showErrorToast(errorMessage);
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
