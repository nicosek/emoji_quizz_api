const express = require("express");
const router = express.Router();

const GroupController = require("../controllers/group_controller");
const Group = require("../models/Group");

const auth = require("../middlewares/auth_middleware");
const authorize = require("../middlewares/authorize");
const asyncHandler = require("../middlewares/async-handler");

router.get(
  "/",
  auth,
  authorize(Group, "index"),
  asyncHandler(GroupController.index)
);

router.get(
  "/:id",
  auth,
  authorize(Group, "show"),
  asyncHandler(GroupController.show)
);

router.post(
  "/",
  auth,
  authorize(Group, "create"),
  asyncHandler(GroupController.create)
);

router.patch(
  "/:id",
  auth,
  authorize(Group, "update"),
  asyncHandler(GroupController.update)
);

router.delete(
  "/:id",
  auth,
  authorize(Group, "delete"),
  asyncHandler(GroupController.delete)
);

module.exports = router;
