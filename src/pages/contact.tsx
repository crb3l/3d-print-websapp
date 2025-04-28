// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';

// const Contact = () => (
//   <div className="container mx-auto px-4 py-20">
//     <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
//     <p className="text-xl text-slate-600 mb-8 ">
//       Have questions? Reach out to us using the form below or via email at support@example.com.
//     </p>
//     <form className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
//       <div className="mb-4">
//         <label className="block text-slate-700 text-sm font-bold mb-2">Name</label>
//         <input className="w-full bg-transparent px-3 py-2 border rounded-lg" type="text" placeholder="Your Name" />
//       </div>
//       <div className="mb-4">
//         <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
//         <input className="w-full bg-transparent px-3 py-2 border rounded-lg" type="email" placeholder="Your Email" />
//       </div>
//       <div className="mb-4">
//         <label className="block text-slate-700 text-sm font-bold mb-2">Message</label>
//         <textarea className="w-full bg-transparent px-3 py-2 border rounded-lg" rows={4} placeholder="Your Message"></textarea>
//       </div>
//       <Button size="lg" className="w-full">Send Message</Button>
//     </form>
//   </div>
// );

// export default Contact;

import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('http://localhost:4000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        setFeedback('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback('Failed to send message. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback('Failed to send message. Try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
      <p className="text-xl text-slate-600 mb-8">
        Have questions? Reach out to us using the form below or via email at support@example.com.
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent px-3 py-2 border rounded-lg"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent px-3 py-2 border rounded-lg"
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent px-3 py-2 border rounded-lg"
            rows={4}
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <Button size="lg" className="w-full" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </Button>
        {feedback && <p className="text-center text-slate-500 mt-4">{feedback}</p>}
      </form>
    </div>
  );
};

export default Contact;