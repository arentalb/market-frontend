import LoginForm from "@/features/auth/forms/loginForm.tsx";

export function LoginPage() {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <div>
        <h1 className="text-4xl font-bold text-center mb-6">مارکێتی فۆرێڤەر</h1>
        <LoginForm />
      </div>
    </div>
  );
}
