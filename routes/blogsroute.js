import express from "express";
import blogController from "../controller/blogController.js";
import getController from "../controller/getController.js";
import reviewController from "../controller/reviewControllers.js";

import wordpressController from "../controller/wordpressController.js";
import getReview from "../controller/getReview.js";
import getPostById from "../controller/getBlog.js";
import updateAuthorController from "../controller/updateAuthorController.js"; // Corrected import
import email from "../controller/email.js";
import {getAllData, addEntry, updateEntry, deleteEntry} from "../controller/tabledata/TableData.js";
import { getAllDataY,addEntryY, updateEntryY, deleteEntryY } from "../controller/tableYearly/TableYeralyController.js";
import { deleteEvent, getEvent, uploadEvent } from "../controller/eventController.js";



const blogRoute = express.Router();

blogRoute.post("/fetch-blogs", blogController);
blogRoute.get("/blogs", getController);
blogRoute.get("/fetch-reviews", reviewController);
blogRoute.get("/review", getReview);
blogRoute.get("/fetch", wordpressController);
blogRoute.get("/fetch-blog/:id", getPostById);
blogRoute.put("/update/:id", updateAuthorController); 
// Route for updating author
blogRoute.post("/sendmail",email);

blogRoute.get("/table", getAllData);     // Get all data
blogRoute.post("/table", addEntry);      // Add new entry
blogRoute.put("/table/:id", updateEntry); // Update entry by ID
blogRoute.delete("/table/:id", deleteEntry);

blogRoute.get("/tableYearly", getAllDataY);
blogRoute.post("/tableYearly", addEntryY);
blogRoute.put("/tableYearly/:id", updateEntryY);
blogRoute.delete("/tableYearly/:id", deleteEntryY);     


blogRoute.post("/event/upload", uploadEvent); // Upload or update event image
blogRoute.get("/event", getEvent); // Fetch the latest event image
blogRoute.delete("/event", deleteEvent);


export default blogRoute;
