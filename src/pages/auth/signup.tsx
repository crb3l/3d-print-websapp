// import React from 'react'

// const Signup = () => {

//     function handleChange(event){

//     }

//     return (
//         <div>
//             <form>
//                 <input
//                     placeholder='Username'
//                     name='username'
//                     onChange={handleChange}
//                 />
//                 <input
//                     placeholder='Email'
//                     name='email'
//                     onChange={handleChange}
//                 />
//                 <input
//                     placeholder='Password'
//                     name='password'
//                     onChange={handleChange}
//                 />
//                 <input
//                     placeholder='Confirm Password'
//                     name='passConf'
//                     onChange={handleChange}
//                 />
//             </form>
//         </div>
//     )
// }

// export default Signup

import React, { useState } from 'react';
// import { supabase } from '@/utils/supabaseClient'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        firstName: '',
        lastName: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { email, password, confirmPassword, username, firstName, lastName } = form;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    firstName,
                    lastName,
                },
            },
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            navigate('/signin'); // or redirect to sign-in or confirmation page
        }
    };

    const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full bg-transparent px-4 py-2 border rounded"
                        value={form.firstName}
                        onChange={updateField('firstName')}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full bg-transparent px-4 py-2 border rounded"
                        value={form.lastName}
                        onChange={updateField('lastName')}
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="Username (optional)"
                    className="w-full bg-transparent mb-4 px-4 py-2 border rounded"
                    value={form.username}
                    onChange={updateField('username')}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent mb-4 px-4 py-2 border rounded"
                    value={form.email}
                    onChange={updateField('email')}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent mb-4 px-4 py-2 border rounded"
                    value={form.password}
                    onChange={updateField('password')}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-transparent mb-6 px-4 py-2 border rounded"
                    value={form.confirmPassword}
                    onChange={updateField('confirmPassword')}
                    required
                />

                <Button size="lg" className="w-full">Create Account</Button>
            </form>
        </div>
    );
};

export default Signup;
