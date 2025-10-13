import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password - Watch with Senpai",
  description: "Reset your password to regain access to your account",
};

export default function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
