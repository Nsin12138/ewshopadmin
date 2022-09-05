<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑用户"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form v-if="showForm"  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="pid" label="父类姓名">
          <n-input v-model:value="model.pid" placeholder="" />
        </n-form-item>
        <n-form-item path="name" label="邮箱"  >
          <n-input v-model:value="model.name" placeholder="请输入姓名" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="categorySubmit"
              >
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
      <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref,defineProps,defineEmits,onMounted } from 'vue'
import {addCategory,getCategoryInfo,updateCategory} from "@/api/users";
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  category_id:{
    type: Number,
    default: ''
  }
})
const model = ref({
  pid: null,
  name: null,
})
const showForm = ref(false)
const emit = defineEmits(['checkShowModal','shuaxin'])
onMounted(()=>{
  console.log(123123)
  if(props.category_id){
    getCategoryInfo(props.category_id).then(res=>{
      model.value.pid = res.pid
      model.value.name = res.name
      showForm.value = true
    })
  }
})

const rules = {
  pid: [
    {
      required: true,
      message: '选择分类，不选则创建新的分类'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ]
}
const formRef = ref()
const categorySubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      updateCategory(props.category_id,model.value).then(res=>{
        window.$message.success('修改成功')
        emit('checkShowModal',false)
        emit('reloadTable')
      })
    }
  })
}

</script>

<style scoped>

</style>