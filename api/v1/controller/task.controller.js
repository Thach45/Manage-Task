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


        const tasks = await Task.find(find).sort(sort).limit(pagination.limitPage).skip(pagination.skip);;
        res.json(tasks);
}
// Lấy chi tiết task /api/v1/task/detail/:id
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
// Thay đổi trạng thái task /api/v1/task/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const status = req.body.status;
        await Task.updateOne({_id: id}, {status: status});
        res.json({message: 'Change status success', code: 200});
    }
    catch(error){
        res.json({message: 'Task not found'});
    }
};
// Thay đổi trạng thái nhiều task /api/v1/task/change-multi
module.exports.changeMultiStatus = async (req, res) => {
    try{ 
        // Lấy thông tin từ body
        const {ids, key, value} = req.body;
        // Thay đổi trạng thái
        switch(key){
            case 'status':
                await Task.updateMany({_id: {$in: ids}}, {status: value});
                break;
            default:
                break;
        }
        res.json({message: 'Change status success', code: 200});
    }
    catch(error){
        res.json({message: 'Task not found'});
    }
}