import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const AuthModal = ({ type, onClose }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleContinue = () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    const path = `/${selectedRole.toLowerCase()}/${type}`;
    console.log("Selected Role:", selectedRole);
    console.log("Route to Navigate:", path);

    
    navigate(path);
    
    setTimeout(() => {
      onClose();
    }, 100); // slight delay to avoid unmount issue
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-surface text-lightText p-6 rounded-xl shadow-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">
          {type === "login" ? "Sign In As" : "Sign Up As"}
        </h2>

       <select
  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
  value={selectedRole}
  onChange={(e) => setSelectedRole(e.target.value)}
>
  <option value="">-- Select Role --</option>
  <option value="user">Jobseeker</option>
  <option value="company">Company</option>
  {type === "login" && <option value="admin">Admin</option>}
</select>


        

         <Button onClick={handleContinue} className="w-full">
             Continue
        </Button>



        <button
          onClick={onClose}
          className="w-full text-sm text-muted hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
