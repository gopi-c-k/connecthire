import React, { useState, useEffect } from 'react';
import './UserProfile.css'; 

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); 

  
  const userId = 'user123'; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
       
        setName(data.name || '');
        setEmail(data.email || '');
        setLocation(data.location || '');
        setSkills(data.skills ? data.skills.join(', ') : '');
        setProfilePicture(data.profilePicture || '');
      } catch (e) {
        setError(e.message || 'Could not fetch user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);

    setName(user.name || '');
    setEmail(user.email || '');
    setLocation(user.location || '');
    setSkills(user.skills ? user.skills.join(', ') : '');
    setProfilePicture(user.profilePicture || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          location,
          skills: skills.split(',').map(s => s.trim()),
          profilePicture,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setError(null);
    } catch (e) {
      setError(e.message || 'Could not update user profile.');
      console.error(e);
    }
  };

  const handleProfilePictureChange = (e) => {
   
    const file = e.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!user) {
    return <div>User profile not found.</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated):</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleProfilePictureChange}
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="profile-picture-preview"
              />
            )}
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Skills:</strong> {user.skills ? user.skills.join(', ') : 'N/A'}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;