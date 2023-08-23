<style>
button {
  margin: 5px;
}
</style>
<template>
  <div>
    <!-- <account-modu @account-key="getAccountKey" @assist-acount-key="getAssistKey">
			<Button type="primary" @click="connectAll">初始化多个账户 {{ apiAliceAll.length }}</Button>
			<br>
			<template #accountKey>
				<Button type="primary" @click="connect(accountKey, 1)" :disabled="!accountKey">初始化链接 {{ !!apiAlice }}</Button>
				<Button type="primary" @click="connect1">获取扩展中选择的账户-{{!!apiAlice}}</Button>
			</template>
			<template #assitAccountKey>
				<Button type="primary" @click="connect(assitAccountKey, 2)" :disabled="!assitAccountKey">初始化链接
					{{ !!assitAccount }}</Button>
			</template>
		</account-modu> -->
    <Button type="primary"
            @click="createMultiSigAccountFun"
            :disabled="!apiAlice">创建多重签名账户:createMultiSigAccount</Button>
    <Button type="primary"
            @click="getAccountFun"
            :disabled="!apiAlice">获取帐户:getAccount</Button>
    <Button type="primary"
            @click="getAccountBalance"
            :disabled="!apiAlice">查询账户余额：getAccountBalance</Button>
    <Button type="primary"
            @click="getSigningAccount"
            :disabled="!apiAlice">查询账户信息：getSigningAccount</Button>
    <Button type="primary"
            @click="inviteAccountFun"
            :disabled="!apiAlice">发出邀请：inviteAccount</Button>
    <Button type="primary"
            @click="acceive"
            :disabled="!isInviteAccount">接受辅助账户邀请</Button>
    <Button type="primary"
            @click="leaveIdentityFun"
            :disabled="!apiAlice">离开身份leaveIdentity</Button>
    <Button type="primary"
            @click="modifyPermissionsFun"
            :disabled="!apiAlice">修改辅助用户列表权限 modifyPermissions</Button>
    <Button type="primary"
            @click="removeSecondaryAccountsFun"
            :disabled="!apiAlice">删除辅助账户removeSecondaryAccounts</Button>
    <Button type="primary"
            @click="revokePermissionsFun"
            :disabled="!apiAlice">撤销权限 revokePermissions</Button>

    <Button type="primary"
            @click="subsidizeAccountFun">补贴账户发起 subsidizeAccount</Button>
    <Button type="primary"
            @click="subsidizeAccountReceiveFun">补贴账户接受</Button>
    <Button type="primary"
            @click="freezeSecondaryAccountsFun">冻结所有辅助账户 freezeSecondaryAccounts</Button>
    <Button type="primary"
            @click="unfreezeSecondaryAccountsFun">解冻所有辅助账户1 unfreezeSecondaryAccounts</Button>

  </div>
