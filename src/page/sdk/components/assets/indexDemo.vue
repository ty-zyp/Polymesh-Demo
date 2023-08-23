<style>
button {
	margin: 5px;
}
</style>
<template>
	<div>
		<Button type="primary" @click="get" :disabled="!apiAlice">检索链上所有资产</Button>
		<Button type="primary" @click="getAssetFun" :disabled="!apiAlice">获取资产 getAsset</Button>
		<Button type="primary" @click="getTickerReservationsFun" :disabled="!apiAlice">检索所有股票预留
			getTickerReservations</Button>
		<Button type="primary" @click="isTickerAvailableFun" :disabled="!apiAlice">检查是否有未预定的股票代码
			isTickerAvailable</Button>
		<br />
		股票代码：<Input v-model.trim="stockNo" style="display:inline-block;width:200px;" />
		<br />
		<Button type="primary" @click="btn0" :disabled="!apiAlice">预定的股票代码
			isTickerAvailable</Button>
		<Button type="primary" @click="btn_reserve_determine" :disabled="!(apiAlice && stockNo)">股票代码预定是否成功</Button>
		<br />
		股票代码名字：<Input v-model.trim="stockName" style="display:inline-block;width:200px;" />
		<br>
		<Button type="primary" @click="btn_create" :disabled="!(apiAlice && stockName)">创建股票代码</Button>
		<Button type="primary" @click="btn_queryStock" :disabled="!(apiAlice && stockNo)">查询创建的股票代码</Button>{{asset.ticker}}
		<Button type="primary" @click="toMint" :disabled="!(asset)">铸币</Button>
		<Button type="primary" @click="addCompilance" :disabled="!(asset)">添加合规</Button>
		<Button type="primary" @click="redeem" :disabled="!(asset)">赎回 redeem</Button>

	</div>
</template>    
<script>
import {
	ClaimType,
	ConditionTarget,
	ConditionType,
	ScopeType,
} from '@polymeshassociation/polymesh-sdk/types';
import {
	// Polymesh, 
	BigNumber
} from '@polymeshassociation/polymesh-sdk';
import { accountList } from '../../../../components/const'
window.accountManagement = []

export default {
	data() {
		return {
			accountList,
			stockNo: 'ty001', // 股票代码
			stockName: '', // 股票代码名字
			asset: {}, // 创建的资产
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
		async redeem(){
			const aa = await this.asset.redeem({
				amount:new BigNumber(100)
			});
			console.log('赎回中...',aa);
			const bb = await aa.run();
			console.log('赎回中成功',bb);
		},
		async addCompilance() {
			console.log('添加合规')
			const addRequirements = await this.asset.compliance.requirements.add({
				conditions: [
					{
						type: ConditionType.IsAbsent,
						claim: {
							type: ClaimType.Blocked,
							scope: {
								type: ScopeType.Ticker,
								value: 'TY002',
							},
						},
						target: ConditionTarget.Both,
					},
				],
			});
			console.log('添加合规中。。。',addRequirements)
			const aa = await addRequirements.run();
			console.log('添加合规成功',aa)
		},
		async toMint() {
			console.log('开始铸币：')
			const aa = await this.asset.issuance.issue({
				amount: new BigNumber(6000)
			});
			console.log('铸币。。。', aa);
			const bb = await aa.run();
			console.log('铸币成功：', bb)
		},
		async btn_queryStock() { //查询创建的股票代码
			const asset = await this.apiAlice.assets.getAsset({
				"ticker": this.stockNo.toUpperCase()
			});
			window.asset = asset;
			this.asset = asset;
			console.log("99", asset);
		},
		async btn_create() {
			// 创建股票代码
			// 获取预定的股票代码
			const reservation = await this.apiAlice.assets.getTickerReservation({
				"ticker": this.stockNo.toUpperCase()
			});
			const assetQueue = await reservation.createAsset({
				name: this.stockName,
				assetType: "EquityPreferred",
				isDivisible: false
			});
			console.log("77", assetQueue);
			const asset = await assetQueue.run();
			console.log("88", asset);
		},
		async btn_reserve_determine() {
			console.log("查询股票代码是否预定成功")
			// 确认
			const alice = await this.apiAlice.getSigningIdentity();

			// 获取预定的股票代码
			const reservation = await this.apiAlice.assets.getTickerReservation({
				"ticker": this.stockNo.toUpperCase()
			});
			const { owner } = await reservation.details();
			console.log("66 确认", alice, owner)
			// assert(owner.did === alice.did);
		},
		async btn0() {
			console.log("预定股票代码")
			// 股票代码预定
			const reservationQueue = await this.apiAlice.assets.reserveTicker({
				"ticker": this.stockNo.toUpperCase()
			});
			console.log("44 股票代码预定：", reservationQueue)
			// 运行
			const reservation = await reservationQueue.run();
			console.log("股票代码预定成功：", reservation)
		},
		async isTickerAvailableFun() {
			const aa = await this.apiAlice.assets.isTickerAvailable({
				ticker: 'TY'
			});
			console.log("检查是否有未预定的股票代码:", aa);
		},
		async getTickerReservationsFun() {
			const ty02 = await this.apiAlice.getSigningIdentity();
			const ty02Did = ty02.did;
			console.log("ty02Did", ty02Did)
			const aa = await this.apiAlice.assets.getTickerReservations({ owner: ty02Did });
			console.log("检索所有股票预留:", aa);
		},
		async getAssetFun() {
			const aa = await this.apiAlice.assets.getAsset({ ticker: 'TY' });
			console.log("获取资产 getAsset：", aa);

			const ty02 = await this.apiAlice.getSigningIdentity();
			const ty02Did = ty02.did;
			console.log("ty02Did", ty02Did);
			// 获取名下所有资产
			const bb = await this.apiAlice.assets.getAssets({
				owner: ty02Did
			});
			console.log("获取资产 getAssets：", bb);
		},
		async get() {
			const aa = await this.apiAlice.assets.get();
			console.log("所有资产：", aa);
		},
	},
	mounted(){
		console.log('assets:',Date.now());
	}

}

</script>
