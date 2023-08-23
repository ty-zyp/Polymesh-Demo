<style>
button {
	margin: 5px;
}
</style>
<template>
  <div>
    <Button @click="init">初始化</Button>
    <Button @click="get2" :disabled="!api">常量</Button>
    <Button @click="get3" :disabled="!api">状态查询</Button>
    <Button @click="get4">获取浏览器扩展账户信息</Button>
    <Button @click="get5" :disabled="!api">RPC查询</Button>
    <Button @click="get6" :disabled="!api">订阅查询</Button>
    <Button @click="get6_1" :disabled="!api">带参数的订阅</Button>
    <Button @click="get6_2" :disabled="!api">多查询</Button>
    <Button @click="get6_3" :disabled="!api">查询附加功能</Button>
    <br>
    扣款账户：
    <Select v-model="outAccount" style="width:400px;" @on-change="getBalance(outAccount, 'outAccountBalance')" :disabled="!computedAccountList.length">
      <Option v-for="item in computedAccountList" :key="item.address" :label="item.name" :value="item.address"></Option>
    </Select> 账户余额{{ outAccountBalance }}
    <br>
    收款账户：
    <Select v-model="receiveAccount" style="width:400px;" :disabled="!computedAccountList.length"
      @on-change="getBalance(receiveAccount, 'receiveAccountBalance')">
      <Option v-for="item in computedAccountList" :key="item.address" :label="item.name" :value="item.address"></Option>
    </Select> 账户余额{{ receiveAccountBalance }}
    <br>
    或者其他账户：<Input v-model="receiveAccount" style="width:400px;" @on-blur="getBalance(receiveAccount, 'receiveAccountBalance')"/>账户余额{{ receiveAccountBalance }}
    <br>
    交易金额：<Input v-model="mount" style="width:400px;"/>
    <br>
    <Button @click="get6_4" :disabled="!api">交易</Button>
    <br>
    <Button @click="get8" :disabled=false>生成12个单词</Button>
    <Button @click="get7" :disabled=false>秘钥生成address</Button>
    <Button @click="get9" :disabled=false>创建账户</Button>
    <br>
    秘钥：<Input v-model="seed" style="width:400px;"/>
    <br>
    address: <Input v-model="address" style="width:400px;"/>
  </div>
