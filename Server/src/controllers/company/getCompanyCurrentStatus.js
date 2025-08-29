import JobProposal from '../../models/jobProposal.js';
import Job from '../../models/job.js';

export const getCompanyCurrentStatus = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        // 1. Get all job IDs for this company
        const jobIds = await Job.find({ company:companyId }).select('_id');
        const jobIdList = jobIds.map(job => job._id);

        // 2. Aggregate counts
        const totalProposalsReceived = await JobProposal.countDocuments({
            job: { $in: jobIdList },
        });

        const totalActiveJobPostings = await Job.countDocuments({
            company:companyId,
            status: 'open',
        });

        const totalShortlistedCandidates = await JobProposal.countDocuments({
            job: { $in: jobIdList },
            status: 'shortlisted',
        });

        const totalInterviewedCandidates = await JobProposal.countDocuments({
            job: { $in: jobIdList },
            status: 'interviewed',
        });

        // 3. Fetch last 3 proposals related to the company's jobs
        const proposals = await JobProposal.find({
            job: { $in: jobIdList },
        })
            .populate('job', '_id title')
            .populate('jobSeeker', 'fullName')
            .sort({ recentUpdate: -1 })
            .limit(3);

        // 4. Respond
        res.status(200).json({
            totalProposalsReceived,
            totalActiveJobPostings,
            totalShortlistedCandidates,
            totalInterviewedCandidates,
            proposals,
        });
    } catch (error) {
        console.error('Error fetching company current status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
