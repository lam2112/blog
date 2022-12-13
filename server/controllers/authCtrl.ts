import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail, validPhone } from "../middleware/valid";
import { sendSms } from "../config/sendSMS";
import { INewUser } from "../config/interface";
import { IDecodeToken } from "../config/interface";

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
      } else if(account){
        sendSms(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check phone" });
      }


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },

  activeAccount:async (req: Request, res: Response) => {
    try {
      const {active_token} = req.body
      const decode = <IDecodeToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      const  newUser  = decode;
      const user = new Users(newUser);
  
      if(!newUser) return res.status(400).json({msg: "Invalid authentication"})

  
      await user.save()
      res.json({msg: "Account has been activated!"})
      
    } catch (err) {
      let errMsg ;

      if(err.code === 11000){
        errMsg = Object.keys(err.keyValue)[0] + " already exit";
      } else {
        let name = Object.keys(err.keyValue)[0]
        errMsg = err.errors[`${name}`].message
      }
      return res.status(500).json({msg: errMsg})

    }
  }
};

export default authCtrl;
