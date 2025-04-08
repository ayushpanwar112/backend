import TableYearly from "../../models/TableYearly.js";

// ✅ Get All Entries
export const getAllDataY = async (req, res) => {
  try {
    const data = await TableYearly.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add New Entry
export const addEntryY = async (req, res) => {
  try {
    const newEntry = new TableYearly(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Entry added successfully", data: newEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update an Entry
export const updateEntryY = async (req, res) => {
  try {
    const updatedEntry = await TableYearly.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Entry updated successfully", data: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an Entry
export const deleteEntryY = async (req, res) => {
  try {
    await TableYearly.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
