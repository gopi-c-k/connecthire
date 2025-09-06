import Company from "../../models/company.js";

// @desc    Get company privacy settings
// @route   GET /company/privacy-settings
// @access  Private (Company user)
export const getCompanyPrivacySettings = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId)

        return res.json({
            showInSearchResults: company.showInSearchResults,
            allowApplicantsToMessage: company.allowApplicantsToMessage,
            receiveEmailNotifications: company.receiveEmailNotifications,
            allowAnonymizedDataSharing: company.allowAnonymizedDataSharing,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Update company privacy settings
// @route   PUT /company/privacy-settings
// @access  Private (Company user)
export const updateCompanyPrivacySettings = async (req, res) => {
    try {
        const {
            showInSearchResults,
            allowApplicantsToMessage,
            receiveEmailNotifications,
            allowAnonymizedDataSharing,
        } = req.body;

        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId)

        // update only provided fields
        if (showInSearchResults !== undefined)
            company.showInSearchResults = showInSearchResults;
        if (allowApplicantsToMessage !== undefined)
            company.allowApplicantsToMessage = allowApplicantsToMessage;
        if (receiveEmailNotifications !== undefined)
            company.receiveEmailNotifications = receiveEmailNotifications;
        if (allowAnonymizedDataSharing !== undefined)
            company.allowAnonymizedDataSharing = allowAnonymizedDataSharing;

        await company.save();

        res.json({ message: 'Privacy settings updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
