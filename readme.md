# Yelo-admin 🚀



### 介绍

🛠  Yelo Admin，基于 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite2、Ant-Design 5、Highcharts 开源的一套虚拟商城后台管理框架
🔌 作为练习时长半年的前端练习生，本项目旨在自我学习，当然也适合初学 react 的同学进行实战；如果你有好的建议欢迎提出，另外如果能帮助到你且觉得本项目还不错的话，也请不要吝啬你的 star (hhhhh 🧡

🪡 本项目的业务逻辑和 UI 设计风格参考了著名开源项目：[marmelab](https://github.com/marmelab)/**[react-admin](https://github.com/marmelab/react-admin)**，需要的同学也可以移步学习

### 一、在线预览地址

- Link：http://175.24.176.28/ (域名备案中)

### 二、Git 仓库地址

- Github：https://github.com/xiaogua-bushigua/yelo-admin

### 三、项目特点

- 🧩	使用最新的技术栈：React18、React-Router v6、React-Hooks、TypeScript、Vite2...
- 🧩    使用了 redux 进行状态管理，手动进行持久化本地存储 (redux-persist 有尝试，但似乎会把一个 store 里的所有 state 都存储，不太希望这样就没有用
- 🧩    使用 Typescript 对 Axios 进行封装，包括请求拦截 (登陆验证)、响应拦截、重复请求取消
- 🧩    使用自定义组件进行路由权限验证
- 🧩    支持主题切换、使用 i18n 进行语言国际化 (只做了部分，根据个人需要使用
- 🧩    支持 React-Router v6 路由懒加载配置
- 🧩    使用 Prettier 统一格式化代码
- 🧩    布局支持响应式，封装了多种风格统一的 UI 组件 (笑死，项目写完才发现有 [MUI](https://mui.com/) 这个组件库
- 🧩    excel 文件导出功能

### 四、后端接口数据

- 使用 python (Faker) 第三方库生成模拟数据，使用 EasyMock 创建接口：https://mock.mengxuegu.com/ 

  <font color='gray'>可以自行将项目中的 json 数据打包成你的接口</font>

### 五、项目截图

- **登录页**

<img src="D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-1.gif" style="zoom:70%;" />

![](https://raw.githubusercontent.com/xiaogua-bushigua/yelo-admin/main/screenshoots/6-1.gif)

- **看板页**

![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-2.gif)

- **HighChart**

![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-3.gif)

- **表单表格**（欢迎在线预览 http://175.24.176.28/

![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-4.png)



![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-5.png)



![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-6.png)



![](D:\frontend_learning\react18\react-projects\yelo-admin\screenshoots\6-7.png)