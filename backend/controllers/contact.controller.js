import Contact from "../models/contact.model.js";

export const submitContact = async (req, res) =>{
    try {
        const userId = req.user._id;
        const {firstName, lastName, email, phone, message} = req.body;

        if(!userId){
            return res.status(400).json({message: "User Id is not found"});
        }

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            message,
            userId,
        });
        await newContact.save();

        return res.status(200).json({message: "Contact message is saved"});
    } catch (error) {
        console.log("Intenal error while saving contact message", error);
        return res.status(500).json({message: "Internal error while saving contact message"});
    }
}