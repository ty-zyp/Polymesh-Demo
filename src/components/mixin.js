import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';

// 如果在浏览器环境中使用SDK（即使用Polymesh钱包浏览器扩展），您将使用由
// BrowserExtensionSigningManager@polymeshassociation/browser-extension-signing-manager
// import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager';
export const mixin = {
	data() {
		return {
			accountKey: '', //账户秘钥
			apiAlice: '',
			apiAlickDid: '', // 主账户did  0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975

			assitAccountKey: '', // tianying
			assitAccount: '', // 辅助账户
			assitAccountDid: '',
		}
	},
	methods: {
		getAccountKey(val) {
			this.accountKey = val;
			window.accountKey = val;
		},
		getAssistKey(val) {
			this.assitAccountKey = val;
			window.assitAccountKey = val;
		},
		async connect1() {
			console.log('开始链接。。。')
			const signingManager = await BrowserExtensionSigningManager.create({
				appName: 'my-dApp',
				extensionName: 'polywallet', // this is optional, defaults to 'polywallet'
			}); // The Polymesh wallet extension will ask the user to authorize MY_APP_NAME for access

			const polyClient = await Polymesh.connect({
				// nodeUrl: 'wss://some-node-url.com',
				nodeUrl: 'wss://testnet-rpc.polymesh.live',
				signingManager,
			});
			console.log('另一种链接方式：', polyClient)
			window.apiAlice = polyClient;
			this.apiAlice = polyClient;
			const acme = await polyClient.getSigningIdentity();
			const did = acme.did;
			console.log('did', did, acme)
			this.apiAlickDid = did;
			window.apiAlickDid = did;
			// do stuff with the client

			// callback is called whenever the extension Accounts change
			//每当扩展Accounts更改时都会调用回调
			signingManager.onAccountChange(async newAccounts => {
				console.log('钱包切换账户后加载',newAccounts)
				const aa = window.apiAlice.accountManagement.getSigningAccount();
				console.log('签名账户：',aa)
				// window.location.reload()
				await this.apiAlice.disconnect();
				this.$options.data();
				this.connect1();


				// change SDK's signing account, reload the page, do whatever
				// 更改SDK的签名帐户，重新加载页面，执行任何操作
			});

			// callback is called whenever the extension's selected network changes
			//每当扩展的选定网络发生更改时，都会调用回调
			signingManager.onNetworkChange(newNetwork => {
				console.log('钱包切换网络后加载',newNetwork)
				// act accordingly
			});

		},
		async connect(accountKey, no) { // 初始化账号，创建长链接
			console.log('秘钥：', accountKey)
			const signingManagerAlice = await LocalSigningManager.create({
				"accounts": [{ "mnemonic": accountKey }]
			});
			const apiAlice = await Polymesh.connect({
				nodeUrl: 'wss://testnet-rpc.polymesh.live',
				"signingManager": signingManagerAlice
			});
			console.log(no === 1 ? '主账户' : '辅助账户|第二账户', '链接成功：', apiAlice);
			const acme = await apiAlice.getSigningIdentity();
			const did = acme.did;
			if (no === 2) { // 需要返回值
				window.assitAccountKey = this.assitAccountKey;
				this.assitAccount = apiAlice;
				window.assitAccount = apiAlice;
				this.assitAccountDid = did;
				window.assitAccountDid = did;
				console.log('辅助账户did assitAccountDid', did, apiAlice);
				return apiAlice;
			} else {
				window.accountKey = this.accountKey;
				this.apiAlice = apiAlice;
				window.apiAlice = apiAlice;
				this.apiAlickDid = did;
				window.apiAlickDid = did;
				console.log('主账户did apiAlickDid', did, apiAlice);
			}
		},
	},
	async mounted() {
		console.log('mixin',Date.now(), window.apiAlice, window.accountKey, window.assitAccountKey)
		// if(!this.apiAlice){
		// 	await this.connect1();
		// }
		
		this.accountKey = window.accountKey || '';
		this.assitAccountKey = window.assitAccountKey || '';
		this.apiAlice = window.apiAlice || '';
		this.apiAlickDid = window.apiAlickDid || '';
		if (window.assitAccountDid) {
			this.assitAccount = window.assitAccount || '';
			this.assitAccountDid = window.assitAccountDid || '';
		}
	}
}