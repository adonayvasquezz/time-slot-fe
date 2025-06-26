"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { Event, CreateEventData } from "@/types/event";

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const handleCreateEvent = async (data: CreateEventData) => {
    setIsLoading(true);
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
      };

      setEvents((prev) => [...prev, newEvent]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEvent = async (data: CreateEventData) => {
    if (!editingEvent) return;

    setIsLoading(true);
    try {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id ? { ...event, ...data } : event
        )
      );
      setEditingEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    setDeletingEventId(eventId);
    try {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeletingEventId(null);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleSubmit = (data: CreateEventData) => {
    if (editingEvent) {
      handleUpdateEvent(data);
    } else {
      handleCreateEvent(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-700">Event Management</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Create New Event</Button>
        )}
      </div>

      {showForm && (
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          My Events ({events.length})
        </h3>
        <EventList
          events={events}
          onEdit={handleEdit}
          onDelete={handleDeleteEvent}
          deletingEventId={deletingEventId}
        />
      </div>
    </div>
  );
}
