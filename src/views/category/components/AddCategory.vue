<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加分类"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template  #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef"  :model="model" :rules="rules" >
        <n-form-item path="pid" label="父级分类" >
          <n-cascader
              v-model:value="model.name"
              placeholder="没啥用的值"
              :options="options"
              check-strategy="child"
              size="small"
          >
          </n-cascader>
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
import {h, ref, defineProps, defineEmits, onMounted,toRefs, onBeforeUpdate,defineComponent} from 'vue'
import {addCategory} from "@/api/Category";
// import { CascaderOption } from 'naive-ui'
// import {columns} from "../index"

let data111 = []
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  data123:{
    type:Array,
    default: []
  }
})

onBeforeUpdate(()=>{
  const Target =  toRefs(props.data123.Target)
  console.log(Target)
  JSON.parse(JSON.stringify(props.data123)).map(item=>{
    data111.push(item)
  })
  console.log(JSON.parse(JSON.stringify(props.data123)),1111111)
  console.log(typeof (JSON.parse(JSON.stringify(props.data123))))

  console.log(data111)
})
const options = getOptions()
function getOptions (depth = 2, iterator = 1, prefix = '') {
  //  let data1111 = []
  // data111.map(item=>{
  //     data1111.push(item)
  //  })
  // console.log(data111)
  let length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}



const emit = defineEmits(['checkShowModal'])
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


const formRef = ref()
const CategorySubmit = (e)=>{
  console.log(data)
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