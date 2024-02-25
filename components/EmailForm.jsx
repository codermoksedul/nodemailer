// components/EmailForm.jsx
"use client";
import { useState } from 'react';

const EmailForm = () => {
  const [toEmail, setToEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToEmailChange = (e) => {
    setToEmail(e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading to true when sending email

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: toEmail,
          subject: "Registration OTP",
          message: `<div>
            <p>This is your account verification code</p>
            <h2>457865</h2>
          </div>`
        })
      });

      if (response.ok) {
        alert('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false); // Set loading to false when email is sent (success or error)
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleSendEmail} className="h-full space-y-6 w-full p-5 py-10 border border-slate-300 rounded-md max-w-[400px]">
          <div className="relative flex flex-col space-y-1">
            <input
              type="email"
              id="toEmail"
              required
              value={toEmail}
              onChange={handleToEmailChange}
              placeholder="Enter your email address"
              className="rounded-xl border border-slate-300 p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="ml-auto flex items-center justify-center space-x-3 rounded-lg bg-blue-600 p-2 text-white shadow-blue-500 hover:bg-blue-700 hover:shadow-md w-full"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <span>Sending...</span>
            ) : (
              <span>Send Email</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EmailForm;
