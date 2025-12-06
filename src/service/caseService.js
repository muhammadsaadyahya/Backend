// import Case from "./../models/Case";

// export const createCaseService = async (caseData) => {
//   return await Case.create(caseData);
// };
// export const getCaseByIdService = async (caseId) => {
//   return await Case.findById(caseId).populate(
//     "clientId lawyerId documents activityLog.updatedBy"
//   );
// };
// export const updateCaseService = async (caseId, data) => {
//   return await Case.findByIdAndUpdate(caseId, data, { new: true });
// };
// export const findCaseByIdService = async (caseId) => {
//   return await Case.findById(caseId);
// };
// export const deleteCaseByIdService = async (caseId) => {
//   return await Case.findByIdAndDelete(caseId);
// };

// export const addMilestoneService = async (caseId, milestone) => {
//   const caseItem = await Case.findById(caseId);
//   if (!caseItem) return null;

//   caseItem.milestones.push(milestone);
//   return await caseItem.save();
// };

// export const logActivityService = async (caseId, userId, action) => {
//   return await Case.findByIdAndUpdate(
//     caseId,
//     {
//       $push: { activityLog: { updatedBy: userId, action, date: new Date() } },
//     },
//     { new: true }
//   );
// };
