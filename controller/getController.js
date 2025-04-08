import Blog from "../models/Blog.js";

const getController = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
};

export default getController;
