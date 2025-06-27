import { Event, CreateEventData } from "@/types/event";

const API_BASE_URL = "/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getEvents(): Promise<Event[]> {
    return this.request<Event[]>("/events");
  }

  async getEvent(id: string): Promise<Event> {
    return this.request<Event>(`/events/${id}`);
  }

  async createEvent(data: CreateEventData): Promise<Event> {
    return this.request<Event>("/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateEvent(
    id: string,
    data: Partial<CreateEventData>
  ): Promise<Event> {
    return this.request<Event>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string): Promise<void> {
    return this.request<void>(`/events/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
