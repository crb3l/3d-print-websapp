import React, { useState } from 'react';
// import { supabase } from '@/utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Signin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = form;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else navigate('/'); // Redirect after login
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6">Sign In</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-4 py-2 border rounded"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <Button size="lg" className="w-full">Log In</Button>
            </form>
        </div>
    );
};

export default Signin;