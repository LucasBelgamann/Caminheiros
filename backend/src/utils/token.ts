import jwt, { Algorithm, Secret } from "jsonwebtoken";

const secretKey: Secret = process.env.JWT_SECRET || "defaultSecret";

const tokenOptions = {
  algorithm: "HS256" as Algorithm, 
  expiresIn: process.env.JWT_EXPIRES_IN || "2h",
};

const createToken = (payload: any) => {
  const token = jwt.sign(payload, secretKey, tokenOptions);
  return token;
};

const validateToken = (token: string) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

export { createToken, validateToken };
