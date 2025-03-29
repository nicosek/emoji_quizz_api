const express = require("express");
const router = express.Router({ mergeParams: true });

const MembershipController = require("../../controllers/membership_controller");
const Membership = require("../../models/Membership");

const auth = require("../../middlewares/auth_middleware");
const authorize = require("../../middlewares/authorize");
const asyncHandler = require("../../middlewares/async-handler");

// POST /groups/:groupId/members
router.post(
  "/:userId",
  auth,
  authorize(Membership, "create"),
  asyncHandler(MembershipController.create)
);

// PATCH /groups/:groupId/members/:userId
router.patch(
  "/:userId",
  auth,
  authorize(Membership, "update"),
  asyncHandler(MembershipController.update)
);

// DELETE /groups/:groupId/members/:userId
router.delete(
  "/:userId",
  auth,
  authorize(Membership, "delete"),
  asyncHandler(MembershipController.delete)
);

module.exports = router;
