import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
    const supabase = useSupabaseClient();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            if (error instanceof Error) {
                setMessage("Error: " + error.message);
            } else {
                setMessage("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                </div>

                <Button onClick={handleResetPassword} disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Email"}
                </Button>

                {message && (
                    <div className="mt-4 text-sm text-gray-600">{message}</div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
