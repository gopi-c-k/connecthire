import JobProposal from "../../models/jobProposal.js";
import Notification from "../../models/notification.js";
export const updateJobProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { proposalId } = req.params;
    const validStatuses = ['applied', 'accepted', 'rejected', 'shortlisted', 'hired', 'interviewed'];

    // Validate the new status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the job proposal by ID
    const proposal = await JobProposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Job proposal not found" });
    }

    const companyId = req.companyId || req.company?._id;
    if (!companyId || proposal.company.toString() !== companyId.toString()) {
      return res.status(403).json({ message: "You do not have permission to update this proposal" });
    }

    // Update the status of the job proposal
    proposal.status = status;
    proposal.recentUpdate = Date.now();
    await proposal.save();

    const notification = new Notification({
      senderId: companyId,
      recipientId: proposal.jobSeeker,
      type: 'status',
      senderModel: 'Company',
      recipientModel: 'JobSeeker',
      content: `Your job proposal status has been updated to "${status}".`,
      link: `/user/applications`,
      isRead: false,
    });
    await notification.save();

    res.status(200).json({ message: "Job proposal status updated successfully", proposal });
  } catch (error) {
    console.error("Error updating job proposal status:", error);
    res.status(500).json({ message: "Server error" });
  }
}