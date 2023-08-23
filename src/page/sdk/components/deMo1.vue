<style>
button {
	margin: 5px;
}
</style>
<template>
	<div>
		选择登录账户：
		<!-- <Select v-model="accountKey" style="display:inline-block;width:200px;">
			<Option v-for="item in accountList" :key="item.key" :value="item.key">{{ item.accountNo }}-{{ item.name }}
			</Option>
		</Select> -->
		<Cascader :data="accountList" v-model="accountKeyArr" style="display:inline-block;width:200px;" change-on-select/>
		<Button type="primary" @click="connect(accountKey)" :disabled="!accountKey">初始化链接</Button>
		<Button type="primary" @click="aaa">aa</Button>
	</div>
</template>    
<script>
import {
	Polymesh,
	// BigNumber
} from '@polymeshassociation/polymesh-sdk';
import {
	// ClaimData,
	// ClaimType,
	// ScopeType
} from '@polymeshassociation/polymesh-sdk/types';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
import {
	accountList
} from '../../../components/const';

console.log('页面加载 accountList 。。。', window.accountList)
export default {
	data() {
		return {
			accountList,
			accountKeyArr:[],
			accountKey: '', //账户秘钥
			assitAccountKey: 'artefact exclude what cry tumble episode sugar giant maze town pioneer syrup',
			apiAlice: '',
			apiAlickDid: '', // 主账户did  0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975
			assitAccount: '', // 辅助账户
			accountManagement: '',
			isInviteAccount: false, // 是否成功邀请辅助账户
		}
	},
	watch:{
		accountKeyArr(val){
			this.accountKey = val[val.length-1];
		}
	},
	methods: {
		async aaa() {  // 添加说明/构造
			// alick
			// const signingManagerAlice = await LocalSigningManager.create({
			// 	"accounts": [{
			// 		"mnemonic": "leader puppy endless decide secret become zebra observe hurt deposit rifle warfare"
			// 	}]
			// });

			// const apiAlice = await Polymesh.connect({
			// 	"nodeUrl": "wss://testnet-rpc.polymesh.live", // or your preferred node
			// 	"signingManager": signingManagerAlice
			// });
			// console.log('apiAlice:',apiAlice)

			// 安全手
			// const signingManagerSafeHands = await LocalSigningManager.create({
			// 	"accounts": [{
			// 		"mnemonic": "lunar observe decide network during seek upon athlete swallow omit praise replace"
			// 	}]
			// });
			// const apiSafeHands = await Polymesh.connect({
			// 	"nodeUrl": "wss://testnet-rpc.polymesh.live", // or your preferred node
			// 	"signingManager": signingManagerSafeHands
			// });
			// const safeHands = await apiSafeHands.getSigningIdentity();
			// const safeHandsDid = safeHands.did; // For Alice and NextDaq
			// console.log('safeHandsDid:',safeHandsDid)

			// 第三个
			const apiNextDaq = await Polymesh.connect({
				"nodeUrl": "wss://testnet-rpc.polymesh.live", // or your preferred node
				"accountMnemonic": "address ripple okay pulse aisle magic submit bacon cereal anger dream during"
			});
			console.log('apiNextDaq:',apiNextDaq)
			const nextDaq = await apiNextDaq.getSigningIdentity();
			const nextDaqDid = nextDaq.did; // For SafeHands
			console.log('nextDaqDid:',nextDaqDid)
		},
		async connect(accountKey, bool) { // 初始化账号，创建长链接
			if (!bool) {
				window.accountList = []
				this.apiAlice = '';
				this.apiAlickDid = '';
			}
			accountKey = accountKey || this.accountKey;
			console.log('秘钥：', accountKey)
			const signingManagerAlice = await LocalSigningManager.create({
				"accounts": [{ "mnemonic": accountKey }]
			});
			console.log('加载中', signingManagerAlice);
			const apiAlice = await Polymesh.connect({
				nodeUrl: 'wss://testnet-rpc.polymesh.live',
				"signingManager": signingManagerAlice
			});
			console.log('链接成功：', apiAlice);
			if (window.accountList.indexOf(apiAlice) === -1) {
				window.accountList.push(apiAlice); //全局变量
			}
			if (bool) { // 需要返回值
				return apiAlice;
			}
			this.apiAlice = apiAlice;
			this.accountManagement = apiAlice.accountManagement;

			const acme = await this.apiAlice.getSigningIdentity();
			this.apiAlickDid = acme.did;
			window.apiAlickDid = this.apiAlickDid;
			console.log('主账户did apiAlickDid', this.apiAlickDid);
		},
	},
	mounted() {
		if (window.apiAlickDid) {
			this.apiAlice = window.accountList[0] || '';
			this.assitAccount = window.accountList[1] || '';
			this.apiAlickDid = window.apiAlickDid || '';
		}
	}
}

</script>