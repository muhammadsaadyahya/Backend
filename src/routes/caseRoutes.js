// import express from "express";
// import * as caseController from "../controllers/caseController.js";
// import { auth } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/", auth, caseController.getMyCases);
// router.get("/:id", auth, caseController.getCaseById);

// router.put("/:id", auth, caseController.updateCase);
// router.put("/:id/assign-lawyer", auth, caseController.assignLawyer);

// router.post("/", auth, caseController.createCase);
// router.post("/:id/milestones", auth, caseController.addMilestone);
// router.post("/:id/deadlines", auth, caseController.addDeadline);

// router.delete("/:id", auth, caseController.deleteCase);

// export default router;

import express from "express";
import * as caseController from "../controllers/caseController.js";

const router = express.Router();

// Correct the handler for "GET /" to getAllCases (not getMyCases)
router.get("/", caseController.getAllCases);

// All other routes
router.get("/:id", caseController.getCaseById);

router.put("/:id", caseController.updateCase);
router.put("/:id/assign-lawyer", caseController.assignLawyer);

router.post("/", caseController.createCase);
router.post("/:id/milestones", caseController.addMilestone);
router.post("/:id/deadlines", caseController.addDeadline);
router.post("/:id/activity", caseController.logActivity);

router.delete("/:id", caseController.deleteCase);

export default router;