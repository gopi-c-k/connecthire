import JobSeeker from "../../models/jobSeeker.js";

export const fillJobSeekerForm = async (req, res) => {
  try {
    const jobSeekerId = req.jobSeeker._id || req.jobSeeker;

    const { 
      fullName,
      profilePicture,
      bio,
      contact = {},
      skills,
      experience,
      education,
      certifications,
      availability,
      resume
    } = req.body;

    const updateData = {};

    if (fullName !== undefined) updateData.fullName = fullName;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;
    if (bio !== undefined) updateData.bio = bio;
    if (resume !== undefined) updateData.resume = resume;
    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (availability !== undefined) updateData.availability = availability;
    if (certifications !== undefined) updateData.certifications = certifications;

    // Merge nested contact fields safely
    if (Object.keys(contact).length > 0) {
      for (let key in contact) {
        updateData[`contact.${key}`] = contact[key];
      }
    }

    if (education !== undefined) {
      updateData.education = education;
    }

    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      jobSeekerId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedJobSeeker) {
      return res.status(404).json({ message: 'JobSeeker profile not found' });
    }

    res.status(200).json({
      message: 'JobSeeker details saved successfully',
      data: updatedJobSeeker
    });
  } catch (err) {
    console.error('Error updating JobSeeker:', err);
    res.status(500).json({ message: 'Error saving JobSeeker details', error: err.message });
  }
};
