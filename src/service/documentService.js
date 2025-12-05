import Document from "../models/Document.js";

export const createDocument = async (data) => {
  return await Document.create(data);
};

export const getDocumentById = async (id) => {
  return await Document.findById(id);
};

export const getDocumentsByUser = async (userId) => {
  return await Document.find({ uploadedBy: userId });
};

export const deleteDocumentById = async (id) => {
  return await Document.findByIdAndDelete(id);
};

export const addHistory = async (id, entry) => {
  return await Document.findByIdAndUpdate(
    id,
    { $push: { history: entry } },
    { new: true }
  );
};
