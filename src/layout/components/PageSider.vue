<template>
<div class="pt-4">
  <div class="m-0">
    <img style="margin:auto" src="@/assets/images/logo.png" alt="logo">
  </div>
  <n-menu :options="menuOptions"  :value="defaultKey" inverted @update:value="handleUpdateValue" />
</div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
const defaultKey = ref('')
import { useRoute, useRouter } from 'vue-router';
import {routeModuleList}  from '@/router'

// const defaultkey = ref<string>

onMounted(()=>{
  const route = useRoute();
  // 获取当前路由的key
  const routeKey = route.name;
  defaultKey.value = routeKey;
})
const router = useRouter()
import {generatorMenu, renderIcon} from '@/utils'
const menuOptions = generatorMenu(routeModuleList)
const handleUpdateValue=(key,item) =>{
  console.log(key,item)
  defaultKey.value = key
  router.push({name:key})
}

</script>

<style scoped>

</style>