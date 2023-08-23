<template>
  <div id="app">
    <Tabs v-model="path"
          @on-click="changeMenu">
      <TabPane v-for="item in menuArr"
               :key="item.url"
               :label="item.name"
               :name="item.url"></TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import { menuArr } from './components/const'
import { Polymesh } from "@polymeshassociation/polymesh-sdk";
import { BrowserExtensionSigningManager } from "@polymeshassociation/browser-extension-signing-manager";
export default {
  name: 'App',
  data () {
    return {
      menuArr,
      path: '/sdk',
      accountKey: '',
      assistAcountKey: '',
      api: null,
    }
  },
  provide () {
    return {
      apiFun: () => this.api,
    };
  },
  methods: {
    changeMenu () {
      this.$router.push({
        path: this.path
      })
    },
    async run () {
      console.log(1);
      const signingManager = await BrowserExtensionSigningManager.create({
        appName: "Demo",
        extensionName: "polywallet",
      }); // The Polymesh wallet extension will ask the user to authorize MY_APP_NAME for access
      console.log(2);
      const polyClient = await Polymesh.connect({
        nodeUrl: "wss://testnet-rpc.polymesh.live",
        signingManager,
        middleware: {
          link: "https://testnet-graphql.polymesh.live",
          key: "deprecated",
        },
      });
      console.log("链接：", polyClient);
      this.api = polyClient;
      window.fn = async (fun, str) => {
        window[str] = await fun;
      };
      window.api = this.api;
    },
  },
  mounted () {
    this.run();
    const arr = location.hash.split('/');
    console.log(arr)
    this.path = '/' + arr[1];
    this.path = this.path === '/' ? '/sdk' : this.path;
    // this.path = location.hash.slice(1);
    this.changeMenu()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
