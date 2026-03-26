import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;  // store the user ID

    next();

  } catch (error) {

    return res.status(401).json({ message: "Invalid token" });

  }
};

// 🔹 Make sure you have this line at the bottom:
export default authMiddleware;