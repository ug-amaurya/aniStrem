import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Sign Up - Watch with Senpai",
  description:
    "Create a new account to start watching anime and build your watchlist",
};

export default function SignupPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us and start your anime watching journey</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
