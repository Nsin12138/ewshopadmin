<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">评论管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          评论管理
        </div>
      </div>
    </div>
    <div class="content px-4">
      <div class="bg-white pt-4 pr-6">
        <n-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formSearch"
            label-placement="left"
        >
          <n-form-item label="商品名" path="goods_title">
            <n-input v-model:value="formSearch.name" placeholder="请输入商品名" />
          </n-form-item>
          <n-space vertical>
            <n-radio-group v-model:value="value" name="radiobuttongroup1">
              <n-radio-button
                  v-for="song in songs"
                  :key="song.value"
                  :value="song.value"
                  :disabled="
          (song.label === 'Live Forever' && disabled1) ||
            (song.label === 'Shakermaker' && disabled2)
        "
                  :label="song.label"
              />
            </n-radio-group>
          </n-space>

          <n-form-item class="ml-auto">
            <n-button class="mr-4" attr-type="button" @click="searchReload">
              重置
            </n-button>
            <n-button type="info" attr-type="button" @click="searchSubmit">
              搜索
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="mt-4 bg-white">
        <div class="text-xl px-6 py-4 flex ">
          <span>用户列表</span>
          <span class="ml-auto"><NButton type="info" @click="showModal = true" >+ 新建</NButton></span>
        </div>
        <div>

          <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
          />
          <div class="p-4 flex justify-end pr-10">
            <!--            分页组件  绑定数据                 	当前页发生改变时的回调函数-->
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <AddComment :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddComment>
      <EditComment v-if="showEditModal"  :user_id="user_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditComment>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted} from 'vue'
import { NButton, useMessage,NAvatar,NSwitch,useLoadingBar } from 'naive-ui'
import AddComment from './components/AddComment.vue'
import EditComment from './components/EditComment.vue'
import { comments } from '@/api/comment'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '内容',
    key: 'content',

  },
  {
    title: '评级',
    key: 'rate'
  },
  {
    title: '星级',
    key: 'star'
  },
  {
    title: '回复',
    key: 'reply'
  },
  {
    title: '评价时间',
    key: 'created_at'
  },
  {
    title: '操作',
    key: 'created_at',
    render(row){
      return h(NButton,{
        size:'small',
        color:'#1890ff',
        strong:true,
        onClick:()=>{
          user_id.value = row.id
          showEditModal.value = true
        }
      },'编辑')
    }}
]
const pagination = ref(false as const)
const formSearch = ref({
  name:'',
  email:''
})
// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)

const user_id = ref('')

const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}
const loadingBar = useLoadingBar()

onMounted(()=>{
  getUserList({})
})
const updatePage = (pageNum) => {
  getUserList({
    current:pageNum,
    name:formSearch.value.name,
    email:formSearch.value.email
  })
}
const searchSubmit = (e) =>{
  e.preventDefault()
  getUserList({
    name:formSearch.value.name,
    email:formSearch.value.email,
    current:1
  })
}
const searchReload = ()=>{
  getUserList({})
  formSearch.value = {
    // 重置后，进行搜索框清空
    name:'',
    email:''
  }
}
const getUserList = (params) =>{
  loadingBar.start()
  comments(params).then(res =>{
    data.value = res.data
    totalPages.value = res.meta.pagination.total_pages
    page.value = res.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}
const checkShowModal = (status)=>{
  showModal.value = status
}
const reload = ()=>{
  getUserList({
    current:page.value,
    name:formSearch.value.name,
    email:formSearch.value.email
  })
}
</script>

<style scoped>

</style>