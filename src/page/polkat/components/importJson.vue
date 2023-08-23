<template>

  <div>
    <Upload :before-upload="handleUpload" action="">
      <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
    </Upload>
    <div v-if="file !== null">Upload file: {{ file.name }}
      <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}
      </Button>
    </div>
    <Button type="primary" @click="fileUp">导入</Button>
  </div>
</template>
<script>
import { keyring } from '@polkadot/ui-keyring';
import {
  hexToU8a,
  u8aToString,
  isHex
} from '@polkadot/util';
const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';
const NOOP = () => undefined;

export default {
  data() {
    return {
      api: '',
      file: null,
      loadingStatus: false
    }
  },
  methods: {
    convertResult(result) {
      const data = new Uint8Array(result);
      // this converts the input (if detected as hex), via the hex conversion route
      if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
        let hex = u8aToString(data);
        while (hex[hex.length - 1] === STR_NL) {
          hex = hex.substr(0, hex.length - 1);
        }
        if (isHex(hex)) {
          return hexToU8a(hex);
        }
      }
      return data;
    },
    handleUpload(file) {
      this.file = file;
      console.log(file)
      const reader = new FileReader();
      reader.onabort = NOOP;
      reader.onerror = NOOP;
      reader.onload = ({ target }) => {
        if (target && target.result) {
          const name = file.name;
          const data = this.convertResult(target.result);
          console.log('data, name:',data, name)
          this.getFile(data)
        }
      };
      reader.readAsArrayBuffer(file);
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
    getFile(file) {
      const genesisHash = this.api.genesisHash.toHex()
      const pair = keyring.createFromJson(JSON.parse(u8aToString(file)), { genesisHash });
      console.log('pair:',pair)
      this.fileUp(pair);
      return pair;
    },
    fileUp(pair) {
      console.log('导入')
      const status = { action: 'restore' };
      const password = 'Tyasd369';
      // const pair = {} // 文件
      try {
        keyring.addPair(pair, password);
        status.status = 'success';
        status.account = pair.address;
        status.message = 'account restored';
        // InputAddress.setLastValue('account', pair.address);
      } catch (error) {
        // setPass((state: PassState) => ({ ...state, isPassValid: false }));
        status.status = 'error';
        status.message = error.message;
        console.error(error);
      }
      console.log(status);
      // setIsBusy(false);
      // onStatusChange(status);
    }
  },
  mounted() {
    console.log("mounted", window.api)
    this.api = window.api;
  }
}
</script>