<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="评论回复"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form v-if="showForm"  ref="formRef"  >
        <n-form-item style="justify-content: center">
          <div style="font-size: 24px">你确定要删除这条评论吗</div>
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-around ; margin-top: 20px">
              <n-button
                  round
                  style="float: left"
                  type="primary"
                  @click="commentSubmit"
              >
                确定
              </n-button>
              <n-button type="error" round  @click="$emit('checkShowModal',false)">取消</n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
      <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script setup>
import {h, ref, defineProps,defineEmits, onMounted} from 'vue'
import { delComment} from "@/api/comment";
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  comment_id:{
    type: Number,
    default: ''
  }
})

const showForm = ref(false)
const emit = defineEmits(['checkShowModal'])
onMounted(()=>{
  if(props.comment_id)
  showForm.value = true
})
const formRef = ref()
const commentSubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      delComment(props.comment_id).then(res=>{
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