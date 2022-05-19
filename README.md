# SE-Project-Front

软件工程综合实验 测试中心项目 前端

        npm install

或

        yarn install

运行：

        npm start

## json-server 使用指南

在 json-server 目录下打开 cmd，输入以下命令：

        npm install json-server --save-dev


安装成功后：

        node server.js

## .env 使用指南

目前在 .env 中已经添加了 JSON_SERVER 和 BACKEND_SERVER 的地址：

        REACT_APP_JSON_SERVER="http://localhost:3000"
        REACT_APP_BACKEND_SERVER="http://124.222.168.27:8080"

建议所有使用到这两个地址的地方统一替换成全局变量，例如 `"http://localhost:3000/xxx"` 替换为 `REACT_APP_JSON_SERVER + "/xxx"`。

修改完毕后需重新启动项目才能生效。
        
