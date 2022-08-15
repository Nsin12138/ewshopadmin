<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" style="margin: auto" src="@/assets/images/logo.png" alt="" />
        </div>
      </div>
      <div class="view-account-form">
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter} from "vue-router";
import { PersonOutline, LockClosedOutline} from '@vicons/ionicons5';
// import request from '@/utils/request';
import { useUserStore } from "@/store/user";

interface FormState {
  email: string;
  password: string;
}

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false)
const formInline = reactive({
  username:'Nsin@163.com',
  password:'123123'
});

const formRef = ref();

// 验证规则
const rules = {
  // 失去焦点时触发
  username:{ required: true, message: '请输入用户名', trigger: 'blur' },
  password:{ required: true, message: '请输入密码', trigger: 'blur' },
};
const handleSubmit = (e:Event) => {
  //e.preventDefault();
  // 表单验证
  formRef.value.validate(async(errors:any)=>{
    if(errors){
      return; // 有错误就返回，不执行，不再往下发送请求
    }
    // 接收数据
    const { username, password } = formInline;
    // 显示登录中
    loading.value = true;
    // 调整数据结构
    const data:FormState = {
      email:username,
      password
    }
    console.log(data)
    // 执行登录操作
    userStore.login(data).then(res=>{      // res是userStore里面返回的数据
      // 关闭窗口
      loading.value = false;
      // 弹出提示  登陆成功
      // 跳转回首页
      router.push({name:'dashboard'});
    }).catch(err=>{
      loading.value = false;
      alert('登陆失败');
    })
      // 成功跳转到首页
      // 失败后提示
  })
};

</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
