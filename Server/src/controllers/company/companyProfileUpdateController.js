// import Company from "../../models/company.js";

// export const updateCompanyProfile = async (req, res) => {
//     try {
//         const { companyName, website, description, companyLogo,location,industry,size,founded,contactEmail,socialLinks = {} } = req.body;
//         const companyId = req.companyId || req.company?._id;
//         if (!companyId) {
//             return res.status(400).json({ message: "Company information is missing." });
//         }
//         const updateData = {
//             companyName,
//             website,
//             description,
//             companyLogo
//         };
//         if( location !== undefined) updateData.location = location;
//         if( industry !== undefined) updateData.industry = industry;
//         if( size !== undefined) updateData.size = size;
//         if( founded !== undefined) updateData.founded = founded;
//         if( contactEmail !== undefined) updateData.contactEmail = contactEmail;
//         // Merge nested socialLinks fields safely
//         if (Object.keys(socialLinks).length > 0) {
//             for (let key in socialLinks) {
//                 updateData[`socialLinks.${key}`] = socialLinks[key];
//             }
//         }
//         const updatedCompany = await Company.findByIdAndUpdate(
//             companyId,
//             updateData,
//             { new: true, runValidators: true }
//         );
//         if (!updatedCompany) {
//             return res.status(404).json({ message: "Company not found." });
//         }
//         res.status(200).json({
//             message: "Company profile updated successfully.",
//             company: updatedCompany
//         });
//     } catch (error) {
//         console.error("Error updating company profile:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

export const updateCompanyProfile = async (req, res) => {
  try {
    const {
      companyName,
      website,
      description,
      location,
      industry,
      teamSize,
      foundingDate,
      contactEmail,
      phone,
      socialLinks = {}
    } = req.body;

    const companyId = req.companyId || req.company?._id;
    if (!companyId) {
      return res.status(400).json({ message: "Company information is missing." });
    }

    const updateData = {
      companyName,
      website,
      description,
      location,
      industry,
      size: teamSize,      // match DB field
      founded: foundingDate,
      contactEmail,
      phone
    };

    // Handle uploaded file
    if (req.file) {
      updateData.companyLogo = `/uploads/${req.file.filename}`;
    }

    // Merge socialLinks
    if (Object.keys(socialLinks).length > 0) {
      for (let key in socialLinks) {
        updateData[`socialLinks.${key}`] = socialLinks[key];
      }
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.status(200).json({
      message: "Company profile updated successfully.",
      company: updatedCompany
    });

  } catch (error) {
    console.error("Error updating company profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
