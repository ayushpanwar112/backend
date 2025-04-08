
import mongoose from "mongoose";



const postSchema = new mongoose.Schema({
    kind: { type: String, default: 'wordpress#post' },
    postId: { type: String }, // Remove 'unique: true' to allow duplicates
    blogId: { type: String, required: true },
    published: { type: Date },
    url: { type: String, required: true },
    title: { type: String },
    content: { type: String, required: true },
    author: {
      id: { type: String },
      displayName: { type: String },
      url: { type: String },
      imageUrl: { type: String },
    },
    keywords: { type: [String], default: [] },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    replies: {
      totalItems: { type: Number, default: 0 },
      selfLink: { type: String, default: '' },
    },
    etag: { type: String },
  });
  
  // Create a Mongoose model
  export const Post = mongoose.model('Post', postSchema);

const wordpressController = async (req, res) => {
  try {
    const blogs = await Post.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
};

export default wordpressController;
