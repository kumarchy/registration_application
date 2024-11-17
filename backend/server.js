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

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  resp.json({ success: true, message: "Data added Successfully" });
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
