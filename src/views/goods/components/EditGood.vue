<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="category_id" label="分类id">
          <n-input v-model:value="model.category_id" placeholder="选择分类" />
        </n-form-item>
        <n-form-item path="title" label="商品名"  >
          <n-input
              v-model:value="model.title"
              type="text"
              placeholder="请输入"
          />
        </n-form-item>
        <n-form-item
            path="description"
            label="描述"
        >
          <n-input
              v-model:value="model.description"
              type="textarea"
              placeholder="请输入"
          />
        </n-form-item>
        <n-form-item path="price" label="价格">
          <n-input type="number" v-model:value="model.price" placeholder="请输入" />
        </n-form-item>
        <n-form-item path="stock" label="库存">
          <n-input v-model:value="model.stock" placeholder="请输入" />
        </n-form-item>
        <n-form-item label="图片上传" path="cover">
          <Upload v-model:value="model.cover" @backKey="backKey"></Upload>
        </n-form-item>
        <n-form path="details" label="详情">
          <Editor v-model:value="model.details" @backContent="backContent"></Editor>
        </n-form>
        <n-row style="margin-top: 10px" :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="userSubmit"
              >
                添加
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref,defineProps,defineEmits,onMounted } from 'vue'
import {addGood,getGoodInfo,changeGood} from "@/api/goods";
import Editor from '@/components/Editor/index.vue'
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  good_id:{
    type: Number,
    default: ''
  }
})
const model = ref({
  data:{
    category_id: null,
    title: null,
    description: null,
    price:null,
    stock:null,
    cover:null,
    details:null
  }
})
const showForm = ref(false)
const emit = defineEmits(['checkShowModal','shuaxin'])
onMounted(()=>{
  console.log(123123)
  if(props.good_id){
    getGoodInfo(props.good_id).then(res=>{
      model.value.category_id = res.category_id
      model.value.title = res.title
      model.value.description = res.description
      model.value.price = res.price
      model.value.stock = res.stock
      model.value.cover = res.cover
      model.value.details = res.details
      showForm.value = true
    })
  }
})

const rules = {
  category_id:[
    {
      required: true,
      message: '请输入'
    }
  ],
  title:[
    {
      required: true,
      message: '请输入'
    }
  ],
  description:[
    {
      required: true,
      message: '请输入'
    }
  ],
  price:[
    {
      required: true,
      message: '请输入'
    }
  ],
  stock:[
    {
      required: true,
      message: '请输入'
    }
  ],
  cover:[
    {
      required: true,
      message: '请输入'
    }
  ],
  details:[
    {
      required: true,
      message: '请输入'
    }
  ],
}
const formRef = ref()
const userSubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      changeGood(props.good_id,model.value).then(res=>{
        window.$message.success('修改成功')
        emit('checkShowModal',false)
        emit('reloadTable')
      })
    }
  })
}
const backContent = (htmlstring) =>{

  model.value.details = htmlstring
}
const backKey = (key)=>{
  model.value.cover = key
}
</script>

<style scoped>

</style>