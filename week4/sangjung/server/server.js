
const express = require('express');
const app = express();
const {sequelize} = require('./models');
const cors = require('cors');

// router
const router = require('./src/controller/route');

//env
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

//db 
sequelize.sync({force:true})
  .then(()=>{
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.error(err);
  });

app.set('port', process.env.PORT || 8080);

// 모든 라우트에 대한 CORS 사용 설정
app.use(cors());

app.use(express.json()); 

app.use('/', router);

app.listen(app.get('port'), () => {
  console.log("Listening at",app.get('port'));
});