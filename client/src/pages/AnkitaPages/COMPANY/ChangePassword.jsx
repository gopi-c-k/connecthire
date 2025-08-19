import { useState } from "react";
import { Lock } from "lucide-react";
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }
    setMessage("Password changed successfully! (Mock UI)");
  };

  return (
    <div className="min-h-screen bg-[#0F1F3A] py-10 px-4">
      <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-lightText mb-4">Change Password</h1>
        {message && <div className="mb-4 text-lightText bg-white/10 p-3 rounded">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon icon={Lock} name="oldPassword" type="password" placeholder="Old Password" value={form.oldPassword} onChange={handleChange} />
          <InputWithIcon icon={Lock} name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} />
          <InputWithIcon icon={Lock} name="confirmPassword" type="password" placeholder="Confirm New Password" value={form.confirmPassword} onChange={handleChange} />
          <Button type="submit" variant="primary">Change Password</Button>
        </form>
      </div>
    </div>
  );
}
