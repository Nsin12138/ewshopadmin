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
              :cascade="false"
              allow-checking-not-loaded
              @load="onLoad"
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
import { NButton,NInputNumber, useMessage, useLoadingBar} from 'naive-ui'
import { category,getCategorySeq} from '@/api/category'
import AddCategory from "@/views/category/components/AddCategory.vue";

const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)

const columns = [
  {
    title: '分类名称',
    key: 'name',
    width:'60%'
  },
  {
    title: '分类排序',
    key: 'seq',
    render(row) {
      return h(NInputNumber,{
        style:'max-width:20%',
        defaultValue:row.seq,
        showButton:false,
        max:42,
        updateValueOnInput:false,
        blur:handleBlur,
        domProps:{
          value: row.value
        },
        on: {
          input (event){
            row.value = event.target.value;
          }
        },
        onBlur:()=>{
          row.seq = row.value
          console.log(blur)
          // handleChange(row)
          handleBlur(row)
        }
      })
    }
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
          category_id.value = row.id
          showEditModal.value = true
        }
      },'修改')
    }}
]
const onLoad = (row: Record<string, unknown>)=> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      row.children = [{ key: row.key + '-1', example: row.key + '-1' }]
      resolve()
    }, 1000)
  })
}
// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)

const loadingBar = useLoadingBar()
const category_id = ref('')

onMounted(()=>{
  getCategoryList({type:'all'})
})
const updatePage = (pageNum) => {
  getCategoryList({
    current:pageNum,
  })
}

// }
const  getCategoryList = async (params) =>{
  loadingBar.start()
  const res = await category(params)
    console.log(category,'cartegory')
    data.value = res
    console.log(data.value);
}


const handleBlur = (row) => {
  // const seq = row.value
  getCategorySeq(row.id,row.seq).then(()=>{

    //可以在此处设置验证是否进行状态的修改
    console.log(row,'rowseq')
    message.info('排序状态已修改')
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

</script>

<style scoped>
.n-data-table-tr>th:first-child{
  width: 70%;
}
</style>