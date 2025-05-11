import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setMessage("Password updated successfully!");
      //log out because i like to. use your new pass to log in you dimwit
      await supabase.auth.signOut();

      navigate("/signin");
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
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            disabled={loading}
          />
        </div>

        <Button onClick={handleResetPassword} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>

        {message && (
          <div className="mt-4 text-sm text-gray-600">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
