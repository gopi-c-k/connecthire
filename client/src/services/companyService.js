// src/services/companyService.js
import secureApi from "./secureApi";
import axios from "axios";

// For fetching profile (still with cookies)
export const getCompanyProfile = () => secureApi.get("/company/profile");

// For saving profile (manual token approach)
export const updateCompanyProfile = async (profileData) => {
  const token = localStorage.getItem("accessToken"); // whatever key you used in login
  if (!token) throw new Error("No access token found");

  return axios.put(
    "https://connecthire.onrender.com/company/profile",
    profileData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // No withCredentials here since we're using token directly
    }
  );
};
