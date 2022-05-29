#两个表里的this.state.contractId和this.state.entrustmentId可能有问题，对prop的传参还没怎么搞明白...


# SE-Project-Front

软件工程综合实验 测试中心项目 前端

        npm install

或

        yarn install

运行：

        npm start

或

        yarn start

### 迁移后可能存在的问题

登录和用户信息页，由于axios访问地址的前缀不正确导致的，预计但尚无法确认修正后即能正确访问

## json-server 使用指南

在 json-server 目录下打开 cmd，输入以下命令：

        npm install json-server --save-dev


安装成功后：

        node server.js

## .env 使用指南

目前在 .env 中已经添加了 JSON_SERVER 和 BACKEND_SERVER 的地址：

        REACT_APP_JSON_SERVER="http://localhost:3000"
        REACT_APP_BACKEND_SERVER="http://localhost:7777"

建议所有使用到这两个地址的地方统一替换成全局变量，例如 `"http://localhost:3000/xxx"` 替换为 `REACT_APP_JSON_SERVER + "/xxx"`。

修改完毕后需重新启动项目才能生效。
        
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

## 人员注册清单

|权限|用户名|密码|
|----|----|----|
|管理员|admin|45c1089e-067c-48c8-a034-b6ca88b8ea8b|
|测试|test|test|
|用户|CUSTOMER|123456|
|市场部人员|MARKETER|123456|
|测试部人员|TESTER|123456|
|质量部人员|QA|123456|
|市场部主管|MARKETING_SUPERVISOR|123456|
|测试部主管|TESTING_SUPERVISOR|123456|
|质量部主管|QA_SUPERVISOR|123456|
