// components/EmailForm.jsx
"use client";
import { useState } from 'react';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
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
          subject,
          message
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
        <label htmlFor="subject" className="text-sm font-light text-gray-500">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter the email subject"
          className="rounded-xl border-2 border-gray-400 p-2"
        />
      </div>
      <div className="relative flex flex-col space-y-1">
        <label htmlFor="message" className="text-sm font-light text-gray-500">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter the email message"
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
