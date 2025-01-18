import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TApiError } from "@/types/TApiError.ts";
import moment from "moment";

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
export const kurdishNumberFormatter = new Intl.NumberFormat("ar-EG", {
  numberingSystem: "arab",
  useGrouping: false,
});

export function convertISODateToKurdish(
  isoString: string,
  options: { date?: boolean; time?: boolean } = { date: true, time: true },
): string {
  const date = moment(isoString).locale("ar-sa");

  let formattedDate = "";

  if (options.date) {
    formattedDate += date.format("DD‏/MM‏/YYYY");
  }

  if (options.time) {
    if (formattedDate) formattedDate += " ";
    formattedDate += date.format("h:mm:ss A");
  }

  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  formattedDate = formattedDate.replace(
    /\d/g,
    (d) => arabicNumbers[parseInt(d)],
  );

  formattedDate = formattedDate
    .replace("AM", "پێشنیوەڕۆ")
    .replace("PM", "پاشنیوەڕۆ");

  return formattedDate;
}
