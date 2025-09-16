import Message from "../models/message.model.js";

export const submitChatMessage = async (req, res) =>{
    try {
        const userId = req.user._id;
        const {id: receiverId} = req.params;
        const {content} = req.body;

        if(!userId){
            return res.status(400).json({message: "User Id is not found"});
        }

        if(!receiverId){
            return res.status(400).json({message: "Receiver Id is not found"});
        }

        const chatMessage = new Message({
            sender: userId,
            receiver: receiverId,
            content,
        });

        await chatMessage.save();

        return res.status(200).json({message: "Successfully submitting chat message"});
    } catch (error) {
        console.log("Internal error while submitting chat message", error);
        return res.status(500).json({message: "Internal error while submitting chat message"});
    }
}