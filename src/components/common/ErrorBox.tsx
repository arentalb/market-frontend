import { ClientError } from "@/app/apiSlice.ts";

export function ErrorBox({ error }: { error: unknown }) {
  const myError = error as ClientError;
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">
        {myError?.message || "  کێشەیەک  رویدا "}
      </span>
    </div>
  );
}
