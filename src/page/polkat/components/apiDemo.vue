<template>
  <div>
    <Button type="primary" @click="get1" :disabled="!api">btn1</Button>
    <Identicon
      :size="128"
      :theme="'polkadot'"
      :value="'5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'"
    />
  </div>
</template>
<script>
  import Identicon from '@polkadot/vue-identicon';
  export default{
    components:{Identicon},
    data(){
      return{
        api:''
      }
    },
    methods:{
      async get1(){
        const aa = await this.api.call.accountNonceApi.accountNonce('5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS');
        console.log(aa)
        const bb = await this.api.call.auraApi.authorities();
        console.log(bb)
      }
    },
    mounted() {
      console.log("mounted", window.api)
      this.api = window.api;
    }
  }
</script>