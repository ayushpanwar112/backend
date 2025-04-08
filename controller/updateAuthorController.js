import Blog from "../models/Blog.js";

const updateAuthorController = async (req, res) => {
  const { id } = req.params;
  const { displayName } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { "_id": id },
      { "author.displayName": displayName },
      { new: true }
    );

   

    if (!blog) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author name updated successfully", blog });
  } catch (error) {
    console.error("Error updating author name:", error);
    res.status(500).json({ error: "Failed to update author name" });
  }
};

export default updateAuthorController;