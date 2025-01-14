import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TApiError } from "@/types/TApiError.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isServerError(error: unknown): error is TApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  );
}

export function getServerError(error: unknown): {
  message: string;
  timestamp: string;
} {
  if (isServerError(error)) {
    return {
      message: error.data.message,
      timestamp: error.data.timestamp,
    };
  }
  return {
    message: "Error accused",
    timestamp: new Date().toDateString(),
  };
}
