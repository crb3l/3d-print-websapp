import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Contact = () => (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl">
        Have questions? Reach out to us using the form below or via email at support@example.com.
      </p>
      <form className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Name</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="text" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="email" placeholder="Your Email" />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Message</label>
          <textarea className="w-full px-3 py-2 border rounded-lg" rows={4} placeholder="Your Message"></textarea>
        </div>
        <Button size="lg" className="w-full">Send Message</Button>
      </form>
    </div>
  );

  export default Contact;