const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeEnd: Date,

    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
})
const Task = mongoose.model("Task", taskSchema, "tasks")
module.exports = Task 