import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login - Watch with Senpai",
  description:
    "Sign in to your account to access your watchlist and continue watching",
};

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue watching</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
