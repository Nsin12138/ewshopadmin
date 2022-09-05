<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="category_id" label="分类名">
          <n-input v-model:value="model.name" placeholder="选择分类" />
        </n-form-item>
        <n-form-item path="title" label="商品名"  >
          <n-input
              v-model:value="model.email"
              type="text"
              placeholder="请输入"
          />
        </n-form-item>
        <n-form-item
            path="description"
            label="描述"
        >
          <n-input
              type="textarea"
              placeholder="请输入"
          />
        </n-form-item>
        <n-form-item path="price" label="价格">
          <n-input type="number" v-model:value="model.name" placeholder="请输入" />
        </n-form-item>
        <n-form-item path="stock" label="库存">
          <n-input v-model:value="model.name" placeholder="请输入" />
        </n-form-item>
        <n-form-item label="图片上传" path="img">
          <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <n-form-item path="details" label="详情">
          <n-input v-model:value="model.name" placeholder="请输入" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
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
import { h, ref,defineProps,defineEmits } from 'vue'
import {addGood} from "@/api/goods";
import Upload from '@/components/Upload/index.vue';

const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['checkShowModal','shuaxin'])

const model = ref({
  category_id: null,
  title: null,
  description: null,
  price:null,
  stock:null,
  cover:null,
  details:null
})
const rules = {
  category_id: [
    {
      required: true,
      message: '请输入'
    }
  ],
  title: [
    {
      required: true,
      message: '请输入'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入'
    }
  ],
  price: [
    {
      required: true,
      message: '请输入'
    }
  ],
  stock: [
    {
      required: true,
      message: '请输入'
    }
  ],
  cover: [
    {
      required: true,
      message: '请输入'
    }
  ],
  details: [
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
      addGood(model.value).then(res=>{
        emit('checkShowModal',false)
        emit('reloadTable')
      })
    }
  })
}
const backKey = (key)=>{
  model.value.img = key
}
</script>

<style scoped>

</style>