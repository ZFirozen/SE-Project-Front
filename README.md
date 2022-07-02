# SE-Project-Front

软件工程综合实验 测试中心项目 前端

        npm install

或

        yarn install

运行：

        npm start

或

        yarn start

## json-server 使用指南

在 json-server 目录下打开 cmd，输入以下命令：

        npm install json-server --save-dev


安装成功后：

        node server.js

## localStorage 使用指南

首先安装依赖：

        npm install localStorage --legacy-peer-deps

使用前先 `import localStorage from "localStorage";`，

存：

        localStorage.setItem("phone", "123")

        //对象
        let obj = {"name":"xiaoming","age":"16"}
        localStorage.setItem("phone",JSON.stringify(obj));

取：

        localStorage.getItem("phone")

        //对象
        let user = JSON.parse(localStorage.getItem("phone"))

删：

        //指定删
        localStorage.removeItem('phone');

        //全删
        localStorage.clear(); 

本项目中若想获取用户名和用户角色信息，请使用：

        const userName = localStorage.getItem("userName");
        const userRole = localStorage.getItem("userRole");

## 自动化测试脚本

使用前需要先

        pip install selenium

然后打开Chrome查看当前版本号
点击[下载](http://npm.taobao.org/mirrors/chromedriver/)对应版本号的Chromedriver，解压并将路径添加到环境变量Path
打开seletest，将需要使用的测试脚本中的path中单引号部分改为chromedriver.exe的路径
然后

        python test.py

自动运行脚本文件

## 人员注册清单

|权限|用户名|密码|
|----|----|----|
|管理员|a|123|
|测试|test|test|
|用户|CUSTOMER|123456|
|市场部人员|MARKETER|123456|
|测试部人员|TESTER|123456|
|质量部人员|QA|123456|
|市场部主管|MARKETING_SUPERVISOR|123456|
|测试部主管|TESTING_SUPERVISOR|123456|
|质量部主管|QA_SUPERVISOR|123456|

## 后端api地址

[后端api](https://www.apifox.cn/web/project/918627)

## 本项目使用antdesign pro

[antdesign pro文档](https://pro.ant.design/zh-CN/docs/overview)