import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});


export const BlogPost = mongoose.model("BlogPost", blogPostSchema);