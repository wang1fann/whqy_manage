<template>
  <ul>
    <!--<li class="l dian">景区简介</li>-->
    <!--<li class="l">-->
       <router-link :to="a.url" v-for=" a in subs">{{a.title}}</router-link>
    <!--</li>-->
    <!--<li class="l">组织机构</li>-->
  </ul>
</template>

<script>
    export default {
        name: "rightTab",
        props:[
           "subs"
        ],
        data(){
            return {

            }
        }

    }
</script>

<style scoped>
.l{float: left}
ul{list-style: none}
  ul li{
    padding: 5px 12px;
    background:#f1f3f4;
    margin-right: 10px;
    border-radius: 14px;
    color:#b2b7bc ;
  }
  ul li.dian{
    background: #e24142;
    color: #fff;
  }

</style>
