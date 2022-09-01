<template>
  <div class="content px-4">
    <div class="mt-4 bg-white">
      <div>
        <n-card class="xt"
            style="border: 1px solid #bed0ea"
            title="系统信息"
            :bordered="true"
            :segmented="{
                content: true,
                footer: 'soft'
            }"
            header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"


        >
          <p v-for="item in Systems" :key="item.id">{{item.title}}：<a :href="item.url">{{item.value}}</a></p>
<!--          <p>开发团队：<a href="https://www.lmonkey.com/">学习猿地</a> </p>
          <p>邮箱：<u>ewshop@eduwork.cn</u></p>
          <p>Q Q：<a href="#"> 779050720</a></p>-->
        </n-card>
      </div>
    </div>
  </div>
  <div class="flex">
    <div style="width: 48%" class="mt-4 bg-white ml-5">
      <n-card
          style="border: 1px solid #bed0ea"
          title="商品信息"
          :segmented="{
      content: true,
      footer: 'soft',
    }"
          header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
          content-style="padding:5px 20px"
      >
        <div style="display: flex" class="goods">
          <div style="width: 50%">
            <div  v-for="item in stat">
              <span >{{item.title}}</span>
            </div>
          </div>
          <div style="width: 50%">
            <div style="text-align: right"  v-for="item in goods_info">
              <b style="text-align: right;color:green;">{{item}}</b>件
            </div>
          </div>
        </div>
      </n-card>

    </div>
    <div style="width: 48%" class="mt-4 bg-white ml-5">
      <n-card
          style="border: 1px solid #bed0ea"
          title="访客统计"
          :segmented="{
      content: true,
      footer: 'soft',
    }"
          header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
          content-style="padding:5px 20px"
      >
        <div style="display: flex" class="goods">
          <div style="width: 50%">
            <div  v-for="item in stat1">
              <span >{{item.title}}</span>
            </div>
          </div>
          <div style="width: 50%">
            <div style="text-align: right"  v-for="item in users_info">
              <b style="text-align: right;color:green;">{{item}}</b>件
            </div>
          </div>
        </div>
      </n-card>

    </div>
  </div>
  <div class="content px-4">
    <div class="mt-4 bg-white">
      <div>
        <n-card class="xt"
                style="border: 1px solid #bed0ea"
                title="交易数据"
                :bordered="true"
                :segmented="{
                content: true,
                footer: 'soft'
            }"
                header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"


        >
          <p v-for="item in Systems" :key="item.id">{{item.title}}：<a :href="item.url">{{item.value}}</a></p>
          <!--          <p>开发团队：<a href="https://www.lmonkey.com/">学习猿地</a> </p>
                    <p>邮箱：<u>ewshop@eduwork.cn</u></p>
                    <p>Q Q：<a href="#"> 779050720</a></p>-->
        </n-card>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, ref,toRefs} from "vue";
import {stats} from "@/api/stat";

const goods_info = ref([])
const users_info = ref([])
const order_info = ref([])

const stat = [
  {id:1,title:'上架商品'},
  {id:2,title:'下架商品'},
  {id:3,title:'缺货商品'},
  {id:4,title:'推荐商品数量'}
]
const stat1 = [
  {id:1,title:'今日商品'},
  {id:2,title:'昨日商品'},
  {id:3,title:'累计访客'},
  {id:4,title:'累计注册'}
]

const getNum = (params) =>{
  stats(params).then(res => {
    goods_info.value = res.goods_info
    users_info.value = res.users_info
    order_info.value = res.order_info
  })
}

onMounted(()=>{
  getNum({})
})

const Systems = [
    {id:1,title:'软件版本',value:'EWShop1.0教学版',url:"https://www.eduwork.cn/"},
    {id:2,title:'开发团队',value:'学习猿地',url:"https://www.lmonkey.com/"},
    {id:3,title:'邮箱',value:'ewshop@eduwork.cn',url: '#'},
    {id:4,title:'Q Q',value:'779050720',url:'#'},
  ]







</script>

<style scoped >

.n-card__content{
  padding-top: 5px;
}
.n-card__content>p>a{
  text-decoration: underline;
}
.n-card__content>p>a:hover{
  color: orangered;
}
.n-card__content>p:first-child>a{
  color:green;
  text-decoration: none;
}
.n-card__content>p:first-child:after{
  content: '（证书编号：无）';
  color: orangered;
  text-decoration: none;
}
.goods > div >div:not(:last-child){
  border-bottom: 1px dashed #ccc;
}
.goods > div > div {
  height: 50px;
  line-height: 50px;
}
.n-card > .n-card-header{
  padding: 10px;
}

</style>