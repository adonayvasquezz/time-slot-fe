import React from "react";
import Button from "@/components/ui/Button";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  isDeleting?: boolean;
}

export default function EventCard({
  event,
  onEdit,
  onDelete,
  isDeleting = false,
}: EventCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
          {event.name}
        </h3>
      </div>

      <div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Date:</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Start:</span>
            <span>{event.start_time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">End:</span>
            <span>{event.end_time}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(event)}
              disabled={isDeleting}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onDelete(event.id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
