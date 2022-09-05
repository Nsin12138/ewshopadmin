<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加用户"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template  #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="pid" label="父级分类">
          <n-input v-model:value="model.pid" placeholder="选择分类，不选则创建顶级分类" />
        </n-form-item>
        <n-form-item path="pid" label="上级分类">
          <n-dropdown
              v-model:options="data.value"
              placement="bottom-start"
              trigger="click"
              @select="handleSelect"
          >
            <n-button>--根分类--</n-button>
          </n-dropdown>
        </n-form-item>
        <n-form-item path="name" label="分类名称"  >
          <n-input
              v-model:value="model.name"
              type="name"
              placeholder="请输入"
          />
        </n-form-item>

        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="CategorySubmit"
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
import {addCategory} from "@/api/Category";
// import {columns} from "../index"
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  data:{
    type:Object,
    default: {}
  }

})

const emit = defineEmits(['checkShowModal','shuaxin'])
const model = ref({
  name: null,
  pid: null,
  group:null
})
const rules = {
  pid: [
    {
      required: false,
      message: '请输入父类名称'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
}
console.log(model.value);
const formRef = ref()
const CategorySubmit = (e)=>{
  // e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      addCategory(model.value).then(res=>{
        emit('checkShowModal',false)
        emit('reloadTable')
      })
    }
  })
}


</script>

<style scoped>

</style>