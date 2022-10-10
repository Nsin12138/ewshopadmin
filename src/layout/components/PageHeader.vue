<template>
  <div  class="w-full h-14 flex items-center  overflow-hidden justify-end px-8 shadow shadow-md shadow-sky-500"   style="border-bottom: 1px solid #ccc">
    <!-- 头像 -->
    <n-dropdown :options="options" @select="select">
      <n-spin :show="show"  size="small">
      <div  class="flex items-center">
        <n-avatar
            round
            size="small"
            :src="userStore.getAvatar"
        />
        <span class="pl-2">{{userStore.getUserName}}</span>
        <!--                        超级管理员-->
      </div>
      </n-spin>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {renderIcon} from "@/utils";
import {logout} from "@/api/auth";
import {LogOutOutline as LogoutIcon} from "@vicons/ionicons5";
import {useUserStore} from "@/store/user";

const userStore = useUserStore();
userStore.getUserInfo;
// 定义加载
const show =ref(true);
// 页面加载事件
onMounted(()=>{
	if(useUserStore()){
		show.value = false;
	}
});

const options:any = ref([
	{
		label: "退出登录",
		key: "logout",
		icon: renderIcon(LogoutIcon)
	}
]);
// const avatar = "https://oss.shop.eduwork.cn/"+userStore.getAvatar;
const select = (key:string) =>{
	switch (key) {
	case "logout":
		logout().then(()=>{
			localStorage.removeItem("token");
			window.location.reload();
		});
		break;
	default:
		break;
	}
};
</script>

<style scoped>

</style>