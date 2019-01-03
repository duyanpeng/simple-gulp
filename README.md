# simple-gulp

### 功能

- [x] less转css
- [x] css autoprefixer
- [x] 实时刷新本地服务
- [x] proxy请求代理

### 目录

├── package.json    
├── dist            // 打包之后的文件
├── gulpfile.js      // gulp配置文件          
└── src             // 源代码文件        
    ├── css          // css          
    │   ├── firstPage.less      
    │   └── reset.css         // reset css        
    ├── image       // 图片                
    │   └── picture.jpg   
    ├── js          // js          
    │   ├── firstPage.js   
    │   └── rem.js   
    ├── libs       // js库
    │   ├── fastclick.js     
    │   ├── swiper.min.js   
    │   ├── vue.js   
    │   ├── zepto.animate.js  
    │   └── zepto.min.js   
    ├── firstPage.html       // html      
    └── secondPage.html       

### 使用方法
+ 安装
```
// 全局安装gulp，注意安装3版本，该配置不支持gulp4
npm i gulp@3.9.1 -g

// 安装依赖
npm i

// 运行

npm run start
// 打开浏览器 localhost:9999
// 如果有index.html文件则自动进入，如果有多html文件可以在网页中选择
``` 
+ less文件
```
//支持less转css，注意html引用less文件时要用相对路径引用同名css，例子参考src/firstPage.html         

<!-- 注意虽然是less文件，但是引用要引css后缀，因为les文件会在dist目录内被编译为css -->        
<link rel="stylesheet"href="./css/firstPage.css">

```   
+ 设置proxy
```
// proxy在gulpfile文件配置        
return [
    // 配置代理在这里！
    proxy('/proxy', {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
            '^/proxy': ''
        }
    }),
]
```  

+ rem转换
```
// 没有配置自动rem转换，需要转换的html文件需要引入js/rem.js文件，如firstPage.html      
<!-- rem转px方法 -->         
<script src="./js/rem.js"></script>         
// 默认基准 1rem=20px,设计稿375px,可在js/rem.js更改配置

// vscode建议安装 cssrem 插件可根据px自动算出对应rem大小，或者使用计算器手算
```

+ 发布
```
// dist文件夹内包含所有打包代码。
```

### 注意
+ html记得引用reset.css
+ 多html页面不要叫index.html
+ 代码写在src中，不要写在dist里会丢失
+ src中删除文件不会映射到dist目录中，可在dist目录中手动删除，或重新npm run start
+ 发生错误重新npm run start