import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import supabase from '@/utils/supabase';

interface UserProfile {
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
}

const Account: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editing, setEditing] = useState<boolean>(false);
    const [form, setForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
    });
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error(error);
                setMessage({ text: 'Authentication error.', type: 'error' });
                setLoading(false);
                return;
            }

            const userData = data.user;
            setUser({
                email: userData?.email || '',
                username: userData?.user_metadata?.username || '',
                firstName: userData?.user_metadata?.firstName || '',
                lastName: userData?.user_metadata?.lastName || '',
            });
            setForm({
                username: userData?.user_metadata?.username || '',
                firstName: userData?.user_metadata?.firstName || '',
                lastName: userData?.user_metadata?.lastName || '',
            });

            setLoading(false);
        };

        fetchUser();
    }, [navigate]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    username: form.username,
                    firstName: form.firstName,
                    lastName: form.lastName,
                },
            });

            if (error) {
                setMessage({ text: `Error: ${error.message}`, type: 'error' });
            } else {
                setUser({ ...user, ...form } as UserProfile);
                setEditing(false);
                setMessage({ text: 'Profile updated successfully!', type: 'success' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Unexpected error occurred.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/signin');
    };

    const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-primary px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
                    </div>

                    <div className="p-6">
                        {message && (
                            <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label>Email:</label>
                                <div className="py-2 px-3 bg-gray-100 rounded border">{user?.email}</div>
                            </div>

                            {editing ? (
                                <>
                                    <div>
                                        <label>Username:</label>
                                        <input className="bg-transparent border p-2 rounded w-full" type="text" value={form.username} onChange={updateField('username')} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label>First Name:</label>
                                            <input className="bg-transparent border p-2 rounded w-full" type="text" value={form.firstName} onChange={updateField('firstName')} />
                                        </div>
                                        <div>
                                            <label>Last Name:</label>
                                            <input className="bg-transparent border p-2 rounded w-full" type="text" value={form.lastName} onChange={updateField('lastName')} />
                                        </div>
                                    </div>
                                    <Button onClick={handleUpdateProfile} className="mt-4">Save</Button>
                                    <Button onClick={() => setEditing(false)} className="mt-2">Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <div>Username: {user?.username}</div>
                                    <div>Name: {user?.firstName} {user?.lastName}</div>
                                    <Button onClick={() => setEditing(true)} className="mt-4">Edit Profile</Button>
                                </>
                            )}
                        </div>
                        <hr className="my-6" />
                        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
