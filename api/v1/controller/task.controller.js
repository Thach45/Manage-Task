const Task = require('../models/task.model');
module.exports.index = async (req, res) => {
        let find = {
            deleted: false
        };
        if(req.query.status){
            find.status = req.query.status;
        }
        let sort = {};
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey] = req.query.sortValue;
        }
        console.log(sort);
        const tasks = await Task.find(find).sort(sort);;
        res.json(tasks);
}

module.exports.detail = async (req, res) => {
    try{
        const id = req.params.id;
        const task = await Task.findOne({_id: id, deleted: false});
        res.json(task);
    }
    catch(error){
        res.json({message: 'Task not found'});
    }
}