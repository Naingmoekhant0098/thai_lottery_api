import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  secret: process.env.secret || "mysecretkeyisnothingtobehardcoded",

  // ImageKit
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
  },

  // Database (if needed)
  database: {
    url: process.env.DATABASE_URL || "",
  },
};

export default config;
