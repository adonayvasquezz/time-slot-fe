import { CreateEventData } from "@/types/event";

export interface ValidationErrors {
  name?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
}

export const validateEventForm = (
  formData: CreateEventData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.date) {
    errors.date = "Date is required";
  }

  if (!formData.start_time) {
    errors.start_time = "Start time is required";
  }

  if (!formData.end_time) {
    errors.end_time = "End time is required";
  }

  if (formData.start_time && formData.end_time) {
    const startTime = new Date(`2000-01-01T${formData.start_time}`);
    const endTime = new Date(`2000-01-01T${formData.end_time}`);

    if (startTime >= endTime) {
      errors.end_time = "End time must be after start time";
    }
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
