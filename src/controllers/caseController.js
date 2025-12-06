// import {
//     createCaseService,
//     getCaseByIdService,
//     updateCaseService,
//     addMilestoneService,
//     addDeadlineService,
//     logActivityService,
//     deleteCaseByIdService,
//     getMyCasesService,
//     assignLawyerService
// } from "../service/caseService.js";

// export const createCase = async (req, res) => {
//     try {
//         // const caseData = req.body;
//         // caseData.clientId = req.user._id; // If a client is logged-in, use their id
//         const caseData = req.body;
//         caseData.clientId = req.user?._id || caseData.clientId;

//         const newCase = await createCaseService(caseData);
//         res.status(201).json(newCase);
//     } catch (error) {
//         res.status(500).json({ msg: "Failed to create case", error: error.message });
//     }
// };

// export const getCaseById = async (req, res) => {
//     try {
//         const caseItem = await getCaseByIdService(req.params.id);
//         if (!caseItem) return res.status(404).json({ msg: "Case not found" });

//         const user = req.user;
//         const isAdmin = user.role === "admin";
//         const isClient = caseItem.clientId._id?.toString() === user._id.toString();
//         const isLawyer = caseItem.lawyerId?._id?.toString() === user._id.toString();

//         if (!isAdmin && !isClient && !isLawyer) {
//             return res.status(403).json({ message: "Not allowed to access this case" });
//         }
//         res.json(caseItem);
//     } catch (error) {
//         res.status(500).json({ msg: "Server error", error: error.message });
//     }
// };

// export const updateCase = async (req, res) => {
//     try {
//         const caseItem = await getCaseByIdService(req.params.id);
//         if (!caseItem) return res.status(404).json({ msg: "Case not found" });

//         const user = req.user;
//         const isAdmin = user.role === "admin";
//         const isClient = caseItem.clientId._id?.toString() === user._id.toString();
//         const isLawyer = caseItem.lawyerId?._id?.toString() === user._id.toString();

//         if (!isAdmin && !isClient && !isLawyer) {
//             return res.status(403).json({ message: "Not allowed to update this case" });
//         }

//         const updatedCase = await updateCaseService(req.params.id, req.body);

//         res.json(updatedCase);
//     } catch (error) {
//         res.status(500).json({ msg: "Update failed", error: error.message });
//     }
// };

// export const assignLawyer = async (req, res) => {
//     try {
//         // Only admin can assign lawyer
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Only admin can assign lawyer" });
//         }
//         const caseId = req.params.id;
//         const { lawyerId } = req.body;
//         const updatedCase = await assignLawyerService(caseId, lawyerId);
//         if (!updatedCase) {
//             return res.status(404).json({ msg: "Case not found" });
//         }
//         res.status(200).json(updatedCase);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const addMilestone = async (req, res) => {
//     try {
//         const caseItem = await getCaseByIdService(req.params.id);
//         if (!caseItem) return res.status(404).json({ msg: "Case not found" });

//         const user = req.user;
//         const isAdmin = user.role === "admin";
//         const isLawyer =
//             user.role === "lawyer" && caseItem.lawyerId?._id?.toString() === user._id.toString();

//         if (!isLawyer && !isAdmin) {
//             return res.status(403).json({
//                 message: "Only assigned lawyer or admin can add milestones",
//             });
//         }
//         const milestone = req.body;
//         const updatedCase = await addMilestoneService(req.params.id, milestone);
//         res.json(updatedCase);
//     } catch (error) {
//         res.status(500).json({ msg: "Failed to add milestone", error: error.message });
//     }
// };

// export const addDeadline = async (req, res) => {
//     try {
//         const caseItem = await getCaseByIdService(req.params.id);
//         if (!caseItem) return res.status(404).json({ msg: "Case not found" });

//         const user = req.user;
//         const isAdmin = user.role === "admin";
//         const isLawyer =
//             user.role === "lawyer" && caseItem.lawyerId?._id?.toString() === user._id.toString();

