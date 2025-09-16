import Message from "../models/message.model.js";

export const submitChatMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: receiverId } = req.params;
    const { content } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id is not found" });
    }

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver Id is not found" });
    }

    const chatMessage = new Message({
      sender: userId,
      receiver: receiverId,
      content,
    });

    await chatMessage.save();

    return res
      .status(200)
      .json({ message: "Successfully submitting chat message" });
  } catch (error) {
    console.log("Internal error while submitting chat message", error);
    return res
      .status(500)
      .json({ message: "Internal error while submitting chat message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: receiverId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id is missing" });
    }

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver Id is missing" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); // sort by time ascending

    return res.status(200).json({ message: "Fetching messages", messages, userId });
  } catch (error) {
    console.log("Internal error while fetching messages", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching messages" });
  }
};
