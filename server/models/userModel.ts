import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long"],
    },
    account: {
      type: String,
      require: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://imgs.search.brave.com/7eiEJ7n9pV_X26P0kS_d7zfC-KbjQHKXgo3vQ2ZvciQ/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/cGFwaXJ1cy10ZWFt/L3BhcGlydXMtc3Rh/dHVzLzUxMi9hdmF0/YXItZGVmYXVsdC1p/Y29uLnBuZw",
    },
    role: {
      type: String,
      default: "user", // admin
    },
    type: {
      type: String,
      default: "normal", // fast
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
