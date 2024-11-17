const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db.js");
const User = require("./modal/registrationModal.js");

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

ConnectDB();

app.post("/addUserDetails", async (req, resp) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return resp
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  if (name) {
    // Sign-up logic
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return resp
          .status(400)
          .json({ success: false, message: "Email already exists." });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();
      return resp.json({
        success: true,
        message: "Account created successfully.",
      });
    } catch (err) {
      return resp
        .status(500)
        .json({ success: false, message: "Server error." });
    }
  } else {
    // Sign-in logic
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return resp
          .status(400)
          .json({ success: false, message: "Invalid email or password." });
      }
      return resp.json({ success: true, message: "Sign-in successful." });
    } catch (err) {
      return resp
        .status(500)
        .json({ success: false, message: "Server error." });
    }
  }
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
