// 1,引入axios依赖包
import axios from "axios";
// 2,axios创建对象
const request = axios.create({
    baseURL:"https://api.shop.eduwork.cn/", // 管理后台要使用的接口的基地址
    timeout:8000, // 超时时间
})
// axios发送请求到服务器，获取资源， 什么时候调用，什么时候获取
/*request.post('./api/auth/login',{
    data:{
        email:'Nsin@163.com',
        password:'123123'
    }
})*/

//3,定义前置拦截器，请求拦截器，请求发出之前触发的
request.interceptors.request.use((config)=>{
    // config 接口请求的配置信息
    return config;
    // 1，获取token
    const token = localStorage.getItem("token");
    // 2,判断token是否存在
    if(token){
        // 3，如果存在，添加到请求头参数中
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    // 报错的是定义前置拦截器时候抛出一个错误信息
    return Promise.reject(error);
});

request.interceptors.response.use((response)=>{
    // 响应回来的数据操作
    return response.data;
},(error)=>{
    // 报错的时候抛出一个报错信息
    return Promise.reject(error);
})

// 抛出对象的信息
export default request