</template>
<script>
import { ApiPromise, WsProvider } from '@polkadot/api';
import { keyring } from '@polkadot/ui-keyring';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { objectSpread,u8aToHex } from '@polkadot/util';
import { TypeRegistry } from '@polkadot/types/create';
import {hdLedger,mnemonicGenerate,randomAsU8a } from '@polkadot/util-crypto';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';
import FileSaver from 'file-saver';
const registry = new TypeRegistry();
export default {
  data() {
    return {
      api: '',
      apiUrl1: "wss://testnet-rpc.polymesh.live",
      apiUrl2: "wss://rpc.polkadot.io",
      DISALLOW_EXTENSIONS: [],
      seed: 'nothing boost avocado mystery disease hat buddy van head choice chaos kind', // 秘钥 12个单词
      address: '', // address
      accountList: [], // 账户列表
      outAccount: '',
      outAccountBalance: 0,
      receiveAccount: '',
      receiveAccountBalance: 0,
      mount:0,
    }
  },
  computed: {
    computedAccountList() {
      const arr = [];
      this.accountList.forEach(item => {
        const { address, meta } = item;
        const { name } = meta;
        arr.push({
          address, name
        })
      })
      return arr;
    }
  },
  methods: {
    moneyFormat(num) {
      if(!parseFloat(num)){
        return parseFloat(num).toFixed(2);
      }
      const arr = num.split('.');
      const [a,b] = arr;
      function abc(a){
        const len = a.length
        return len <= 3 ? a : abc(a.substr(0, len - 3)) + ',' + a.substr(len - 3, 3);
      }
      const aa = abc(a);
      const aaa = aa+'.'+b
      return aaa;
    },
    async get9() {

      function downloadAccount({ json, pair }) {
        FileSaver.saveAs(
          new Blob([JSON.stringify(json)], { type: 'application/json; charset=utf-8' }),
          `${pair.address}.json`
        );
      }



      function tryCreateAccount(commitAccount, success) {
        console.log('success:', success)
        const status = {};

        try {
          const result = commitAccount();
          const address = result.pair.address;

          status.account = address;
          console.log('address--account:', result, address, status.account)
          // if (getEnvironment() === 'web') {
          // downloadAccount(result);
          // }

          downloadAccount(result);
          // InputAddress.setLastValue('account', address);
        } catch (error) {
          status.status = 'error';
          status.message = error.message;
        }

        return status;
      }

      function getSuri(seed, derivePath, pairType) {
        return pairType === 'ed25519-ledger'
          ? u8aToHex(hdLedger(seed, derivePath).secretKey.slice(0, 32))
          : pairType === 'ethereum'
            ? `${seed}/${derivePath}`
            : `${seed}${derivePath}`;
      }

      function createAccount(seed, derivePath, pairType, { genesisHash, name, tags = [] }, password, success) {
        console.log('1:', seed);
        const commitAccount = () =>
          keyring.addUri(getSuri(seed, derivePath, pairType), password, { genesisHash, isHardware: false, name, tags }, pairType === 'ed25519-ledger' ? 'ed25519' : pairType);

        return tryCreateAccount(commitAccount, success);
      }


      // eslint-disable-next-line no-debugger
      debugger;
      const isDevelopment = false;
      const derivePath = "";
      const name = 'zyp03';
      const password = "Tyasd369";
      const pairType = "sr25519"
      const options = {
        genesisHash: isDevelopment ? undefined : this.api.genesisHash.toString(),
        isHardware: false,
        name: name.trim()
      };
      const status = createAccount(this.seed, derivePath, pairType, options, password, 'created account');
      console.log(status);
    },
    async get8() { // 生成12个单词
      function newSeed(seed, seedType) {
        switch (seedType) {
          case 'bip':
            return mnemonicGenerate();
          case 'dev':
            return DEV_PHRASE;
          default:
            return seed || u8aToHex(randomAsU8a());
        }
      }
      const _seed = "";
      const seedType = 'bip'
      const seed = newSeed(_seed, seedType);
      console.log('秘钥：', seed)
      this.seed = seed;
    },

    async get7() {
      // const apiUrl = "wss://testnet-rpc.polymesh.live";



      const injectedPromise = web3Enable('polkadot-js/apps');
      const {
        injectedAccounts,
      } = await this.retrieve(this.api, injectedPromise);

      function isKeyringLoaded() {
        try {
          return !!keyring.keyring;
        } catch {
          return false;
        }
      }
      isKeyringLoaded() || keyring.loadAll({
        genesisHash: this.api.genesisHash,
        genesisHashAdd: [],
        isDevelopment: false,
        ss58Format: 42,
        // store,
        type: 'ed25519'
      }, injectedAccounts);



      function addressFromSeed(seed, derivePath, pairType) {
        return keyring.createFromUri(seed, {}, pairType === 'ed25519-ledger' ? 'ed25519' : pairType)
          .address;
      }

      const aa = addressFromSeed(
        // 'address ripple okay pulse aisle magic submit bacon cereal anger dream during',
        this.seed,
        '',
        'sr25519');
      console.log('账户相关：', aa)
      this.address = aa;
    },
    async retrieve(api, injectedPromise) {
      const [systemChain, systemChainType, systemName, systemVersion, injectedAccounts] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.chainType
          ? api.rpc.system.chainType()
          : Promise.resolve(registry.createType('ChainType', 'Live')),
        api.rpc.system.name(),
        api.rpc.system.version(),
        this.getInjectedAccounts(injectedPromise)
      ]);
      console.log()
      return {
        injectedAccounts: injectedAccounts.filter(({ meta: { source } }) =>
          !this.DISALLOW_EXTENSIONS.includes(source)
        ),
        properties: registry.createType('ChainProperties', {
          ss58Format: api.registry.chainSS58,
          tokenDecimals: api.registry.chainDecimals,
          tokenSymbol: api.registry.chainTokens
        }),
        systemChain: (systemChain || '<unknown>').toString(),
        systemChainType,
        systemName: systemName.toString(),
        systemVersion: systemVersion.toString()
      };
    },
    async getInjectedAccounts(injectedPromise) {
      try {
        await injectedPromise;

        const accounts = await web3Accounts();

        return accounts.map(({ address, meta }, whenCreated) => ({
          address,
          meta: objectSpread({}, meta, {
            name: `${meta.name || 'unknown'} (${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
            whenCreated
          })
        }));
      } catch (error) {
        console.error('web3Accounts', error);

        return [];
      }
    },


    async get6_4() { // 交易

      // account”的类型为InjectedAccountWithMeta    `account` is of type InjectedAccountWithMeta 
      // 我们任意选择从上述片段返回的第一个帐户   We arbitrarily select the first account returned from the above snippet
      // const account = allAccounts[0];

      // 这里我们使用api创建一个余额转账到某个值为12344的帐户 here we use the api to create a balance transfer to some account of a value of 12344
      const transferExtrinsic = this.api.tx.balances.transfer(this.receiveAccount, this.mount*1000000)

      // 能够从此帐户检索签名者界面 to be able to retrieve the signer interface from this account
      // 我们可以使用web3FromSource，它将返回InjectedExtension类型 we can use web3FromSource which will return an InjectedExtension type

      // const injector = await web3FromSource(account.meta.source);

      const injector = await web3FromSource('polywallet');
      console.log('InjectedExtension',injector)
      // 将注入的帐户地址作为signAndSend的第一个参数传递 passing the injected account address as the first argument of signAndSend
      // 将允许api检索签名者，用户将看到扩展 will allow the api to retrieve the signer and the user will see the extension
      // 弹出窗口要求签署余额转账交易 popup asking to sign the balance transfer transaction
      transferExtrinsic.signAndSend(this.outAccount, { signer: injector.signer }, ({ status }) => {
        console.log('status:',status);
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
        this.getBalance(this.outAccount, 'outAccountBalance')
        this.getBalance(this.receiveAccount, 'receiveAccountBalance')
      }).catch((error) => {
        console.log(':( transaction failed', error);
      });

    },
    async get6_3() {
      const ADDR = '5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS'; // tyzpy
      // 检索当前块标题
      const lastHdr = await this.api.rpc.chain.getHeader();
      console.log('lastHdr:', lastHdr);
      // 在特定块获取修饰的api实例
      const apiAt = await this.api.at(lastHdr.hash);
      console.log('apiAt:', apiAt);
      // 查询链中该点的余额
      const { data: { free } } = await apiAt.query.system.account(ADDR);

      // 显示自由余额
      console.log(`显示自由余额 ${free.toString()}`);



      console.log("=========================")
      // 检索活动时代  Retrieve the active era  
      const activeEra = await this.api.query.staking.activeEra();
      const aa = activeEra.unwrap();
      console.log(aa)
      // 检索活动时代的所有曝光 retrieve all exposures for the active era
      const exposures = await this.api.query.staking.erasStakers.entries(aa.index);

      exposures.forEach(([key, exposure]) => {
        console.log('key arguments:', key.args.map((k) => k.toHuman()));
        console.log('     exposure:', exposure.toHuman());
      });
    },


    async get6_2(out, receive) { // 多查询
      let count = 0;
      const ADDR1 = out || '5H8SiEmQtA9VhbRfpzENVmsVjF6L6kZqNvV5qWL8KKWwxp71'; // ty
      const ADDR2 = receive || '5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi';// tianying
      // 订阅两个账户余额的变化, ADDR1 & ADDR2 (already defined)
      const unsub = await this.api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
        const [{ data: balance1 }, { data: balance2 }] = balances;

        console.log(`余额查询： 转出：${balance1.free} ；接收方：${balance2.free}`);

        if (++count === 3) {
          unsub();
        }
      });

      return;
      // Retrieve a snapshot of the validators
      //检索验证器的快照
      // (all active & waiting based on ValidatorPrefs storage)
      //（所有活动和等待基于 ValidatorPrefs 存储）
      // const validatorKeys = await this.api.query.staking.validators.keys();

      // Subscribe to the balances for these accounts
      //订阅这些帐户的余额
      // let count1 = 0;
      // console.log('this.api.query.balances.account',this.api.query.balances.account)
      // const unsub1 = await this.api.query.balances.account.multi(validatorKeys, (balances) => {
      // // const unsub1 = await this.api.query.system.account.multi(validatorKeys, (balances) => {
      //   console.log(balances,`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
      //   if (++count1 === 3) {
      //     unsub1();
      //   }
      // });



      // console.log('多类型，不同查询');
      // let count2 = 0;
      // const ADDR = '5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS'; // tyzpy
      // // 订阅时间戳、我们的索引和余额
      // const unsub2 = await this.api.queryMulti([
      //   this.api.query.timestamp.now,
      //   [this.api.query.system.account, ADDR]
      // ], ([now, { nonce, data: balance }]) => {
      //   console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
      //   if (++count2 === 3) {
      //     unsub2();
      //   }
      // });
      // console.log(unsub2)
    },
    async getBalance(addr, str) {
      console.log(addr, str)
      let count = 0;
      const unsub = await this.api.query.system.account(addr, ({ nonce, data: balance }) => {
        console.log(`自由余额 ${balance.free} 和 ${balance.reserved} 保留和暂时的 ${nonce}`);
        this[str] = this.moneyFormat(String(balance.free/1000000));
        if (++count === 3) {
          unsub();
        }
      });
    },
    async get6_1() {
      let count = 0;
      const ADDR = '5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS';
      const unsub = await this.api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        console.log(`自由余额 ${balance.free} 和 ${balance.reserved} 保留和暂时的 ${nonce}`);
        if (++count === 3) {
          unsub();
        }
      });
    },
    async get6() {
      let count = 0;
      const unsub = await this.api.query.timestamp.now((moment) => {
        console.log(`最后一个块的时间戳为： ${moment} - ${count}`);
        if (++count === 3) {
          unsub();
        }
      });
    },
    async get5() {

      // Retrieve the chain name  检索链名称
      const chain = await this.api.rpc.system.chain();  //Polkadot

      // // Retrieve the latest header  检索最新标头
      // const lastHeader = await this.api.rpc.chain.getHeader();
      // window.lastHeader = lastHeader;
      // console.log(chain);
      // console.log(lastHeader.number.toString());
      // console.log(lastHeader.hash);
      // console.log(lastHeader);

      // // Log the information  记录信息
      // console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

      let count = 0;
      const unsubHeads = await this.api.rpc.chain.subscribeNewHeads((lastHeader) => {  //lastHeader.author
        console.log(`链名称：${chain}；最后的块： #${lastHeader.number} ；哈希值： ${lastHeader.hash}；创建者： ${lastHeader.author}`);
        if (++count === 2) {
          unsubHeads();
        }
      });
      let count1 = 0;
      const unsub = await this.api.derive.chain.subscribeNewHeads((lastHeader) => {
        console.log(`派生：#${lastHeader.number} was authored by ${lastHeader.author}`);
        if (++count1 === 2) {
          unsub();
        }
      });

    },
    async fn() {
      const aa = await web3Accounts();
      console.log('账户信息：', aa);
      this.accountList = aa;
      window.accountList = aa;

    },
    async get4() {
      const injectedPromise = web3Enable('polkadot-js/apps');

      injectedPromise
        .then(res => {
          console.log('111', res);
          this.fn()
        })
        .catch(console.error);

    },
    async get3() {
      // Initialize the API as in previous sections


      // 我们将使用的实际地址
      // const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
      const ADDR = '5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi';

      // // 检索上一个时间戳
      // const now = await this.api.query.timestamp.now();

      // // 通过系统模块检索账户余额和随机数
      // const { nonce, data: balance } = await this.api.query.system.account(ADDR);


      const [now, { nonce, data: balance }] = await Promise.all([
        this.api.query.timestamp.now(),
        this.api.query.system.account(ADDR)
      ]);


      console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);




    },
    async get2() {
      // Initialize the API as per previous sections
      console.log('get2')

      // The length of an epoch (session) in Babe
      console.log(this.api.consts.babe.epochDuration.toNumber());

      // The amount required to create a new account
      console.log(this.api.consts.balances.existentialDeposit.toNumber());

      // window.transactionPayment = this.api.consts.transactionPayment;
      // console.log(window.transactionPayment);
      // // The amount required per byte on an extrinsic
      console.log(this.api.consts.transactionPayment.operationalFeeMultiplier.toNumber());
    },
    async init() {// 创建实例
      window.api = "";
      this.spi = "";
      // Construct
      // console.log('链接开始')
      const wsProvider = new WsProvider(this.apiUrl1);
      // console.log('链接中。。。', wsProvider)
      // const api = await ApiPromise.create({ provider: wsProvider });
      // console.log('链接成功！', api)
      // console.log(api, api.genesisHash.toHex());


      // 快捷方式
      // Create the instance
      const api = new ApiPromise({ provider: wsProvider });
      console.log('链接中。。。', api)
      // Wait until we are ready and connected
      await api.isReady;
      window.api = api;
      this.api = api;
      console.log('链接成功！', api)
      // // Do something
      // console.log(api.genesisHash.toHex());
    },
  },
  mounted() {
    console.log("mounted", window.api)
    this.api = window.api;
    if(window.accountList){
      this.accountList = window.accountList;
    }
  }
}

</script>