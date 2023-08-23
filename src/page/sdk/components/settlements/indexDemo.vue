<style>
button {
	margin: 5px;
}
</style>
<template>
	<div>
		指令id：<Input v-model.trim="instructionId" style="display:inline-block;width:150px;" />
		<br>
		场地id：<Input v-model.trim="venueId" style="display:inline-block;width:150px;" />
		<br>
		金额：<Input v-model.trim="mount" style="display:inline-block;width:150px;" />
		<br>
		<Button type="primary" @click="addInstructionFun" :disabled="!apiAlice">添加指令 addInstruction</Button>
		<Button type="primary" @click="affirmInstructionFun" :disabled="!assitAccount">确认指令 affirmInstruction</Button>
		<Button type="primary" @click="getInstructionFun" :disabled="!assitAccount">获取指令 getInstruction</Button>
		<Button type="primary" @click="createVenueFun" :disabled="!apiAlice">创建场地 createVenue</Button>
		<Button type="primary" @click="getVenueFun" :disabled="!apiAlice">查询场地 getVenue</Button>
	</div>
</template>
<script>
import {
	BigNumber
} from '@polymeshassociation/polymesh-sdk';

import {
	// ClaimData,
	// ClaimType,
	// ScopeType,
	VenueType,
} from '@polymeshassociation/polymesh-sdk/types';

export default {
	data() {
		return {
			venueId: 831, // 场地Id
			instructionId: 2880, // 指令Id
			mount: 0,// 金额
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
		async getVenueFun() {
			const aa = await this.apiAlice.settlements.getVenue({ // 查询场地，及场地所有指令 to账户
				id: new BigNumber(this.venueId)  // 场地Id
			});
			console.log("查询场地", aa)
			const bb = await aa.getInstructions();
			console.log("查询场地所有指令", bb)
		},
		async createVenueFun() { // 创建场地 to账户
			const aa = await this.apiAlice.settlements.createVenue({
				description: 'ty01 Venue',
				type: VenueType.Distribution,
			});
			console.log("创建场地。。。", aa)
			const bb = await aa.run();
			console.log("创建场地成功", bb)
			this.venueId = bb.id.toString();
		},

		async getInstructionFun() { // 获取指令

			const instruction = await this.assitAccount.settlements.getInstruction({ // 获取指令  接收账户获取 getInstruction
				id: new BigNumber(this.instructionId), // 指令id
			});
			console.log("获取指令：", instruction);
			const bb = await instruction.details();
			console.log("获取指令1：", bb);
			const cc = await instruction.getLegs();
			console.log("获取指令2：", cc);
			const dd = await instruction.getStatus();
			console.log("获取指令3：", dd);
			// const instructions = await venue.getInstructions();
			// const aliceInstruction = [instructions].find((instruction) => {
			// 	return instruction.id.isEqualTo(new BigNumber(this.venueId));
			// });
			// console.log("aliceInstruction:", aliceInstruction);
			// window.aliceInstruction = aliceInstruction;



			const updatedInstructionQueue = await instruction.affirm();
			window.updatedInstructionQueue = updatedInstructionQueue;
			console.log("updatedInstructionQueue:", updatedInstructionQueue);
			const updatedInstruction = await updatedInstructionQueue.run();
			console.log("updatedInstruction:", updatedInstruction);
		},

		async affirmInstructionFun() {
			const aa = await this.assitAccount.settlements.affirmInstruction({ // 用接收的账户去查询
				id: new BigNumber(this.instructionId), // 指令id
			});
			console.log("确认指令。。。", aa)
			const bb = await aa.run();
			// const bb = await aa.affirm();
			console.log("确认指令成功：", bb)
		},

		async addInstructionFun() {  // 添加说明/构造
			// to:
			if (!this.assitAccount) {
				await this.connect(this.assitAccountKey, 2);
			}

			// from
			const bob = await this.apiAlice.identities.getIdentity({
				did: this.apiAlickDid,
			});
			console.log('bob:', bob);
			const destinationPortfolio = await bob.portfolios.getPortfolio();
			console.log('destinationPortfolio:', destinationPortfolio);

			const aa = await this.apiAlice.settlements.addInstruction({
				legs: [
					{
						to: this.assitAccountDid, //
						from: destinationPortfolio,  // or you can pass a Portfolio
						amount: new BigNumber(this.mount), // 金额
						asset: 'TY002', // 资产
					},
					// {
					// 	to: '0x56fffe845776656af85d0dac519abb073ca4073228ed9207588407bc9704d9b0', //apiAlickDid, // 灵明 identity,// passing the Identity (or did) means the default portfolio will be used
					// 	from: destinationPortfolio,  // or you can pass a Portfolio
					// 	amount: new BigNumber(this.mount), // 金额
					// 	asset: 'TY001', // 资产
					// },

				],
				venueId: new BigNumber(this.venueId),
				// endBlock: new BigNumber(10000000),
				// tradeDate: new Date('10/27/2022'), // 贸易日期
			});
			console.log('添加指令...', aa);
			const bb = await aa.run();
			console.log('添加指令成功', bb);
			window.bb = bb;
			this.instructionId = bb.id.toString();
		},
	},
}

</script>