//         if (!isLawyer && !isAdmin) {
//             return res.status(403).json({
//                 message: "Only assigned lawyer or admin can add deadlines",
//             });
//         }
//         const deadline = req.body; // Expecting a Date or an array if passed
//         const updatedCase = await addDeadlineService(req.params.id, deadline);
//         res.status(200).json(updatedCase);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const getMyCases = async (req, res) => {
//     try {
//         const cases = await getMyCasesService(req.user);
//         res.status(200).json(cases);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const logActivity = async (req, res) => {
//     try {
//         const { userId, action } = req.body;
//         const { id: caseId } = req.params;

//         const updatedCase = await logActivityService(caseId, userId, action);

//         if (!updatedCase) {
//             return res.status(404).json({ msg: "Case not found" });
//         }

//         return res.json({
//             msg: "Activity logged successfully",
//             data: updatedCase,
//         });
//     } catch (error) {
//         res.status(500).json({
//             msg: "Failed to log activity",
//             error: error.message,
//         });
//     }
// };

// /**
//  * Delete Case — Admin Only
//  */
// export const deleteCase = async (req, res) => {
//     try {
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Only admin can delete cases" });
//         }

//         await deleteCaseByIdService(req.params.id);

//         res.status(200).json({ message: "Case deleted" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


import {
    createCaseService,
    getCaseByIdService,
    updateCaseService,
    addMilestoneService,
    addDeadlineService,
    logActivityService,
    deleteCaseByIdService,
    getMyCasesService,
    assignLawyerService
} from "../service/caseService.js";

// CREATE
export const createCase = async (req, res) => {
    try {
        const caseData = req.body;
        caseData.clientId = req.user?._id || caseData.clientId;
        const newCase = await createCaseService(caseData);
        res.status(201).json(newCase);
    } catch (error) {
        res.status(500).json({ msg: "Failed to create case", error: error.message });
    }
};

// GET ALL CASES
export const getAllCases = async (req, res) => {
    try {
        // Dev mode: always get all cases, ignore user
        const cases = await getMyCasesService();
        res.status(200).json(cases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET CASE BY ID
export const getCaseById = async (req, res) => {
    try {
        const caseItem = await getCaseByIdService(req.params.id);
        if (!caseItem) return res.status(404).json({ msg: "Case not found" });
        res.json(caseItem);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// UPDATE CASE
export const updateCase = async (req, res) => {
    try {
        const caseItem = await getCaseByIdService(req.params.id);
        if (!caseItem) return res.status(404).json({ msg: "Case not found" });
        const updatedCase = await updateCaseService(req.params.id, req.body);
        res.json(updatedCase);
    } catch (error) {
        res.status(500).json({ msg: "Update failed", error: error.message });
    }
};

// ASSIGN LAWYER
export const assignLawyer = async (req, res) => {
    try {
        const caseId = req.params.id;
        const { lawyerId } = req.body;
        const updatedCase = await assignLawyerService(caseId, lawyerId);
        if (!updatedCase) {
            return res.status(404).json({ msg: "Case not found" });
        }
        res.status(200).json(updatedCase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD MILESTONE
export const addMilestone = async (req, res) => {
    try {
        const caseItem = await getCaseByIdService(req.params.id);
        if (!caseItem) return res.status(404).json({ msg: "Case not found" });
        const milestone = req.body;
        const updatedCase = await addMilestoneService(req.params.id, milestone);
        res.json(updatedCase);
    } catch (error) {
        res.status(500).json({ msg: "Failed to add milestone", error: error.message });
    }
};

// ADD DEADLINE
export const addDeadline = async (req, res) => {
    try {
        const caseItem = await getCaseByIdService(req.params.id);
        if (!caseItem) return res.status(404).json({ msg: "Case not found" });
        const deadline = req.body;
        const updatedCase = await addDeadlineService(req.params.id, deadline);
        res.status(200).json(updatedCase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOG ACTIVITY
export const logActivity = async (req, res) => {
    try {
        const { userId, action } = req.body;
        const { id: caseId } = req.params;
        const updatedCase = await logActivityService(caseId, userId, action);
        if (!updatedCase) {
            return res.status(404).json({ msg: "Case not found" });
        }
        return res.json({
            msg: "Activity logged successfully",
            data: updatedCase,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to log activity",
            error: error.message,
        });
    }
};

// DELETE CASE
export const deleteCase = async (req, res) => {
    try {
        await deleteCaseByIdService(req.params.id);
        res.status(200).json({ message: "Case deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

