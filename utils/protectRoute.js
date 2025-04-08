import express from "express";
import jwt from "jsonwebtoken"; // You need to import jwt
import errorResponse from "../middleware/errorResponse.js";
export  const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new errorResponse('Unauthorized', 401));
            }
            req.user = decoded; // Add decoded user information to the request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        return res.status(401).json({
            status: "failed",
            message: "Token not found",
        });
    }
};
export default protectRoute;