// express 모듈을 불러옵니다.
const fs = require("fs");
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;
const express = require("express");
const path = require("path");
const app = express();
// 정적 파일을 제공할 경로를 설정합니다.
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
const jsonpatch = require("jsonpatch");

const userController = require("./src/controller.js");

// 여기는 그냥 날짜설정 코드 / 
// Express 애플리케이션에 정적 파일 제공 설정 
// patch - chrome, chrome

// 여기서부터 백엔드서버
app.post("/submit",userController.submit);
app.post("/join",userController.join);
app.post("/info",userController.info);
app.post("/removePost",userController.removePost);
app.post("/removeComment",userController.removeComment);
app.post("/addComment",userController.addComment);
app.post("/fixNickname",userController.fixNickname);
app.post("/fixPassword",userController.fixPassword);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
