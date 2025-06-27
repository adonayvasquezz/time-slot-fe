"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { Event, CreateEventData } from "@/types/event";
import { useEvents } from "@/hooks/useEvents";

export default function EventManager() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } =
    useEvents();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const handleCreateEvent = async (data: CreateEventData) => {
    setIsLoading(true);
    try {
      createEvent(data);
      setShowModal(false);
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
      await updateEvent(editingEvent.id, data);
      setEditingEvent(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    setDeletingEventId(eventId);
    try {
      deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeletingEventId(null);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleSubmit = (data: CreateEventData) => {
    if (editingEvent) {
      handleUpdateEvent(data);
    } else {
      handleCreateEvent(data);
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-700">Event Management</h2>
        <Button onClick={openCreateModal}>Create New Event</Button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title={editingEvent ? "Edit Event" : "Create New Event"}
        maxWidth="lg"
      >
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Modal>

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
