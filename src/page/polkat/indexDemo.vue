<template>
  <div id="app">
    <Tabs v-model="path" @on-click="changeMenu">
      <TabPane v-for="item in menuPolkatList" :key="item.url" :label="item.name" :name="item.url"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import { menuPolkatList } from '../../components/const'

export default {
  name: 'App',
  data() {
    return {
      menuPolkatList,
      path: '',
      accountKey:'',
      assistAcountKey:'',
    }
  },
  methods: {
    changeMenu() {
      this.$router.push({
        path: this.path,
        params:{
          accountKey:this.accountKey,
          assistAcountKey:this.assistAcountKey,
        }
      })
    }
  },
  mounted() {
    const arr = location.hash.split('/');
    console.log(arr);
    if(arr.length<3){
      this.path = '/polkat/init';
    }else{
      this.path = '/'+arr[2];
    }
    this.changeMenu()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
