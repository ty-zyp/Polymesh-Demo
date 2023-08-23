<template>
  <div>
    主账户：<Cascader :data="accountList" v-model="accountKeyArr" style="display:inline-block;width:200px;" change-on-select/>
    <slot name="accountKey"></slot>
    &nbsp;辅助账户或其它主账户：<Cascader :data="accountList" v-model="assitAccountKeyArr" style="display:inline-block;width:200px;" change-on-select/>
    <slot name="assitAccountKey"></slot>
  </div>
</template>
<script>
import { accountList} from './const'
import { mixin } from './mixin';
export default{
  data(){
    return {
      accountList,
      accountKeyArr:[],
      assitAccountKeyArr:[]
    }
  },
  watch:{
    accountKeyArr(val){
      console.log(val)
      this.$emit('account-key',val[val.length-1]);
      window.accountKey = val[val.length-1];
    },
    assitAccountKeyArr(val){
      this.$emit('assist-acount-key',val[val.length-1]);
      window.assitAccountKey = val[val.length-1];
    },
  },
  mixins: [mixin],
  mounted(){
    this.accountKeyArr = new Array(window.accountKey)
		this.assitAccountKeyArr = new Array(window.assitAccountKey)
    console.log(this.accountKeyArr,this.assitAccountKeyArr)
  }
}
</script>