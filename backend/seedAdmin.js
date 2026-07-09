require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./src/models/Admin");

async function seedAdmin() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password) {
      throw new Error(
        "ADMIN_USERNAME and ADMIN_PASSWORD must be set."
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if any admin already exists
    let admin = await Admin.findOne();

    if (admin) {

      admin.username = username;
      admin.password = hashedPassword;

      await admin.save();

      console.log("Existing Admin Updated Successfully!");

    } else {

      admin = new Admin({

        username: username,

        password: hashedPassword,

      });

      await admin.save();

      console.log("New Admin Created Successfully!");

    }

    console.log("Username :", username);
    console.log("Password :", password);

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit();

  }

}

seedAdmin();