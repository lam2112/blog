import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail, validPhone } from "../middleware/valid";
import { sendSms } from "../config/sendSMS";
import { INewUser } from "../config/interface";
import { IDecodeToken, IUser } from "../config/interface";
import { RequestClient } from "twilio";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      const passwordHash = await bcrypt.hash(password, 12);

      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number is already exit." });

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken(newUser);
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendMail(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email" });
      } else if (validPhone(account)) {
        sendSms(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check phone" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      
      
      const decode = <IDecodeToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      console.log(decode);
      const newUser = decode;
      const user = new Users(newUser);

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication" });

      await user.save();
      res.json({ msg: "Account has been activated!" });
    } 
    catch (err) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.keys(err.keyValue)[0] + " already exit";
      } else {
        let name = Object.keys(err.keyValue)[0];
        errMsg = err.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      const user = await Users.findOne({ account });

      if (!user)
        return res.status(400).json({ msg: "This account does not exit " });

      // if user exits
      loginUser(user, password, res);

      // res.json({ msg: "Login successful!" });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', {path: '/api/refresh_token' })
      return res.json({ msg: "Logout successful!" });

    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({msg: "Please login now"})

      const decode = <IDecodeToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
      if(!decode.id) return res.status(400).json({msg: "Please login now"})
      
      const user = await Users.findById(decode.id).select("-password");
      if(!user) return res.status(400).json({msg: "This account dose not exit"})

      const access_token = generateAccessToken({id: user._id})
  
      res.json({access_token});


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

  const access_token = generateAccessToken({id: user._id});
  const refresh_token = generateRefreshToken({id: user._id});

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  })

  res.json({
    msg: "Login is success",
    access_token: access_token,
    user: { ...user._doc, password: ''}
  })

  
}

export default authCtrl;
