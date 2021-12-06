const moongose = require("mongoose");
const Schema = moongose.Schema;

const projectShema = new Schema({
    title: String,
    description: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Project = moongose.model("Project", projectShema);
module.exports = Project;