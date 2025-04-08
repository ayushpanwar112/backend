import mongoose from "mongoose";

const tableDataSchema = new mongoose.Schema({
  Year: {
    type: String,
    
  },
  carriedForward: {
    type: Number,
    
  },
  received: {
    type: Number,
   
  },
  resolved: {
    type: Number,
   
  },
  pending: {
    type: Number,
    
  },
}, { timestamps: true });

const TableYearly = mongoose.model("TableDataYearly", tableDataSchema);

export default TableYearly;
