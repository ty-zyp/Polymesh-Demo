<style>
button {
	margin: 5px;
}
</style>
<template>
	<div>
		<Button type="primary" @click="connect(accountKey)" :disabled="!accountKey">初始化链接</Button>
		<Button type="primary" @click="createPortfolioFun" :disabled="!apiAlice">创建投资组合 createPortfolio</Button>
		<Button type="primary" @click="createPortfoliosFun" :disabled="!apiAlice">创建多个投资组合 createPortfolios</Button>
		<Button type="primary" @click="getIdentityFun" :disabled="!apiAlice">获取身份 getIdentity</Button>
		<Button type="primary" @click="isIdentityValidFun" :disabled="!apiAlice">身份验证 isIdentityValid</Button>
	</div>
</template>    
<script>
import { accountList } from '../../../../components/const'
window.accountManagement = []

export default {
	data() {
		return {
			accountList,
		}
	},
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
		async isIdentityValidFun(){
			const aa = await this.apiAlice.identities.isIdentityValid({
				identity:this.apiAlickDid
			});
			console.log("身份验证",aa);
		},
		async getIdentityFun(){
			const aa = await this.apiAlice.identities.getIdentity({
				did:this.apiAlickDid
			});
			console.log("获取身份",aa,);
			const bb = await aa.portfolios.getPortfolio();
			console.log("getPortfolio",bb)

		},
		async createPortfolioFun(){
			const aa = await this.apiAlice.identities.createPortfolio({
				name:'tianying_bbb'
			});
			console.log("创建投资组合。。。",aa);
			const bb = await aa.run();
			console.log("创建投资组合成功",bb);
		},
		async createPortfoliosFun(){
			const aa = await this.apiAlice.identities.createPortfolios({
				names:['tianying_ccc','tianying_ddd']
			});
			console.log("创建多个投资组合。。。",aa);
			const bb = await aa.run();
			console.log("创建多个投资组合成功",bb);
		},
	},
}

</script>