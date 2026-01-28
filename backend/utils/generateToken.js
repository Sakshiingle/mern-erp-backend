import jwt from "jsonwebtoken";

const generateToken = (id, rememberMe = false) => {
  const expiresIn = rememberMe ? "30d" : "1d";

  return jwt.sign(
    { id },
    process.env.JWT_SECRET, // ✅ MUST match .env EXACTLY
    { expiresIn }
  );
};

export default generateToken;
