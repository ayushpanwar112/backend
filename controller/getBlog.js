import Blog from "../models/Blog.js"; 
import mongoose from "mongoose";  // Import mongoose for ObjectId validation
import { Post } from "./wordpressController.js";


// Get a single blog post by _id
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    const post = await Blog.findById(id); // Search by _id
    const existingPost = await Post.findById(id); // Search by postId

    if (!post) {
      if(!existingPost){
        return res.status(404).json({ message: "Post not found" });
      }
      else
      return res.status(200).json(existingPost);
    }
    else {
 res.status(200).json(post);
    }

   
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

export default getPostById;
