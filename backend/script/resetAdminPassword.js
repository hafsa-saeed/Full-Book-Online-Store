// ========== umcomment this file if you want to reset the password of login============

// // scripts/resetAdminPassword.js
// require("dotenv").config();
// require("../conn/conn"); // adjust path agar aapka conn file kahin aur hai
// const bcrypt = require("bcryptjs");
// const User = require("../models/user"); // model path project ke hisaab se sahi karo

// async function resetAdminPassword() {
//   try {
//     const usernameOrEmail = "admin"; // ya admin email: "admin123@gmail.com"
//     const newPlainPassword = "NewAdmin123"; // apna naya password yahan rakho

//     const hashed = await bcrypt.hash(newPlainPassword, 10);

//     // Find by username or email (adjust if you want email)
//     const user = await User.findOneAndUpdate(
//       { username: usernameOrEmail }, // change to { email: "..." } agar email se khojna ho
//       { password: hashed },
//       { new: true }
//     );

//     if (!user) {
//       console.log("User not found. Try searching by email or check DB.");
//       process.exit(1);
//     }

//     console.log("Password reset successful for:", user.username);
//     console.log("New plain password:", newPlainPassword);
//     process.exit(0);
//   } catch (err) {
//     console.error("Error resetting password:", err);
//     process.exit(1);
//   }
// }

// resetAdminPassword();
