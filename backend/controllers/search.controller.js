import User from "../models/user.model.js";          // your existing user model
import Hackathon from "../models/hackathon.model.js";

export const getSearchData = async (req, res) =>{
     const query = req.query.q;
  if (!query || query.trim() === "") {
    return res.json({ users: [], hackathons: [] });
  }

  try {
    // search users by fullName
    const users = await User.find(
      { fullName: { $regex: query, $options: "i" } }, 
      "_id fullName username" // only send needed fields
    ).limit(5);

    // search hackathons by title
    const hackathons = await Hackathon.find(
      { title: { $regex: query, $options: "i" } }, 
      "_id title"
    ).limit(5);

    res.json({ users, hackathons });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
}