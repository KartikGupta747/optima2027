import React, { useState } from "react";
import Section from "../Section";
import { BackgroundCircles } from "../design/Hero";
import { Gradient } from "../design/Services";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 // ... existing code ...

const handleInitialSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/password-reset-init`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset email");
    }

    setUserId(data.userId);
    setShowOTPForm(true);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const handleResetSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (newPassword.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/password-reset-complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }

    alert("Password reset successful! Please sign in with your new password.");
    navigate("/signin");
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

// ... existing code ...

  return (
    <Section className="pt-[5rem] ">
      <div className="container relative z-2">
        <div className="relative -z-10">
          <BackgroundCircles />
        </div>

        <div className="max-w-[440px] mx-auto bg-n-6/80 rounded-2xl p-4">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
            {!showOTPForm ? (
              <p className="text-n-4 text-center">
                Enter your email address and we'll send you an OTP to
                reset your password
              </p>
            ) : (
              <p className="text-n-4 text-center">
                Enter the OTP sent to your email and set your new password
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {!showOTPForm ? (
            <form onSubmit={handleInitialSubmit} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
                  required
                />
              </div>

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
                  required
                />

                <input
                  type="password"
                  placeholder="New Password (min 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
                  required
                  minLength={6}
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
                  required
                />
              </div>

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          <p className="text-center text-n-4 mt-6">
            Remember your password?{" "}
            <a href="/signin" className="text-primary-1 hover:text-primary-2">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <Gradient />
    </Section>
  );
};

export default ResetPassword;
