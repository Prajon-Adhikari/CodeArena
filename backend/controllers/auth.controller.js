// auth.controller.js
export const checkAuth = (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({ success: true, user: req.user });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
