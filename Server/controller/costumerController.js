const passGen = require("../utility/passGen");
const custoModel = require("../model/costumerModel");
const accountModel = require("../model/accountModel");
const transactionModel = require("../model/transactionModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// Reusable transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pawanpathariys@gmail.com",
    pass: "qsfu fszj qtym hhtc",
  },
});

// Customer Registration
const CustomerRegi = async (req, res) => {
  try {
    const { name, address, email, city, mobile, pincode, accountType, fathername } = req.body;
    const password = passGen.GenPass();

    const existingUser = await custoModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email Already exist!!!");
    }

    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await custoModel.create({ name, address, email, city, mobile, pincode, accountType, password: hashPassword, fathername });
    const account = await accountModel.create({ coustoID: user._id, accountNumber, balance: "0.00" });
    await custoModel.findByIdAndUpdate(user._id, { $set: { accountID: account._id } });

    const mailOptions = {
      from: "pawanpathariys@gmail.com",
      to: email,
      subject: "Your secret Password",
      text: `Welcome to CBI Bank ${name}\nYour Account number is ${accountNumber}\nYour Account is created Successfully\nYour password is ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).send("Registered successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Customer Login
const Customerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await custoModel.findOne({ email });

    if (!User) {
      return res.status(400).send("Invalid Email!!!");
    }

    const passwordMatch = await bcrypt.compare(password, User.password);

    if (!passwordMatch) {
      return res.status(400).send("Invalid Password!");
    }

    const token = jwt.sign({ id: User._id }, process.env.SECRETE_KEY, { expiresIn: "7 days" });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// User Authentication
const userAuthenticate = async (req, res) => {
  const token = req.header("x-auth-token");
  try {
    const verify = jwt.verify(token, process.env.SECRETE_KEY);
    const User = await custoModel.findById(verify.id).select("-password");
    res.send(User);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, id } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newp = await bcrypt.hash(newPassword, salt);
    const User = await custoModel.findById(id);
    const passwordMatch = await bcrypt.compare(oldPassword, User.password);
    if (!passwordMatch) {
      return res.status(400).send("Invalid Old Password!");
    } else {
      await custoModel.findByIdAndUpdate(id, { password: newp });
    }
    res.send("Reset Password");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Profile
const profile = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await custoModel.findById(id).populate("accountID");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Balance
const balance = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await custoModel.findById(id).populate("accountID");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Deposite
const deposite = async (req, res) => {
  try {
    const { amount, id } = req.body;
    if (amount <= 0) {
      return res.status(400).send("Invalid Amount");
    }
    const acc = await accountModel.findOne({ coustoID: id });
    const newBalance = Number(acc.balance) + Number(amount);
    const Tran = await transactionModel.create({ accountID: acc._id, amount, transactionType: "Deposite" });
    await accountModel.findByIdAndUpdate(acc._id, { $set: { balance: newBalance }, $push: { transactionID: Tran._id } });

    const mailOptions = {
      from: "pawanpathariys@gmail.com",
      to: email,
      subject: "Deposit Notification",
      text: `A deposit of ${amount} has been made to your account. Your new balance is ${newBalance}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Deposite");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Withdraw
const withdraw = async (req, res) => {
  try {
    const { amount, id } = req.body;
    const acc = await accountModel.findOne({ coustoID: id });
    if (acc.balance - amount < 0) {
      return res.status(400).send("Insufficient Balance");
    }

    const newBalance = Number(acc.balance) - Number(amount);
    const Tran = await transactionModel.create({ accountID: acc._id, amount, transactionType: "Withdraw" });
    await accountModel.findByIdAndUpdate(acc._id, { $set: { balance: newBalance }, $push: { transactionID: Tran._id } });

    const mailOptions = {
      from: "pawanpathariys@gmail.com",
      to: email,
      subject: "Withdrawal Notification",
      text: `A withdrawal of ${amount} has been made from your account. Your new balance is ${newBalance}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Withdraw");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// All Transaction history
const transaction = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await accountModel.findOne({ coustoID: id }).populate({
      path: "transactionID",
      options: { sort: { createdAt: -1 }, limit: 7 },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Statement between two dates
const Statement = async (req, res) => {
  try {
    const { id, start, end } = req.body;
    const user = await accountModel.findOne({ coustoID: id }).populate({
      path: "transactionID",
      match: {
        createdAt: { $gte: new Date(start), $lte: new Date(end).setHours(23, 59, 59, 999) },
      },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Forgot Password
const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const User = await custoModel.findOne({ email });
    if (!User) {
      return res.status(400).send("Invalid Email");
    }
    const password = passGen.GenPass();
    const salt = await bcrypt.genSalt(10);
    const newp = await bcrypt.hash(password, salt);
    await custoModel.findByIdAndUpdate(User._id, { password: newp });

    const mailOptions = {
      from: "pawanpathariys@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Welcome to CBI Bank ${User.name}\nYour new password is ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send(password);
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  CustomerRegi,
  Customerlogin,
  userAuthenticate,
  resetPassword,
  profile,
  balance,
  deposite,
  withdraw,
  transaction,
  Statement,
  forgotpassword,
};

