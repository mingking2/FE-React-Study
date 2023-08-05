
//env
require('dotenv').config();

const {Todo} = require(process.env.SERVER_PATH + "/models");

const post = async (id, text, checked) => {
    try{
        const rows = await Todo.findAll({
            where: {
                id: id,
            },
        });
        console.log(rows);
        if (rows.length === 0){
            console.log("good");
            await Todo.create({
                id,
                text,
                checked
            });
            console.log("good1");
            return [null, "completed"];
        }else{
            return [null, "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const get = async () => {
    try{
        const rows = await Todo.findAll();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const _delete = async (id) => {
    try{
        const rows = await Todo.destroy({
            where: {
                id
            },
        });
        if (rows.length === 0){
            return [null, "completed"];
        }else{
            return [null, "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const patch = async (id, checked) => {
    try{
        const rows = await Todo.findAll({
            where:{
                id
            }
        });
        if (rows.length === 0){
            return [new Error("not found"), "error"];
        }else{
            await Todo.update(
                {
                    checked
                },{
                    where:{
                        id
                    }
                }
            )
            return [null, "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.get = get;
module.exports.patch = patch;
module.exports._delete = _delete;
module.exports.post = post;