<template>
  <div>
    <Button type="primary" @click="getKeyring" :disabled="!api">生成keyring</Button>
    <Button type="primary" @click="get1" :disabled="!api">秘钥生成账户地址</Button>
    <Button type="primary" @click="get2" :disabled="!api">种子</Button>
    <Button type="primary" @click="get3" :disabled="!api">种子</Button>
    <Button type="primary" @click="get4" :disabled="!api">种子</Button>
    <Button type="primary" @click="get5" :disabled="!api">获取所有扩展账号</Button>
    <Button type="primary" @click="get6" :disabled="!api">签名消息</Button>
    <Button type="primary" @click="get7" :disabled="!api">订阅扩展账户</Button>
    <Button type="primary" @click="get8" :disabled="!api">查询交易费用</Button>
  </div>
</template>
<script>
// Import the keyring as required
import { Keyring } from '@polkadot/api';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { stringToHex } from "@polkadot/util";
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3AccountsSubscribe
} from '@polkadot/extension-dapp';
export default {
  data() {
    return {
      api: '',
      allAccounts: []
    }
  },
  methods: {
    async get8() {
      const info = await this.api.tx.balances
        .transfer('5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi', 123)
        .paymentInfo('5H8SiEmQtA9VhbRfpzENVmsVjF6L6kZqNvV5qWL8KKWwxp71');

      // log relevant info, partialFee is Balance, estimated for current
      console.log(info);
      console.log(`
        class=${info.class.toString()},
        weight=${info.weight.toString()},
        partialFee=${info.partialFee.toHuman()}
      `);
    },
    async get7() {


      // this call fires up the authorization popup
      const extensions = await web3Enable('my cool dapp');
      console.log('extensions:', extensions);
      if (extensions.length === 0) {
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return;
      }

      // we are now informed that the user has at least one extension and that we
      // will be able to show and use accounts
      let unsubscribe; // this is the function of type `() => void` that should be called to unsubscribe

      // we subscribe to any account change and log the new list.
      // note that `web3AccountsSubscribe` returns the function to unsubscribe
      unsubscribe = await web3AccountsSubscribe((injectedAccounts) => {
        console.log('injectedAccounts:', injectedAccounts);
        injectedAccounts.map((accounts) => {
          console.log('accounts.address:', accounts.address);
        })
      });
      console.log(unsubscribe)
      // don't forget to unsubscribe when needed, e.g when unmounting a component
      // unsubscribe && unsubscribe();
    },
    async get6() {


      // `account` is of type InjectedAccountWithMeta 
      // We arbitrarily select the first account returned from the above snippet
      const account = this.allAccounts[0];
      console.log('account:', account)
      // to be able to retrieve the signer interface from this account
      // we can use web3FromSource which will return an InjectedExtension type
      const injector = await web3FromSource(account.meta.source);
      console.log('injector:', injector)

      // this injector object has a signer and a signRaw method to be able to sign raw bytes
      // 这个注入器对象有一个签名者和一个signRaw方法，可以对原始字节进行签名
      const signRaw = injector?.signer?.signRaw;
      console.log('signRaw:', signRaw)
      if (signRaw) {
        // after making sure that signRaw is defined we can use it to sign our message
        // 在确保signRaw已定义之后，我们可以使用它对消息进行签名
        const { signature } = await signRaw({
          address: account.address,
          data: stringToHex('message to sign'),
          type: 'bytes'
        });

        console.log('signature:', signature)
      }
    },
    async get5() {


      // 此调用会触发授权弹出窗口 this call fires up the authorization popup
      const extensions = await web3Enable('my cool dapp');
      console.log('插件数据：', extensions)
      if (extensions.length === 0) {
        //未安装扩展，或者用户未接受授权 no extension installed, or the user did not accept the authorization
        // 在这种情况下，我们应该通知用户并提供扩展的链接 in this case we should inform the use and give a link to the extension
        return;
      }

      // we are now informed that the user has at least one extension and that we will be able to show and use accounts
      // 我们现在被告知用户至少有一个扩展，我们将能够显示和使用帐户
      const allAccounts = await web3Accounts();
      console.log(allAccounts);
      this.allAccounts = allAccounts;
      window.allAccounts = allAccounts;
    },
    get4() {
      // known mnemonic, well, now it is - don't use it for funds
      //众所周知的助记符，好吧，现在是-不要把它用于资金
      const MNEMONIC = 'address ripple okay pulse aisle magic submit bacon cereal anger dream during';

      // type: ed25519, ssFormat: 42 (all defaults)
      //类型：ed25519，ssFormat:42（所有默认值）
      const keyring = new Keyring();
      const pair = keyring.createFromUri(MNEMONIC);

      // use the default as setup on init
      //在init上使用默认设置
      // 5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
      //5CSbZ7wG456型4OiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
      console.log('Substrate generic', pair.address);

      // adjust the default ss58Format for Kusama
      //调整草间弥生的默认ss58格式
      // CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M
      keyring.setSS58Format(2);
      console.log('Kusama', pair.address);

      // adjust the default ss58Format for Polkadot
      //调整Polkadot的默认ss58格式
      // 1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h
      keyring.setSS58Format(0);
      console.log('Polkadot', pair.address);

      // 16,178,46,190,137,179,33,55,11,238,141,57,213,197,212,17,218,241,232,252,145,201,209,83,64,68,89,15,31,150,110,188
      console.log(pair.publicKey);

      // 16,178,46,190,137,179,33,55,11,238,141,57,213,197,212,17,218,241,232,252,145,201,209,83,64,68,89,15,31,150,110,188
      console.log(keyring.decodeAddress('5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ'));

      // 16,178,46,190,137,179,33,55,11,238,141,57,213,197,212,17,218,241,232,252,145,201,209,83,64,68,89,15,31,150,110,188
      console.log(keyring.decodeAddress('CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M'));

      // 16,178,46,190,137,179,33,55,11,238,141,57,213,197,212,17,218,241,232,252,145,201,209,83,64,68,89,15,31,150,110,188
      console.log(keyring.decodeAddress('1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h'));


      // 5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
      console.log(keyring.encodeAddress(pair.publicKey, 42));

      // CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M
      console.log(keyring.encodeAddress(pair.publicKey, 2));

      // 1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h
      console.log(keyring.encodeAddress(pair.publicKey, 0));
    },
    get3() {
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
      console.log('hexPair:', keyring)

      // generate a mnemonic with default params (we can pass the number
      //使用默认参数生成助记符（我们可以传递数字
      // of words required 12, 15, 18, 21 or 24, less than 12 words, while
      //需要12、15、18、21或24个单词，少于12个单词，而
      // valid, is not supported since it is more-easily crackable)
      //有效，不受支持，因为它更容易破解）
      const mnemonic = mnemonicGenerate();

      // create & add the pair to the keyring with the type and some additional
      //创建并将该对添加到带有类型和其他内容的钥匙圈中
      // metadata specified
      //指定的元数据
      const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');

      // the pair has been added to our keyring
      console.log(keyring.pairs.length, 'pairs available');

      // log the name & address (the latter encoded with the ss58Format)
      console.log(pair.meta.name, 'has address', pair.address);
    },
    get2() {
      // add a hex seed, 32-characters in length 添加十六进制种子，长度为32个字符
      const hexPair = this.keyring.addFromUri('0xef61b100a8d740bddebd0e6e5cf17788862f1d7f8dbe29a6227a310a91d7f697');
      console.log('hexPair:', hexPair)
      // add a string seed, internally this is padded with ' ' to 32-bytes in length  添加一个字符串种子，在内部用“”填充，长度为32字节
      const strPair = this.keyring.addFromUri('Janice');
      console.log('strPair:', strPair)
    },
    get1() {
      console.log('账户')
      // Create a keyring instance 创建密钥环实例
      // type: ed25519 sr25519 ed25519
      // const keyring = new Keyring({ type: 'ed25519' });
      const keyring = new Keyring({ type: 'sr25519' }); // 用此type创建的address与sdk的一致
      // const keyring = new Keyring({ type: 'ed25519' });
      console.log('keyring:', keyring);

      // Some mnemonic phrase  一些助记短语
      const PHRASE = 'lunar observe decide network during seek upon athlete swallow omit praise replace';
      // Add an account, straight mnemonic   添加帐户，直接助记符
      const newPair = this.keyring.addFromUri(PHRASE);
      console.log('newPair:', newPair);
      // (Advanced) add an account with a derivation path (hard & soft) （高级）添加带有派生路径的帐户（硬和软）
      const newDeri = this.keyring.addFromUri(`${PHRASE}//hard-derived/soft-derived`);
      console.log('newDeri:', newDeri);
      // (Advanced, development-only) add with an implied dev seed and hard derivation （高级，仅限开发）添加隐含的开发种子和硬派生
      const alice = this.keyring.addFromUri('//Alice', { name: 'Alice default' });
      console.log('alice:', alice);
      // Add our Alice dev account
      // const alice = this.keyring.addFromUri('//Alice', { name: 'Alice default' });

      // Log some info
      console.log(`${alice.meta.name}: has address ${alice.address} with publicKey [${alice.publicKey}]`);



      // Convert message, sign and then verify
      const message = stringToU8a('this is our message');
      console.log('message:', message);
      const signature = alice.sign(message);
      console.log('signature:', signature);
      const isValid = alice.verify(message, signature, alice.publicKey);
      console.log('isValid:', isValid);
      // Log info
      console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
    },
    getKeyring() {
      // const keyring = new Keyring({ type: 'ed25519' });
      const keyring = new Keyring({ type: 'sr25519' }); // 用此type创建的address与sdk的一致
      // const keyring = new Keyring({ type: 'ed25519' });
      console.log('keyring:', keyring);
      this.keyring = keyring;
    }
  },
  mounted() {
    this.api = window.api;
    if (this.api) {
      this.getKeyring();
    }
  }
}


</script>