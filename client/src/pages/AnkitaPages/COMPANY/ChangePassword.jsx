import { useMemo, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const passwordsMismatch =
    form.newPassword.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.newPassword !== form.confirmPassword;

  const canSubmit = useMemo(() => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) return false;
    if (passwordsMismatch) return false;
    return true;
  }, [form, passwordsMismatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordsMismatch) return;
    setMessage("Password changed successfully! (Mock UI)");
  };

  return (
    <div className="min-h-screen bg-[#0F1F3A] py-10 px-4">
      <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-lightText mb-4">Change Password</h1>

        {message && (
          <div className="mb-4 text-lightText bg-white/10 p-3 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}
          <InputWithIcon
            icon={Lock}
            name="oldPassword"
            type={show.oldPassword ? "text" : "password"}
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            autoComplete="current-password"
            rightIcon={
              show.oldPassword ? (
                <EyeOff
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShow((s) => ({ ...s, oldPassword: false }))}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShow((s) => ({ ...s, oldPassword: true }))}
                />
              )
            }
          />

          {/* New Password */}
          <InputWithIcon
            icon={Lock}
            name="newPassword"
            type={show.newPassword ? "text" : "password"}
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            rightIcon={
              show.newPassword ? (
                <EyeOff
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShow((s) => ({ ...s, newPassword: false }))}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShow((s) => ({ ...s, newPassword: true }))}
                />
              )
            }
          />

          {/* Confirm Password */}
          <div>
            <InputWithIcon
              icon={Lock}
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              aria-invalid={passwordsMismatch ? "true" : "false"}
            />
            {passwordsMismatch && (
              <p className="mt-1 text-sm text-red-400">
                New password and confirm password do not match.
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={!canSubmit}>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
