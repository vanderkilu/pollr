import express from "express";
import { authenticate, generateAccessToken, respond } from "../middleware";
import passport from "passport";
import {
  register,
  logout,
  users,
  getPollsForUser,
} from "../controller/accounts";
import {
  createPoll,
  getPollsForCategory,
  getAllPoll,
  getAllCategory,
  getRecentPolls,
  getPopularPolls,
  createCategory,
  getPoll,
  updatePoll,
  deletePoll,
  vote,
  updatePollCount,
  getPollOptionsForPoll,
  updatePollOption,
} from "../controller/polls";
import {
  getAllCommentForPoll,
  getAllReplyForComment,
  createComment,
  createReply,
  like,
} from "../controller/comment";

module.exports = (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const pollRoutes = express.Router();

  apiRoutes.use("/account", authRoutes);
  apiRoutes.use("/poll", pollRoutes);

  //account routes
  authRoutes.post("/register", register);
  authRoutes.post(
    "/login",
    passport.authenticate("local", { session: false, scope: [] }),
    generateAccessToken,
    respond
  );
  authRoutes.get("/logout", logout);
  authRoutes.get("/users", users);
  authRoutes.get("/user/:user_id/polls", authenticate, getPollsForUser);

  //poll routes
  pollRoutes.post("/create", authenticate, createPoll);
  pollRoutes.get("/category/:category_id/polls", getPollsForCategory);
  pollRoutes.get("/categories", getAllCategory);
  pollRoutes.get("/recent", getRecentPolls);
  pollRoutes.get("/popular", getPopularPolls);
  pollRoutes.post("/category", authenticate, createCategory);
  pollRoutes.get("/", getAllPoll);
  pollRoutes.get("/:poll_id", getPoll);
  pollRoutes.put("/:poll_id", authenticate, updatePoll);
  pollRoutes.delete("/:poll_id", authenticate, deletePoll);
  pollRoutes.post("/:poll_id/vote", authenticate, vote);
  pollRoutes.put("/:poll_id/update-count", authenticate, updatePollCount);
  pollRoutes.get("/:poll_id/polloptions", getPollOptionsForPoll);
  pollRoutes.put("/:poll_id/polloptions", authenticate, updatePollOption);

  //comment routes
  pollRoutes.get("/:poll_id/comments", getAllCommentForPoll);
  pollRoutes.post("/:poll_id/comments", authenticate, createComment);
  pollRoutes.get("/comment/reply", authenticate, getAllReplyForComment),
    pollRoutes.post("/comment/reply", authenticate, createReply);
  pollRoutes.put("/comment/likes", authenticate, like);

  return app.use("/api", apiRoutes);
};
