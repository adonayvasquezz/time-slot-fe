import React from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  deletingEventId: string | null;
}

export default function EventList({
  events,
  onEdit,
  onDelete,
  deletingEventId,
}: EventListProps) {
  return (
    <>
      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No events yet
          </h3>
          <p className="text-gray-500">
            Start by creating your first event to organize your time.
          </p>
        </div>
      )}

      {events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={deletingEventId === event.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
