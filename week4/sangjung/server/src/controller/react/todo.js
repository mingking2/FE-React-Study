// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const modelTodo = require(PATH+"/src/model/react/modelTodo.js");

router.get('/', async (req, res)=>{
    try{
        const [data, status] = await modelTodo.get();
        if(status === "error"){
            throw data;
        }else{
            res.json({data,status});
        }
    }catch(err){
        console.error(err);
        res.json({error:true});
    }
});

router.post('/', async (req, res)=>{
    try{
        const id = req.body.id;
        const text = req.body.text;
        const checked = req.body.checked;
        const [data, status] = await modelTodo.post(id,text, checked);
        if(status === "error"){
            throw data;
        }else{
            res.json({data,status});
        }
    }catch(err){
        console.error(err);
        res.json({error:true});
    }
});

router.delete('/', async(req, res)=>{
    try{
        const id = Number(req.query.id);
        const [data, status] = await modelTodo._delete(id);
        if(status === "error"){
            throw data;
        }else{
            res.json({data,status});
        }
    }catch(err){
        console.error(err);
        res.json({error:true});
    }
});

router.patch('/', async(req, res)=>{
    try{
        const id = req.body.id;
        const checked = req.body.checked;
        const [data, status] = await modelTodo.patch(id,checked);
        if(status === "error"){
            throw data;
        }else{
            res.json({data,status});
        }
    }catch(err){
        console.error(err);
        res.json({error:true});
    }
});

router.use('/', (req, res) => {
    res.sendFile(ERROR_PAGE);
})

module.exports = router;