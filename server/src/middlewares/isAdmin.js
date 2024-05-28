import asyncHandler from "../libs/AsyncHandler.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to perform this action");
  }
  req.user = user;
  next();
});
