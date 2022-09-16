<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">订单管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          订单管理
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
          <n-form-item label="单号" path="order_no">
            <n-input v-model:value="formSearch.order_no" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="支付单号" path="trade_no">
            <n-input v-model:value="formSearch.trade_no" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="订单状态">
            <n-button type="info" size="small" class="mr-4" @click="orderedSubmit">
              已下单
            </n-button>
            <n-button type="info" size="small" class="mr-4" @click="paidSubmit">
              已支付
            </n-button>
            <n-button type="info" size="small" class="mr-4" @click="shippedSubmit">
              已发货
            </n-button>
            <n-button type="info" size="small" class="mr-4" @click="receivedSubmit">
              已收货
            </n-button>
            <n-button type="info" size="small"  @click="staleSubmit">
              已过期
            </n-button>
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
          <span>订单列表</span>

        </div>
        <div>
          <n-data-table
              v-model:columns="columns"
              :data="data"
              :bordered="true"
              :pagination="pagination"
              default-expand-all
          />
          <div class="p-4 flex justify-end pr-10">
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <EditOrder v-if="showEditModal"  :order_id="order_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditOrder>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from 'vue'
import { NButton, useMessage,useLoadingBar } from 'naive-ui'
import EditOrder from './components/EditOrder.vue'
import { orders } from '@/api/order'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '单号',
    key: 'order_no',
    align:'center',
  },
  {
    title: '用户',
    key: 'user.name',
    align:'center',
  },
  {
    title: '金额',
    key: 'amount',
    align:'center',
  },
  {
    title: '状态',
    key: 'status',
    align:'center',
    render(row){
      switch (row.status) {
        case 1:
         return h(NButton, {size: 'small', dashed:true, type:"error", strong:true,},'下单');
        case 2:
          return h(NButton, {size: 'small', dashed:true, type:"primary", strong:true,},'支付');
        case 3:
          return h(NButton, {size: 'small', dashed:true,type:"info", strong:true,},'发货');
        case 4:
          return h(NButton, {size: 'small', dashed:true, type:"success", strong:true,},'收货');
        case 5:
          return h(NButton, {size: 'small', dashed:true, type:"warning", strong:true,},'过期');
      }

    }
  },
  {
    title: '添加时间',
    key: 'created_at',
    align:'center',
  },
  {
    title: '修改时间',
    key: 'updated_at',
    align:'center',
  },
  {
    title: '操作',
    key: 'created_at',
    align:'center',
    render(row){
      if (row.status ==2){
        return h(NButton,{
          size:'small',
          color:'#1890ff',
          strong:true,
          onClick:()=>{
            order_id.value = row.id
            showEditModal.value = true
          }
        },'发货')
      }


    }}
]
const pagination = ref(false as const)
const formSearch = ref({
  order_no:'',
  trade_no:'',
  status: 1|2|3|4|5
})
// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)

const order_id = ref('')

// const checkEditModal = (show:boolean) => {
//   showEditModal.value = show
// }
const loadingBar = useLoadingBar()

const params={
  include:'goods,user,orderDetails' // 订单详情里包含商品信息
}
onMounted(()=>{
  getOrderList(params)
})

// 刷新页面
const updatePage = (pageNum) => {
  getOrderList({
    current:pageNum,
    order_no:formSearch.value.order_no,
    trade_no:formSearch.value.trade_no,
    // status:formSearch.value.status,
    include:params.include
  })
}

const repetition = ()=> {
  getOrderList({
    order_no: formSearch.value.order_no,
    trade_no: formSearch.value.trade_no,
    status: formSearch.value.status,
    current: 1,
    include: params.include
  })
}

// 筛选已下单商品
const orderedSubmit = (e) =>{
  e.preventDefault()
  formSearch.value.status = 1
  repetition()
}
// 筛选已支付商品
const paidSubmit = (e) =>{
  e.preventDefault()
  formSearch.value.status = 2
  repetition()
}
// 筛选已发货商品
const shippedSubmit = (e) =>{
  e.preventDefault()
  formSearch.value.status = 3
  repetition()
}
// 筛选已收货商品
const receivedSubmit = (e) =>{
  e.preventDefault()
  formSearch.value.status = 4
  repetition()
}
// 筛选已过期商品
const staleSubmit = (e) =>{
  e.preventDefault()
  formSearch.value.status = 5
  repetition()
}
// 搜索功能
const searchSubmit = (e) =>{
  e.preventDefault()
  getOrderList({
    order_no: formSearch.value.order_no,
    // trade_no: formSearch.value.trade_no,
    // status: formSearch.value.status,
    current: 1,
    include: params.include
  })
}
const searchReload = ()=>{
  getOrderList(params)
  formSearch.value = {
    order_no:'',
    trade_no:'',
    status: 1|2|3|4|5
  }
}
const getOrderList = (params) =>{
  loadingBar.start()
  orders(params).then(res =>{
    data.value = res.data
    console.log(res.data);
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
const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}
const reload = ()=>{
  getOrderList({
    current:page.value,
    order_no:formSearch.value.order_no,
    trade_no:formSearch.value.trade_no,
    include:params.include
  })
}
</script>

<style scoped>

</style>