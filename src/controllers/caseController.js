// import {
//   createCaseService,
//   getCaseByIdService,
//   updateCaseService,
//   addMilestoneService,
//   logActivityService,
//   deleteCaseByIdService,
// } from "../service/caseService";

// export const createCase = async (req, res) => {
//   try {
//     const caseData = req.body;
//     const newCase = await createCaseService(caseData);
//     res.status(201).json(newCase);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "Failed to create case", error: error.message });
//   }
// };

// export const getCaseById = async (req, res) => {
//   const user = req.user;
//   const isAdmin = user.role === "admin";
//   const isClient = caseItem.clientId.toString() === user._id;
//   const isLawyer = caseItem.lawyerId.toString() === user._id;

//   if (!isAdmin && !isClient && !isLawyer) {
//     return res.status(403).json({ message: "Not allowed to access this case" });
//   }
//   try {
//     const caseItem = await getCaseByIdService(req.params.id);
//     if (!caseItem) return res.status(404).json({ msg: "Case not found" });
//     res.json(caseItem);
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// export const updateCase = async (req, res) => {
//   const user = req.user;
//   const isAdmin = user.role === "admin";
//   const isClient = caseItem.clientId.toString() === user._id;
//   const isLawyer = caseItem.lawyerId.toString() === user._id;

//   if (!isAdmin && !isClient && !isLawyer) {
//     return res.status(403).json({ message: "Not allowed to access this case" });
//   }
//   try {
//     const updatedCase = await updateCaseService(req.params.id, req.body);
//     if (!updatedCase) return res.status(404).json({ msg: "Case not found" });
//     res.json(updatedCase);
//   } catch (error) {
//     res.status(500).json({ msg: "Update failed", error: error.message });
//   }
// };

// export const addMilestone = async (req, res) => {
//   const user = req.user;
//   const isAdmin = user.role === "admin";

//   const isLawyer =
//     user.role === "lawyer" && caseItem.lawyerId?.toString() === user._id;

//   if (!isLawyer && !isAdmin) {
//     return res.status(403).json({
//       message: "Only the assigned lawyer can add milestones to this case",
//     });
//   }
//   try {
//     const milestone = req.body;
//     const caseId = req.params.id;

//     const updatedCase = await addMilestoneService(caseId, milestone);

//     if (!updatedCase) {
//       return res.status(404).json({ msg: "Case not found" });
//     }

//     res.json(updatedCase);
//   } catch (error) {
//     res.status(500).json({
//       msg: "Failed to add milestone",
//       error: error.message,
//     });
//   }
// };
// export const logActivity = async (req, res) => {
//   try {
//     const { userId, action } = req.body;
//     const { id: caseId } = req.params;

//     const updatedCase = await logActivityService(caseId, userId, action);

//     if (!updatedCase) {
//       return res.status(404).json({ msg: "Case not found" });
//     }

//     return res.json({
//       msg: "Activity logged successfully",
//       data: updatedCase,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Failed to log activity",
//       error: error.message,
//     });
//   }
// };
// export const assignLawyer = async (req, res) => {
//   try {
//     const updatedCase = await updateCaseService(req.params.id, {
//       lawyerId: req.body.lawyerId,
//     });

//     res.status(200).json(updatedCase);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// export const addDeadline = async (req, res) => {
//   try {
//     const caseItem = await getCaseByIdService(req.params.id);
//     if (!caseItem) return res.status(404).json({ message: "Case not found" });

//     const isLawyer =
//       req.user.role === "lawyer" &&
//       caseItem.lawyerId.toString() === req.user._id;

//     if (!isLawyer) {
//       return res.status(403).json({
//         message: "Only assigned lawyer can add deadlines",
//       });
//     }

//     caseItem.deadlines.push(req.body);
//     await caseItem.save();

//     await logActivityService(req.params.id, req.user._id, "Added Deadline");

//     res.status(200).json(caseItem);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Get All Cases of Current User
//  */
// export const getMyCases = async (req, res) => {
//   try {
//     const filter =
//       req.user.role === "client"
//         ? { clientId: req.user._id }
//         : { lawyerId: req.user._id };

//     const cases = await Case.find(filter);

//     res.status(200).json(cases);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Delete Case — Admin Only
//  */
// export const deleteCase = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can delete cases" });
//     }

//     await deleteCaseByIdService(req.params.id);

//     res.status(200).json({ message: "Case deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
