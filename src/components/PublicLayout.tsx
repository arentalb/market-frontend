import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
