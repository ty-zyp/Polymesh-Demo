<template>
  <div class="hello">
    选择登录账户：
    <!-- <Select v-model="account" style="display:inline-block;width:200px;">
      <Option v-for="item in accountList" :key="item.key" :value="item.key">{{ item.accountNo }}-{{ item.name }}
      </Option>
    </Select> -->
    <Cascader :data="accountList" v-model="accountArr" style="display:inline-block;width:200px;" change-on-select/>
    <Button type="primary" @click="btn_init(account)" :disabled="!account">初始化sdk</Button>
    <Button type="primary" @click="btn_getAddress" :disabled="!apiAlice">获取账户address</Button>
    <br />
    <br />
    股票代码：<Input v-model.trim="stockNo" style="display:inline-block;width:200px;"/>
    <Button type="primary" @click="btn_reserve" :disabled="!(apiAlice && stockNo)">股票代码预定</Button>
    <Button type="primary" @click="btn_reserve_determine" :disabled="!(apiAlice && stockNo)">股票代码预定是否成功</Button>
    <br />
    <br />
    股票代码名字：<Input v-model.trim="stockName" style="display:inline-block;width:200px;"/>
    <Button type="primary" @click="btn_create" :disabled="!(apiAlice && stockName)">创建股票代码</Button>
    <Button type="primary" @click="btn_queryStock" :disabled="!(apiAlice && stockNo)">查询创建的股票代码</Button>
    <br />
    <br />
    选择辅助账户：
    <!-- <Select v-model="assistAccount" style="display:inline-block;width:200px;">
      <Option v-for="item in accountList" :key="item.key" :value="item.key">{{ item.accountNo }}-{{ item.name }}
      </Option>
    </Select> -->
    <Cascader :data="accountList" v-model="assistAccountArr" style="display:inline-block;width:200px;" change-on-select/>
    <Button type="primary" @click="btn_create_assist" :disabled="!(apiAlice && assistAccount)">创建辅助账户</Button>
    <Button type="primary" @click="btn_transfer" :disabled="!(apiAlice && assistAccount)">资产所有权转让</Button>
    <br />
    <br />

  </div>
</template>

