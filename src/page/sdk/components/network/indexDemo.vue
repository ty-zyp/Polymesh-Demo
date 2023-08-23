<style>
button {
  margin: 5px;
}
</style>
<template>
  <div>
    <Button type="primary" :disabled="!apiAlice" @click="getLatestBlockFun">获取最新块 getLatestBlock</Button>
    <Button type="primary" :disabled="!apiAlice" @click="getNetworkPropertiesFun">获取网络属性 getNetworkProperties</Button>
    <Button type="primary" :disabled="!apiAlice" @click="getProtocolFeesFun">获取协议费用 getProtocolFees</Button>
    <Button type="primary" :disabled="!apiAlice" @click="getSs58FormatFun">获取Ss58格式 getSs58Format</Button>

    <Button type="primary" :disabled="!apiAlice" @click="getTreasuryAccountFun">获取国债账户 getTreasuryAccount</Button>
    <Button type="primary" :disabled="!apiAlice" @click="getTreasuryBalanceFun">获取国债余额 getTreasuryBalance</Button>
    <Button type="primary" :disabled="!apiAlice" @click="getVersionFun">获取版本 getVersion</Button>
    <Button type="primary" :disabled="!apiAlice" @click="transferPolyxFun">传输PolyX transferPolyx</Button>
  </div>
</template>
<script>
import {
  BigNumber
} from '@polymeshassociation/polymesh-sdk';

import {
  // VenueType,
} from '@polymeshassociation/polymesh-sdk/types';
export default {
  inject: ['accountKeyFn','apiAliceFn','apiAlickDidFn','assitAccountKeyFn','assitAccountFn','assitAccountDidFn'],
	computed:{
		accountKey(){
			return this.accountKeyFn();
		},
		apiAlice(){
			return this.apiAliceFn();
		},
		apiAlickDid(){
			return this.apiAlickDidFn();
		},
		assitAccountKey(){
			return this.assitAccountKeyFn();
		},
		assitAccount(){
			return this.assitAccountFn();
		},
		assitAccountDid(){
			return this.assitAccountDidFn();
		},
	},
  methods: {
    async getTreasuryAccountFun() {
      console.log('获取国债账户')
      const aa = await this.apiAlice.network.getTreasuryAccount();
      console.log('获取国债账户：', aa)
    },
    async getTreasuryBalanceFun() {
      console.log('获取国债余额')
      const aa = await this.apiAlice.network.getTreasuryBalance();
      console.log('获取国债余额：', aa,aa.toString())
    },
    async getVersionFun() {
      console.log('获取版本')
      const aa = await this.apiAlice.network.getVersion();
      console.log('获取版本：', aa)
    },
    async transferPolyxFun() {
      console.log('传输PolyX')
      const aa = await this.apiAlice.network.transferPolyx({
        amount: new BigNumber(78),
        memo: '2222',
        to: '5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi', // tianying
      });
      console.log('传输PolyX。。。', aa)
      const bb = await aa.run();
      console.log('传输PolyX成功', bb)
    },
    async getSs58FormatFun() {
      console.log('获取Ss58格式')
      const aa = await this.apiAlice.network.getSs58Format();
      console.log('获取Ss58格式：', aa)
    },
    async getProtocolFeesFun() {
      console.log('获取协议费用')
      const aa = await this.apiAlice.network.getProtocolFees({
        tags: [5502821]
      });
      console.log('获取协议费用：', aa)
    },
    async getNetworkPropertiesFun() {
      console.log('获取网络属性')
      const aa = await this.apiAlice.network.getNetworkProperties();
      console.log('获取网络属性：', aa)
    },
    async getLatestBlockFun() {
      console.log('获取最新块')
      const aa = await this.apiAlice.network.getLatestBlock();
      console.log('获取最新块：', aa)
    },
  },
}

</script>