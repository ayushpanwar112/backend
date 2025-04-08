import axios from "axios";
import Blog from "../models/Blog.js";

const blogController = async (req, res) => {
  try {
    // Replace this with the actual Blogger API endpoint
    const bloggerApiUrl = process.env.BLOGGER_API_URL;

    // Fetch blogs from Blogger API
    const response = await axios.get(bloggerApiUrl, {
      params: {
        key: process.env.BLOGGER_KEY
      }
    });

    const blogs = response.data.items;

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    // Loop through each blog and check if it already exists in the database
    for (const blog of blogs) {
      const existingBlog = await Blog.findOne({ postId: blog.id });
      if (!existingBlog) {
        // If blog does not exist, create a new blog entry
        const newBlog = new Blog({
          kind: blog.kind,
          postId: blog.id,
          blogId: blog.blog.id,
          published: new Date(blog.published),
          updated: new Date(blog.updated),
          url: blog.url,
          title: blog.title,
          content: blog.content,
          author: "StockBox",
          keywords: blog.labels || [],
          description: blog.content.substring(0, 150), // Short description from content
          imageUrl: blog.thumbnail || "", // Thumbnail if exists
          replies: blog.replies || { totalItems: 0, selfLink: "" },
          etag: blog.etag,
        });
        await newBlog.save();
      }
    }

    res.status(200).json({ message: "Blogs fetched and stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
};

export default blogController;
