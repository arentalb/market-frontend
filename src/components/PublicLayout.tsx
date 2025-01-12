import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div>
      <header>Public Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Public Footer</footer>
    </div>
  );
}
