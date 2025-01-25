const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    console.log("Verifying token...");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Authorization header is missing");
      return res.status(401).json({ message: "Authorization header not provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log("Token is missing in the authorization header");
      return res.status(401).json({ message: "Token not provided" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED", decoded);
    
    req.user = decoded; // Attach decoded token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error during token verification:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
