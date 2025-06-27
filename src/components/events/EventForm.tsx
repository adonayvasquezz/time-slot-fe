"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Event, CreateEventData } from "@/types/event";
import {
  validateEventForm,
  hasValidationErrors,
  ValidationErrors,
} from "@/lib/validation";
import { timeToDateString } from "@/lib/time-to-date";

interface EventFormProps {
  event: Event | null;
  onSubmit: (data: CreateEventData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EventForm({
  event,
  onSubmit,
  onCancel,
  isLoading = false,
}: EventFormProps) {
  const [formData, setFormData] = useState<CreateEventData>({
    title: event?.title || "",
    date: event?.date || "",
    startTime: event?.startTime || "",
    endTime: event?.endTime || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors = validateEventForm(formData);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataFomatted: CreateEventData = {
        ...formData,
        startTime: timeToDateString(formData.startTime),
        endTime: timeToDateString(formData.endTime),
      };
      onSubmit(dataFomatted);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof CreateEventData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter event name"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startTime ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endTime ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Saving..." : event ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
