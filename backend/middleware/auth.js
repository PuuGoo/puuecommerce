import ErrorHander from "../utils/errorhander.js";
import catchAsyncErrors from "./catchAsyncErrors.js"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const {
        token
    } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)

    next();
})

// Xét quyền truy cập cho vai trò cụ thể như là được phép truy cập cái gì
const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed to access this resouce`, 403))
        }

        next();
    }
}

export {
    isAuthenticatedUser,
    authorizeRoles
}