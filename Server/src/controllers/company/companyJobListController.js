import Company from "../../models/company.js";
import Job from "../../models/job.js";

export const getCompanyJobList = async (req, res) => {
  try {
    const companyId = req.companyId || req.company?._id;
    const { page = 1, search, status, location } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "Company information is missing." });
    }

    let query = { company: companyId };

    if (status) {
      query.status = status.toLowerCase();
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];
    }

    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalJobs: total,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
