<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">分类管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          分类管理
        </div>
      </div>
    </div>
    <div class="content px-4">
      <span class="ml-auto"><NButton type="info" @click="showModal = true" >添加分类</NButton></span>
      <div class="mt-4 bg-white">
        <div>
          <n-data-table
              :columns="columns"
              :data="data"

              :bordered="false"
          />
          <div class="p-4 flex justify-end pr-10">
            <!--            分页组件  绑定数据                 	当前页发生改变时的回调函数-->
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <AddCategory :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddCategory>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted} from 'vue'
import { NButton, useMessage, useLoadingBar } from 'naive-ui'
import { category } from '@/api/category'
import AddCategory from "@/views/category/components/AddCategory.vue";
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
      {
        type: 'selection'
      },
      {
        title: '分类名称',
        key: 'name'
      },
      {
        title: '状态',
        key: 'status'
      }
]
const rowKey = ref(false as const)

// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)



const loadingBar = useLoadingBar()

onMounted(()=>{
  getCategoryList({type:'all'})
})
const updatePage = (pageNum) => {
  getCategoryList({
    current:pageNum,
    // name:formSearch.value.name,
    // email:formSearch.value.email
  })
}
// const searchSubmit = (e) =>{
//   e.preventDefault()
//   getUserList({
//     name:formSearch.value.name,
//     email:formSearch.value.email,
//     current:1
//   })
// }
// const searchReload = ()=>{
//   getUserList({})
//   formSearch.value = {
//     // 重置后，进行搜索框清空
//     name:'',
//     email:''
//   }
// }
const getCategoryList = (params) =>{
  loadingBar.start()
  category(params).then(category =>{
    console.log(category,'cartegory')
    data.value=category
    console.log(data.value);
    // data.map(item=>{
    //   console.log(item)
    // })
    // totalPages.value = goods.meta.pagination.total_pages
    // page.value = goods.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}
const checkShowModal = (status)=>{
  showModal.value = status
}
const reload = ()=>{
  getCategoryList({
    current:page.value,
    // name:formSearch.value.name,
    // email:formSearch.value.email
  })
}
// const checkShowModal = (status)=>{
//   showModal.value = status
// }
// const reload = ()=>{
//   getUserList({
//     current:page.value,
//     name:formSearch.value.name,
//     email:formSearch.value.email
//   })
// }
</script>

<style scoped>

</style>