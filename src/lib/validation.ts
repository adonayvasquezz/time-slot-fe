import { CreateEventData } from "@/types/event";

export interface ValidationErrors {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export const validateEventForm = (
  formData: CreateEventData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.title.trim()) {
    errors.title = "Name is required";
  }

  if (!formData.date) {
    errors.date = "Date is required";
  }

  if (!formData.startTime) {
    errors.startTime = "Start time is required";
  }

  if (!formData.endTime) {
    errors.endTime = "End time is required";
  }

  if (formData.startTime && formData.endTime) {
    const startTime = new Date(`2000-01-01T${formData.startTime}`);
    const endTime = new Date(`2000-01-01T${formData.endTime}`);

    if (startTime >= endTime) {
      errors.endTime = "End time must be after start time";
    }
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
