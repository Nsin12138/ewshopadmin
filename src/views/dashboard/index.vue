<template>
  <div class="zero flex justify-between">
    <div class="one bg-white">
        <div class="font-s">
          用户数
        </div>
        <div style="color: rgb(63, 134, 0);font-size: 24px">
          {{users_count}}
        </div>
    </div>
    <div class="two bg-white">
      <div class="font-s">
        商品数
      </div>
      <div style="color: rgb(207, 19, 34);font-size: 24px"  >
        {{goods_count}}
      </div>

    </div>
    <div  class="three bg-white">
      <div class="font-s">
        订单数
      </div>
      <div style="color: rgb(0, 59, 128);font-size: 24px">
        {{order_count}}
      </div>
    </div>
  </div>


</template>

<script lang="ts" setup>
import {reactive, onMounted, toRefs} from "vue";
import {stats} from "@/api/stat";

const stat = reactive({
  users_count:'',
  goods_count:'',
  order_count:'',
})
const {users_count,goods_count,order_count} = toRefs(stat)
const getNum = (params) =>{
  stats(params).then(stats => {
    users_count.value = stats.users_count
    goods_count.value = stats.goods_count
    order_count.value = stats.order_count
  })
}
onMounted(()=>{
  getNum({})
})






</script>

<style scoped >
.zero{
  margin: 24px;
}
.font-s{
  margin-bottom: 4px;
  color: rgba(0,0,0,.45);
  font-size: 14px;
}
.one,.two,.three {
  display: block;
  height: 100px;
  flex: 0 0 33.33333333%;
  max-width: 33.33333333%;
  margin-left: 8px;
  margin-right: 8px;
  padding: 24px;
}

</style>