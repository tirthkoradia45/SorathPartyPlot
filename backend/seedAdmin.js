require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./src/models/Admin");

async function seedAdmin() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Change these whenever you want
    const USERNAME = process.env.ADMIN_USERNAME;
    const PASSWORD = process.env.ADMIN_PASSWORD;

    // Hash password
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // Check if any admin already exists
    let admin = await Admin.findOne();

    if (admin) {

      admin.username = USERNAME;
      admin.password = hashedPassword;

      await admin.save();

      console.log("Existing Admin Updated Successfully!");

    } else {

      admin = new Admin({

        username: USERNAME,

        password: hashedPassword,

      });

      await admin.save();

      console.log("New Admin Created Successfully!");

    }

    console.log("--------------------------------");
    console.log("Username :", USERNAME);
    console.log("Password :", PASSWORD);
    console.log("--------------------------------");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }

}

seedAdmin();