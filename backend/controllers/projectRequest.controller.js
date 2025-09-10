import Notification from "../models/notifications.model.js";
import projectRequest from "../models/projectRequest.model.js";
import SubmittedProject from "../models/submitedProject.model.js";

export const acceptProjectRequest = async (req, res) => {
  try {
    const notifId = req.params.id;
    const userId = req.user._id;

    const notif = await Notification.findById(notifId);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const { senderId, projectId } = notif.data;

    // remove notification
    await Notification.findByIdAndDelete(notifId);

    // update requested
    await projectRequest.findOneAndUpdate(
      { sender: senderId, receiver: userId, projectId },
      { status: "accepted" }
    );

    // add user to project tags
    await SubmittedProject.findByIdAndUpdate(projectId, { $push: { tags: userId } });

    return res.status(200).json({ message: "Project request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectProjectRequest = async (req, res) => {
  try {
    const notifId = req.params.id;
    const userId = req.user._id;

    const notif = await Notification.findById(notifId);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const { senderId, projectId } = notif.data;

    // remove notification
    await Notification.findByIdAndDelete(notifId);

    // update requested entry to rejected
    await projectRequest.findOneAndUpdate(
      { sender: senderId, receiver: userId, projectId },
      { status: "rejected" }
    );

    return res.status(200).json({ message: "Project request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
