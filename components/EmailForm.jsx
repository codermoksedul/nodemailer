// components/EmailForm.jsx
"use client";
import { useState } from 'react';

const EmailForm = () => {
  const [toEmail, setToEmail] = useState('');

  const handleToEmailChange = (e) => {
    setToEmail(e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: toEmail,
          subject: "Your Static Subject",  // Static subject
          message: "Your Static Message"   // Static message
        })
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <form onSubmit={handleSendEmail} className="h-full w-1/3 space-y-6">
      <div className="relative flex flex-col space-y-1">
        <label htmlFor="toEmail" className="text-sm font-light text-gray-500">
          To
        </label>
        <input
          type="email"
          id="toEmail"
          required
          value={toEmail}
          onChange={handleToEmailChange}
          placeholder="Enter the recipient's email address"
          className="rounded-xl border-2 border-gray-400 p-2"
        />
      </div>
      <button
        type="submit"
        className="ml-auto flex w-1/2 items-center justify-center space-x-3 rounded-lg bg-blue-600 p-2 text-white shadow-blue-500 hover:bg-blue-700 hover:shadow-md"
      >
        <span>Send Email</span>
      </button>
    </form>
  );
};

export default EmailForm;
