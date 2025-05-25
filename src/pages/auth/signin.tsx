import React, { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [showResend, setShowResend] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = form;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            if (error.message == "Email not confirmed")
                setShowResend(true);
            setError(error.message);
            return;
        }


        // if (user && !user?.email_confirmed_at) {

        //     setShowResend(true);
        //     setError('Please confirm your email before logging in.')
        //     return;
        // }

        else navigate('/'); // Redirect after login
    };

    useEffect(() => {
        if (location.state?.fromSignup) {
            setShowResend(true);
            // Optionally clear the state after first render (optional if using useNavigate later)
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleResend = async () => {
        if (!form.email) return;

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: form.email,
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Confirmation email resent.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6">Sign In</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent mb-4 px-4 py-2 border rounded"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent mb-6 px-4 py-2 border rounded"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <Button size="lg" className="w-full">Log In</Button>
                <p className="mt-4 text-center text-slate-600">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="text-500 hover:underline">
                        Create one here!
                    </Link>
                </p>
                <p className="mt-2 text-center text-slate-600">
                    Forgot your password?{' '}
                    <Link to="/forgot-password" className="text-500 hover:underline">
                        Reset by pressing here!
                    </Link>
                </p>
                {showResend && (
                    <p className="mt-2 text-center text-slate-600">
                        Did not receive confirmation link?{' '}
                        <a onClick={handleResend} className="text-500 hover:underline">
                            Receive another one by clicking here!
                        </a>
                    </p>
                )}
            </form>

        </div>
    );
};

export default Signin;