import React, { useState } from "react";
import CustomSelect from "../../../../components/CustomSelect";

export default function UserSecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState("email");
  const [loginAlerts, setLoginAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Security settings saved (frontend only)");
  };

  const handleLogoutAll = () => {
    alert("🚪 Logged out of all devices (frontend only)");
  };

  const handleDownloadData = () => {
    alert("⬇️ Data download request sent (frontend only)");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Security Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* -------- Two-Factor Authentication -------- */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Enable Two-Factor Authentication</span>
            <input
              id="twoFactor"
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          {twoFactor && (
            <div className="ml-2">
              <label className="block text-sm mb-1">2FA Method</label>
              <CustomSelect
                value={twoFactorMethod}
                onChange={setTwoFactorMethod}
                options={[
                  { value: "email", label: "Email" },
                  { value: "sms", label: "SMS" },
                  { value: "authenticator", label: "Authenticator App" },
                ]}
              />
            </div>
          )}
        </section>

        {/* -------- Login Alerts -------- */}
        <section className="flex justify-between items-center">
          <span className="text-sm">
            Send me login alerts for unrecognized devices
          </span>
          <input
            id="loginAlerts"
            type="checkbox"
            checked={loginAlerts}
            onChange={(e) => setLoginAlerts(e.target.checked)}
            className="w-4 h-4"
          />
        </section>

        {/* -------- Active Sessions -------- */}
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between px-3 py-2 rounded-lg bg-bg border border-slate-700">
              <span>Chrome on Windows - Last active: 2 hours ago</span>
              <span className="text-green-400">Active</span>
            </li>
            <li className="flex justify-between px-3 py-2 rounded-lg bg-bg border border-slate-700">
              <span>Safari on iPhone - Last active: Yesterday</span>
              <button
                type="button"
                onClick={() => alert("🚪 Session logged out")}
                className="text-xs text-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            onClick={handleLogoutAll}
            className="mt-2 px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10"
          >
            Logout from all devices
          </button>
        </section>

        {/* -------- Recovery Options -------- */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Recovery Options</h3>
          <input
            type="email"
            placeholder="Recovery Email"
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
          />
          <input
            type="tel"
            placeholder="Recovery Phone Number"
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
          />
        </section>

        {/* -------- Download Account Data -------- */}
        <section>
          <button
            type="button"
            onClick={handleDownloadData}
            className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          >
            Download My Data
          </button>
        </section>

        {/* -------- Save Button -------- */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
