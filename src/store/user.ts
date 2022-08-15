import {defineStore} from "pinia";
import {login,user} from '@/api/auth'

// 定义state中的数据类型
export interface IUserState {
    token:string;
    username:string;
    avatar:string;
    permissions:string[];
    info:Object;
}
export const useUserStore = defineStore({
    id: 'app-user',
    state: ():IUserState => ({
        token:localStorage.getItem('token') || '', // 在页面刷新时已经保留token
        username:'',
        avatar:'',
        permissions:[],
        info:{},
    }),
    getters:{ // 接收
        getToken():string {
            return this.token;
        },
        getAvatar():string {
            return this.avatar;
        },
        getNickname():string {
            return this.username;
        },
        getPermissions():string[] {
            return this.permissions;
        },
        getUserInfo():Object {
            return this.info;
        }
    },
    actions:{
      setToken(token: string){
          // sessionStorage.setItem('token',token); // 一开新的窗口,token就会消失
          // token本地储存  localStarage本地存储
          localStorage.setItem('token',token)
          this.token = token;
      },
      setAvatar(avatar: string){
          this.avatar = avatar;
      },
      setUserInfo(info:Object){
          this.info = info;
      },
      setUserName(username:string){
          this.username = username;
      },
      setPermissions(permissions:string[]){
          this.permissions = permissions;
      },
        // 异步的登录方法
      async login(userInfo:Object){
          try {
              const response = await login(userInfo);
              if (response.access_token){
                  this.setToken(response.access_token);
                  // 登录之后，token已经拿到了，然后getUser获取调用,
                  this.getUser();
              }
          }catch(error){
              console.log(error);
          }
      },
      async getUser(){
          try {
              const response = await user();
              console.log(response); // 用户详细信息
              this.setUserInfo(response);
              this.setAvatar(response.avatar);
              this.setUserName(response.name);
              return response;
          }catch(error){
              console.log(error);
          }
      }


    }
})