</template>    
<script>
// import accountModu from '../../../../components/accountModu.vue'
import { Polymesh, BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// import { mixin } from '../../../../components/mixin';

export default {
  // components: { 'account-modu': accountModu },
  data () {
    return {
      apiAliceAll: [],
      isInviteAccount: false, // 是否成功邀请辅助账户
    }
  },
  inject: ['accountKeyFn', 'apiAliceFn', 'apiAlickDidFn', 'assitAccountKeyFn', 'assitAccountFn', 'assitAccountDidFn', 'connect'],
  computed: {
    accountKey () {
      return this.accountKeyFn();
    },
    apiAlice () {
      return this.apiAliceFn();
    },
    apiAlickDid () {
      return this.apiAlickDidFn();
    },
    assitAccountKey () {
      return this.assitAccountKeyFn();
    },
    assitAccount () {
      return this.assitAccountFn();
    },
    assitAccountDid () {
      return this.assitAccountDidFn();
    },
  },
  methods: {
    async unfreezeSecondaryAccountsFun () { // 解冻
      const aa = await this.apiAlice.accountManagement.unfreezeSecondaryAccounts();
      console.log("解冻中。。。", aa);
      const bb = await aa.run();
      console.log('解冻成功', bb);
    },
    async createMultiSigAccountFun () {
      console.log('创建多重签名账户：开始');
      const account = await this.getAccountFun('5Ci1fLJdgR7QBGgubYs3Uj8doquE6h8bKxHgXyNYerYQxh9w');
      const aa = await this.apiAlice.accountManagement.createMultiSigAccount({
        requiredSignatures: new BigNumber(1),
        signers: new Array(account),
      });
      console.log('多重签名中...', aa)
      const bb = await aa.run();
      console.log('多重签名中成功：', bb);

      this.subsidizeAccountReceiveFun(); // 接受邀请

    },

    async freezeSecondaryAccountsFun () { // 冻结
      const aa = await this.apiAlice.accountManagement.freezeSecondaryAccounts();
      console.log("冻结中。。。", aa);
      const bb = await aa.run();
      console.log('冻结成功', bb);
    },
    async subsidizeAccountFun () { // 补贴账户发起
      // 链接辅助账户
      if (!this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      // 主账户发起补贴
      const aa = await this.apiAlice.accountManagement.subsidizeAccount({
        allowance: new BigNumber(150),
        beneficiary: await this.assitAccount.accountManagement.getSigningAccount(),
      });
      console.log("补贴中。。。", aa);
      const bb = await aa.run();
      console.log('补贴成功', bb);

    },
    async subsidizeAccountReceiveFun () { // 补贴账户接受
      // 辅助账户的信息
      if (!this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      const ceoAccount = await this.assitAccount.accountManagement.getSigningAccount();
      const pendingAuthorizations = await ceoAccount.authorizations.getReceived();
      console.log('对比1：', pendingAuthorizations);
      const acmeAuthorization = pendingAuthorizations.find((pendingAuthorization) => {
        console.log('对比2：', pendingAuthorization.issuer.did, this.apiAlickDid);
        return pendingAuthorization.issuer.did === this.apiAlickDid;
      });
      console.log('acmeAuthorizati', acmeAuthorization);
      const acceptQueue = await acmeAuthorization.accept();
      await acceptQueue.run();
      console.log('成功接受');// TODO:"Error: The signing Account doesn't have the required permissions to execute this procedure"
    },
    async revokePermissionsFun () { // 撤销权限
      // 辅助账户信息：
      if (this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      const getSigningAccount = await this.assitAccount.accountManagement.getSigningAccounts();
      console.log('辅助账户信息：', getSigningAccount)
      // 撤销权限
      const aa = await this.apiAlice.accountManagement.revokePermissions({
        secondaryAccounts: getSigningAccount
      });
      console.log('撤销权限。。。', aa)
      const bb = await aa.run();
      console.log('撤销权限成功', bb)
    },
    async removeSecondaryAccountsFun () { // 删除辅助账户
      // 辅助账户信息：
      if (this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      const getSigningAccount = await this.assitAccount.accountManagement.getSigningAccounts();
      console.log('辅助账户信息：', getSigningAccount)

      const aa = await this.apiAlice.accountManagement.removeSecondaryAccounts({
        accounts: getSigningAccount
      });
      console.log('删除辅助账户：', aa);
      const bb = await aa.run();
      console.log("辅助账户删除成功", bb)
    },
    async modifyPermissionsFun () { // 修改辅助账户权限
      // 辅助账户信息：
      if (this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      const getSigningAccount = await this.assitAccount.accountManagement.getSigningAccount();
      console.log('辅助账户信息：', getSigningAccount)
      // 修改权限
      // const aa = await this.apiAlice.accountManagement.modifyPermissions({
      // 	secondaryAccounts: getSigningAccount
      // });
      const aa = await this.apiAlice.accountManagement.modifyPermissions({
        secondaryAccounts: [
          {
            account: getSigningAccount,
            permissions: {
              assets: null, // 资产
              portfolios: null,// 投资 组合
              transactionGroups: null,// 事务组
              transactions: null,// 交易
            },
          },
        ],
      });
      console.log('权限修改。。。', aa)
      const bb = await aa.run();
      console.log('权限修改成功', bb)
    },
    async leaveIdentityFun () { // 离开身份
      const aa = await this.apiAlice.accountManagement.leaveIdentity();
      console.log('解除二级账户身份...', aa)
      const bb = await aa.run();
      console.log('解除二级账户身份成功', bb)
    },
    async acceive () { // 辅助账户接受邀请
      // 辅助账户的信息
      const assitAccount = await this.assitAccount.accountManagement.getSigningAccount()
      const pendingAuthorizations = await assitAccount.authorizations.getReceived();
      console.log('对比1：', pendingAuthorizations);
      const acmeAuthorization = pendingAuthorizations
        .find((pendingAuthorization) => {
          console.log('对比2：', pendingAuthorization.issuer.did, this.apiAlickDid);
          return pendingAuthorization.issuer.did === this.apiAlickDid;
        });
      console.log('acmeAuthorizati on', acmeAuthorization)
      const acceptQueue = await acmeAuthorization.accept();
      await acceptQueue.run();
      console.log('成功接受');
    },
    async inviteAccountFun () { // 发出邀请
      this.isInviteAccount = false;
      if (this.assitAccount) {
        this.assitAccount = await this.connect(this.assitAccountKey, 2);
      }
      const inviteAccount = await this.apiAlice.accountManagement.inviteAccount({
        expiry: new Date(Date.now() + 1000 * 60 * 5), // 到期
        // permissions:'',// 权限
        targetAccount: await this.assitAccount.accountManagement.getSigningAccount(),// 目标账户
      });
      console.log("邀请辅助账户", inviteAccount)
      await inviteAccount.run();
      console.log("邀请辅助账户成功！")
      this.isInviteAccount = true;

    },
    async getSigningAccount () {
      const getSigningAccount = await this.apiAlice.accountManagement.getSigningAccount();
      const a = await getSigningAccount.checkPermissions({
        assets: [],
        portfolios: [],
        transactions: [],
      });
      console.log('检查权限：', a)
      const b = await getSigningAccount.exists();
      console.log('确定此账户是否存在于链上:', b)
      const balance = await getSigningAccount.getBalance();
      console.log('获取余额:', balance.free.toString(), balance.locked.toString(), balance.total.toString())
      const nonce = await getSigningAccount.getCurrentNonce();
      console.log('检索此帐户的当前随机数:', nonce.toString())
      const identity = await getSigningAccount.getIdentity();
      console.log('获取身份:', identity);
      const multiSig = await getSigningAccount.getMultiSig();
      console.log('获取多重签名:', multiSig);





      const getSigningAccounts = await this.apiAlice.accountManagement.getSigningAccounts();
      console.log(getSigningAccount, getSigningAccounts);
    },
    async getAccountBalance () {
      const getAccountBalance = await this.apiAlice.accountManagement.getAccountBalance('0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975')
      console.log(
        '账户自由资金：', getAccountBalance.free.toString(),
        '账户冻结资金：', getAccountBalance.locked.toString(),
        '账户总额：', getAccountBalance.total.toString(),
      );

      // const aa = await this.apiAlice.accountManagement.getAccountBalance(()=>{
      // 	console.log('callback')
      // });
      // console.log("aa",aa);

      // const bb = await this.apiAlice.accountManagement.getAccountBalance(
      // 	{account:'0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975'},
      // 	()=>{console.log('函数后回调callback')}
      // );
      // console.log("aa",bb)
    },
    async getAccountFun (address) { // 获取帐户
      address = address && typeof address === 'string' ? address : '5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi';
      const account = await this.apiAlice.accountManagement.getAccount({
        address: address
      });
      console.log('账户信息：', account);
      return account;
      // address: "5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi"
      // authorizations: Authorizations {parent: Account, context: Proxy}
      // context: Proxy {…}
      // key: "0x94551641a72cbe2c72ab92b86f538f20da89c59609e5805c07de78d8e2ab731b"
      // uuid: "QWNjb3VudDp7ImFkZHJlc3MiOiI1RlJDRGl6bkp3WU5ZdjZrcTdpdHM4cnk2eFVXUURxVmRjTVNxdmU1blZkeWo2cGkifQ=="
    },
    async connectAll () {
      const signingManagerAlice = await LocalSigningManager.create({
        "accounts": [
          // 主账户 tianying
          { "mnemonic": 'leader puppy endless decide secret become zebra observe hurt deposit rifle warfare' },
          //辅助账户 07 tianying02
          { "mnemonic": 'amount wagon monkey caution mushroom casual kit damage never proof casual crew' },
        ]
      });
      console.log('加载中', signingManagerAlice);
      const apiAliceAll = await Polymesh.connect({
        nodeUrl: 'wss://testnet-rpc.polymesh.live',
        "signingManager": signingManagerAlice
      });
      const accountArr = await apiAliceAll.accountManagement.getSigningAccounts();
      const account = await apiAliceAll.accountManagement.getSigningAccount();
      console.log('多账户链接成功 返回：', apiAliceAll);
      console.log('多账户链接成功：getSigningAccounts', account);
      console.log('多账户链接成功：getSigningAccounts', accountArr);
      this.apiAliceAll = accountArr;
      // this.apiAlice = apiAliceAll;
    }
  },
  // mixins: [mixin],
  mounted () {
    console.log('account:', Date.now());
  }

}

</script>