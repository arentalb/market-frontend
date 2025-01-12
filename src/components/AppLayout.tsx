import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header>Private Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Private Footer</footer>
    </div>
  );
}
