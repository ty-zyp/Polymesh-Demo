<style>
button {
	margin: 5px;
}
</style>
<template>
	<div>
		<Button type="primary" @click="connect(accountKey)" :disabled="!accountKey">初始化链接</Button>
		<Button type="primary" @click="addClaimsFun" :disabled="!apiAlice">添加声明 addClaims</Button>
		<Button type="primary" @click="getIdentitiesWithClaimsFun" :disabled="!apiAlice">获取身份与声明
			getIdentitiesWithClaims</Button>
		<Button type="primary" @click="getTargetingClaimsFun" :disabled="!apiAlice">获取目标声明
			getTargetingClaims</Button>
		<Button type="primary" @click="getTargetingClaimsV2Fun" :disabled="!apiAlice">获取目标声明V2
			getTargetingClaimsV2</Button>
		<Button type="primary" @click="addInvestorUniquenessClaimFun" :disabled="!apiAlice">add投资者独特性声明
			addInvestorUniquenessClaim</Button>
		<Button type="primary" @click="editClaimsFun" :disabled="!apiAlice">编辑声明
			editClaims</Button>
		<Button type="primary" @click="getCddClaimsFun" :disabled="!apiAlice">获取CDD声明
			getCddClaims</Button>
		<Button type="primary" @click="getClaimScopesFun" :disabled="!apiAlice">获取范围内的声明
			getClaimScopes</Button>
		<Button type="primary" @click="getInvestorUniquenessClaimsFun" :disabled="!apiAlice">获取投资者独家声明
			getInvestorUniquenessClaims</Button>
		<Button type="primary" @click="revokeClaimsFun" :disabled="!apiAlice">撤销声明
			revokeClaims</Button>




	</div>
</template>    
<script>
import {
	// ClaimData,
	ClaimType,
	ScopeType
} from '@polymeshassociation/polymesh-sdk/types';
import {
	accountList,
	// saveAccount,
	// getAccount 
} from '../../../../components/const';
console.log('页面加载 accountList 。。。', window.accountList, ClaimType)
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
		async revokeClaimsFun() { // 撤销声明
			const aa = await this.apiAlice.claims.revokeClaims({
				claims: [
					{
						target: this.apiAlickDid,
						claim: {
							type: ClaimType.Accredited,
							scope: {
								type: ScopeType.Ticker,
								value: 'TY',
							},
						},
					},
				],
			});
			console.log("撤销声明。。。", aa);
			const bb = await aa.run();
			console.log("撤销声明成功", bb);
		},
		async getInvestorUniquenessClaimsFun() { // 获取投资者独家声明
			const aa = await this.apiAlice.claims.getInvestorUniquenessClaims();
			console.log("获取投资者独家声明：", aa);
		},
		async getClaimScopesFun() { // 获取范围内的声明
			const aa = await this.apiAlice.claims.getClaimScopes();
			console.log("获取范围内的声明：", aa);
		},
		async getCddClaimsFun() { // 获取CDD声明
			const aa = await this.apiAlice.claims.getCddClaims();
			console.log("获取CDD声明：", aa);
		},
		async editClaimsFun() { // 编辑声明
			const aa = await this.apiAlice.claims.editClaims({
				claims: [
					{
						target: this.apiAlickDid,
						claim: {
							type: ClaimType.Affiliate,
							// type: ClaimType.Accredited,
							scope: {
								type: ScopeType.Ticker,
								value: 'TY',
							},
						},
					},
				],
			});
			console.log("编辑声明。。。", aa);
			const bb = await aa.run();
			console.log("编辑声明成功", bb);
		},
		async addInvestorUniquenessClaimFun() { // add投资者独特性声明
			// TODO 入参问题
			const aa = await this.apiAlice.claims.addInvestorUniquenessClaim({
				cddid: '0x18c40879ed56a4b08363b2e5cc8a99ebed119f254fd0c9296e8e928759f8e263',
				scope: {
					type: ScopeType.Ticker,
					value: 'TYZYP',
				},
			});
			console.log("add投资者独特性声明:", aa);
		},
		async getTargetingClaimsV2Fun() { // 获取目标声明V2
			const aa = await this.apiAlice.claims.getTargetingClaimsV2({
				scope: {
					type: ScopeType.Ticker,
					value: 'TY',
				},
				target: this.apiAlickDid
			});
			console.log("获取目标声明V2：", aa);
		},
		async getTargetingClaimsFun() { // 获取目标声明
			const aa = await this.apiAlice.claims.getTargetingClaims({
				scope: {
					type: ScopeType.Ticker,
					value: 'TY',
				},
				target: this.apiAlickDid
			});
			console.log("获取目标声明:", aa);
		},
		async getIdentitiesWithClaimsFun() { // 获取身份与声明  TODO 缺少中间键
			const aa = await this.apiAlice.claims.getIdentitiesWithClaims({
				scope: {
					type: ScopeType.Ticker,
					value: 'TY',
				},
			});
			console.log("获取身份与声明：", aa);
		},
		async addClaimsFun() {
			const aa = await this.apiAlice.claims.addClaims({
				claims: [
					{
						target: this.apiAlickDid,
						claim: {
							type: ClaimType.Accredited,
							scope: {
								type: ScopeType.Ticker,
								value: 'TY',
							},
						},
					},
				],
			});
			console.log("添加声明...", aa);
			const bb = await aa.run();
			console.log("添加声明", bb);
		},
	},
}

</script>