<script>
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
import { accountList } from '../../../components/const'
console.log(accountList)
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      accountList,
      currentTime: 0,
      account: '', // 账号
      accountArr: [], // 账号
      assistAccount: '', // 辅助账户
      assistAccountArr: [], // 辅助账户
      stockNo: '', // 股票编码
      stockName: '', // 股票代码名字
      signingManagerAlice: null, // 账户配置
      apiAlice: null,// 账户信息
    }
  },
  watch:{
    accountArr(val){
      this.account = val[val.length-1];
    },
    assistAccountArr(val){
      this.assistAccount = val[val.length-1];
    },
  },
  methods: {
    async btn_transfer() { // 资产所有权转让
      console.log("资产所有权转让")

      // 辅助账户信息
      const apiCeo = await this.btn_init(this.assistAccount, true);
      const ty02 = await apiCeo.getSigningIdentity();
      const ty02Did = ty02.did;
      console.log("ty02Did",ty02Did)

      const asset = await this.apiAlice.assets.getAsset({
        "ticker": "TY"
      });
      console.log("asset",asset)
      const acme = await this.apiAlice.getSigningIdentity();
      const aliceDid = acme.did;
      const transferQueue = await asset.transferOwnership({
        "target": ty02Did
      });
      console.log("transferQueue",transferQueue)
      await transferQueue.run();

      
      const pubCeo = apiCeo.accountManagement.getSigningAccount(); // 获取签名账户
      console.log("apiCeo pubCeo ",apiCeo, pubCeo)
      const ceoAccount = await apiCeo.accountManagement.getAccount({ address: pubCeo.address });
      const pendingAuthorizations = await ceoAccount.authorizations.getReceived();
      console.log("对比：pendingAuthorizations",pendingAuthorizations,aliceDid)
      const transferAuthorization = pendingAuthorizations
        .find((pendingAuthorization) => {
          return pendingAuthorization.issuer.did === aliceDid;
        });
      const acceptQueue = await transferAuthorization.accept();
      console.log("acceptQueue:",acceptQueue)
      await acceptQueue.run();


    },
    async btn_reserve() {
      console.log("预定股票代码")
      // 股票代码预定
      const reservationQueue = await this.apiAlice.assets.reserveTicker({
        "ticker": this.stockNo
      });
      console.log("44 股票代码预定：", reservationQueue)
      // 运行
      const reservation = await reservationQueue.run();
      console.log("55 运行：", reservation)
    },
    async btn_reserve_determine() {
      console.log("查询股票代码是否预定成功")
      // 确认
      const alice = await this.apiAlice.getSigningIdentity();

      // 获取预定的股票代码
      const reservation = await this.apiAlice.assets.getTickerReservation({
        "ticker": this.stockNo
      });
      const { owner } = await reservation.details();
      console.log("66 确认", alice, owner)
      // assert(owner.did === alice.did);
    },
    async btn_create() {
      // 创建股票代码
      // 获取预定的股票代码
      const reservation = await this.apiAlice.assets.getTickerReservation({
        "ticker": this.stockNo
      });
      const assetQueue = await reservation.createAsset({
        "name": this.stockName,
        "assetType": "EquityPreferred",
        "isDivisible": false
      });
      console.log("77", assetQueue);
      const asset = await assetQueue.run();
      console.log("88", asset);
    },
    async btn_queryStock() {
      const asset = await this.apiAlice.assets.getAsset({
        "ticker": this.stockNo
      });
      console.log("99", asset);
    },
    async btn_create_assist() { // 创建辅助账户
      console.log("创建辅助账户");
      const apiAcme = this.apiAlice;
      const acme = await apiAcme.getSigningIdentity();
      const acmeDid = acme.did;

      // 辅助账户信息
      const apiCeo = await this.btn_init(this.assistAccount, true);
      // 获取辅助账户公钥

      const pubCeo = apiCeo.accountManagement.getSigningAccount(); // 获取签名账户
      console.log("11", apiCeo, pubCeo)

      const accountAddress = await apiCeo.accountManagement.getAccount({ address: pubCeo.address });
      console.log("----", accountAddress);

      // 主账户获取辅助账户信息
      const aaa = await apiAcme.accountManagement.inviteAccount({
        "targetAccount": accountAddress
      });
      await aaa.run();
      // 辅助账户的信息
      const ceoAccount = accountAddress;
      console.log('ceoAccount:', ceoAccount)
      const pendingAuthorizations = await ceoAccount.authorizations.getReceived();

      console.log('对比1：', pendingAuthorizations, acmeDid);

      const acmeAuthorization = pendingAuthorizations
        .find((pendingAuthorization) => {
          console.log('对比2：', pendingAuthorization.issuer.did, acmeDid);
          return pendingAuthorization.issuer.did === acmeDid;
        });
      console.log('acmeAuthorizati on', acmeAuthorization)
      const acceptQueue = await acmeAuthorization.accept();
      await acceptQueue.run();
    },
    async btn_init(account, bool) { // 创建websoket长连接
      account = account || this.account;
      console.log(11, account);
      const signingManagerAlice = await LocalSigningManager.create({
        "accounts": [{ "mnemonic": account }]
      });
      console.log(22)
      const apiAlice = await Polymesh.connect({
        nodeUrl: 'wss://testnet-rpc.polymesh.live',
        "signingManager": signingManagerAlice
      });
      console.log(33, apiAlice);
      if (bool) { // 需要返回值
        return apiAlice;
      }
      this.apiAlice = apiAlice;
      this.signingManagerAlice = signingManagerAlice;
    },
    async btn_getAddress() {
      console.log(this.apiAlice)
      const account = await this.apiAlice.accountManagement.getSigningAccount();
      console.log('账户address:', account)
    },
    getTime() {
      const cT = Date.now();
      const oldT = this.currentTime;
      this.currentTime = cT;
      return (cT - oldT) / 1000 + ' s';
    },
  },
  created() {
    // this.account = "leader puppy endless decide secret become zebra observe hurt deposit rifle warfare";
    // this.btn_init(this.account);
  },
  mounted() {
    console.log(process.argv[2])
  }
}
</script>

