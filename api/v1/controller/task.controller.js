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
        //Phân trang
        let pagination = {
            current: 1,
            limitPage: 2
        }
        if (req.query.page) {
            pagination.current = parseInt(req.query.page);
            pagination.limitPage = parseInt(req.query.limit) || 4;
        }
        pagination.skip = (pagination.current - 1) * pagination.limitPage;
    
    
        //Đếm tổng số trang
        let count = await Task.countDocuments(find);
        const total = Math.ceil(count / pagination.limitPage);
        pagination.page = total;
        // tìm kiếm
        if(req.query.search){
            find.title = new RegExp(req.query.search, 'i');
        }
        console.log(find);


        const tasks = await Task.find(find).sort(sort).limit(pagination.limitPage).skip(pagination.skip);;
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
