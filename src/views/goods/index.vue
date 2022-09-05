<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">商品管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          商品管理
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
          <n-form-item label="商品名：" path="name">
            <n-input v-model:value="formSearch.title" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="是否上架">

          </n-form-item>

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
          <span>商品列表</span>
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
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <AddGood :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddGood>
      <EditGood v-if="showEditModal"  :Good_id="Good_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditGood>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from 'vue'
import { NButton, useMessage,NImage,NSwitch,useLoadingBar } from 'naive-ui'
import AddGood from './components/AddGood.vue'
import EditGood from './components/EditGood.vue'
import { goods,getGoodLock,recommendGood } from '@/api/goods'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '图片',
    key: 'cover',
    align:'center',
    render (row) {
      return h(NImage,{round:true,src:row.cover_url,width:'60'})
    }
  },
  {
    title: '商品名',
    key: 'title',
    align:'center',
  },
  {
    title: '价格',
    key: 'price',
    align:'center',
  },
  {
    title: '库存',
    key: 'stock',
    align:'center',
  },
  {
    title: '销量',
    key: 'sales',
    align:'center',
  },
  {
    title: '是否上架',
    key: 'is_on',
    align:'center',
    render(row){
      return h(NSwitch,{
        size:'medium',
        color:'#1890ff',
        activeColor:'#52c41a',
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.is_on == 1 ? false : true,
        onClick:()=>{
          // console.log(row.is_locked,'row.isload')
          row.is_on==0 ? row.is_on=1 : row.is_on=0
          // console.log(row.is_locked,'row.isload')
          handleChangeOn(row)
        }
      })
    }
  },
  {
    title: '是否推荐',
    key: 'is_recommend',
    align:'center',
    render(row){
      return h(NSwitch,{
        size:'medium',
        color:'#1890ff',
        activeColor:'#52c41a',
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.is_recommend == 1 ? false : true,
        onClick:()=>{
          // console.log(row.is_locked,'row.isload')
          row.is_recommend==0?row.is_recommend=1:row.is_recommend=0
          // console.log(row.is_locked,'row.isload')
          handleChange(row)
        }
      })
    }
  },
  {
    title: '创建时间',
    key: 'created_at',
    align:'center',
  },
  {
    title: '操作',
    key: 'created_at',
    align:'center',
    render(row){
      return h(NButton,{
        size:'small',
        color:'#1890ff',
        strong:true,
        onClick:()=>{
          Good_id.value = row.id
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

const Good_id = ref('')

const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}
const loadingBar = useLoadingBar()

onMounted(()=>{
  getGoodList({})
})
const updatePage = (pageNum) => {
  getGoodList({
    current:pageNum,
    name:formSearch.value.name,
    email:formSearch.value.email
  })
}
const searchSubmit = (e) =>{
  e.preventDefault()
  getGoodList({
    name:formSearch.value.name,
    email:formSearch.value.email,
    current:1
  })
}
const searchReload = ()=>{
  getGoodList({})
  formSearch.value = {
    name:'',
    email:''
  }
}
const getGoodList = (params) =>{
  loadingBar.start()
  goods(params).then(goods =>{
    data.value = goods.data
    totalPages.value = goods.meta.pagination.total_pages
    page.value = goods.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}

// 上架和下架状态更改方法
const handleChangeOn = (row) => {
  getGoodLock(row.id).then(()=>{
    //可以在此处设置验证是否进行状态的修改
    message.info('上架状态已修改')
  })
}
// 推荐和不推荐状态更改方法
const handleChange = (row) => {
  recommendGood(row.id).then(()=>{
    message.info('推荐状态已修改')
  })
}


const checkShowModal = (status)=>{
  showModal.value = status
}
const reload = ()=>{
  getGoodList({
    current:page.value,
    name:formSearch.value.name,
    email:formSearch.value.email
  })
}
</script>

<style scoped>

</style>