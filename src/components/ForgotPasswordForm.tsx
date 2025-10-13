"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || "Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  if (isSubmitted) {
    return (
      <div className="auth-form success-state">
        <div className="success-icon">
          <div className="icon-container">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3>Check your email</h3>
        <p>
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <div className="action-buttons">
          <Link href="/login" className="primary">
            Back to Login
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail("");
            }}
            className="secondary"
          >
            Try a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={error ? "error" : ""}
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="auth-links">
        <div className="link-text">
          <span>Remember your password? </span>
          <Link href="/login">Sign in</Link>
        </div>
        <div className="link-text">
          <span>Don't have an account? </span>
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </form>
  );
}
