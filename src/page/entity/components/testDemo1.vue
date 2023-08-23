<style scoped>
.page {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.page .left {
  width: 460px;
  flex: none;
  min-height: 500px;
  border-right: solid gray 1px;
  margin-right: 10px;
  padding-right: 6px;
}

.page .right {
  flex: auto;
}
.page .right .content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
<style>
.page .ivu-select-dropdown {
  max-height: 450px;
}

.jv-node {
  font-size: 14px;
  padding: 3px 5px 3px 20px;
  border-left: 1px solid rgb(235, 235, 235);
}
.open {
  color: rgb(88, 110, 117);
}
.jv-string {
  color: rgb(203, 75, 22);
}
.jv-key {
  margin-right: 5px;
}
.jv-node.jv-key-node {
  margin-left: 6px;
}
.jv-code > .jv-node {
  padding-left: 5px;
  border-left: none;
}
.jv-node.toggle {
  margin-left: 5px !important;
}
.jv-container .jv-code {
  padding-left: 0px;
}
</style>
<template>
  <div style="width: 98%;margin: 0 auto;text-align:left;">
    <div class="page">
      <div class="left">
        <Input v-model="str"
               placeholder="过滤"
               style="width:40%;margin-right:6px;" />
        <Select v-model="ticker"
                placeholder="名下的资产ticker"
                style="width:28%;margin-right:6px;">
          <Option v-for="item in assetsList"
                  :value="item.ticker"
                  :key="item.ticker"
                  :label="item.ticker ">
          </Option>
        </Select>
        <Input v-model="ticker"
               style="width:22%;margin-right:6px;"
               placeholder="任意资产ticker" />
        <Icon type="md-checkmark-circle"
              v-show="api"
              @click="getAssetsList"
              color="#19be6b"
              size="18"
              style="cursor:pointer;"
              title="连接成功" />
        <div v-show="totalNumber"
             style="margin-top:10px;color:gray">共 {{ totalNumber }} 处结果</div>

        <Tree :data="filterData"
              style="max-height:460px;overflow:auto;margin-top:10px;"
              @on-select-change="selectNode"
              ref="tree"></Tree>
        <div style="margin-top:12px;margin-bottom:6px;display:flex;justify-content: space-between;align-items: center;">
          <div style="font-weight:700;">实体数据</div>
          <div v-show="currentEntityTypeIsArr || typeof getEntityFun==='function'"
               style="display:flex;justify-content: space-between;align-items: center;">
            <span>选择第几条实体数据：</span>
            <Select v-model="number"
                    style="width:120px;"
                    @on-change="changeNumber">
              <Option v-for="item in currentEntityTypeIsLengthArr"
                      :key="item"
                      :value="item"
                      :label="item"></Option>
            </Select>
          </div>
        </div>
        <json-viewer :value="currentEntity"
                     expanded
                     :expand-depth="1"
                     copyable
                     boxed
                     sort></json-viewer>
      </div>
      <div class="right">
        <div style="margin-bottom:6px;">
          <span style="font-size:18px;font-weight:700;"> 当前实体：</span> {{ selectedObj.title || '待选' }}
          <span style="font-size:18px;font-weight:700;margin-left:20px;">方法：</span>{{ selectFun || '待选' }}
        </div>
        <div class="content">
          <Button type="primary"
                  @click="executionMethod"
                  :disabled="!selectFun"
                  style="flex:none;margin: 0;"
                  :loading="loading">执行方法</Button>
          <Select v-model="selectFun"
                  style="flex:auto;margin-left:6px;"
                  @on-change="changeFun"
                  filterable>
            <Option v-for="item in selectedObj.methods"
                    :value="item.value"
                    :key="item.value"
                    :title="item.description"
                    :label="item.title">
              <span v-html="item.title"></span>
              <span v-show="item.available"
                    style="margin-left:16px;">
                <Icon type="md-checkmark-circle"
                      color="#19be6b"
                      size="18" />
              </span>
            </Option>
          </Select>
        </div>

        <div style="margin-top:12px;margin-bottom:6px;"> 是否入参：
          <i-Switch v-model="isParams"
                    :disabled="this.currentFunObj.isOptionRequired">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-Switch>
        </div>
        <div>
          <Input v-if="!isTypeParamsFunction" v-model="paramsObj"
                 type="textarea"
                 :rows="4"
                 placeholder="Enter something..." />
          <json-viewer v-else :value="paramsObj"
                       expanded
                       :expand-depth="1"
                       copyable
                       boxed
                       sort></json-viewer>
        </div>
        <div style="margin-top:12px;margin-bottom:6px;">
          结果：
          <Input v-model="entityFilterStr"
                 v-show="isEntity"
                 style="display: inline-block;width: 200px;margin-left: 50px;margin-right: 10px;"
                 placeholder="多个用空格分隔" />
          <Button type="primary"
                  v-show="isEntity"
                  @click="setEntityToLeft">将查询到的实体对应到左侧</Button>

        </div>
        <json-viewer :value="result"
                     expanded
                     :expand-depth="2"
                     copyable
                     boxed
                     sort></json-viewer>

      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js';
import data from "../../../components/entity";
import {
  throttle,
  cloneDeep
} from 'lodash'
export default {
  components: {},
  data () {
    return {
      loading: false,
      str: '',
      ticker: '',
      data: this.setDate(),
      selectFun: '',
      selectedObj: {},
      result: '无数据',
      entityFilterStr: '',
      currentEntity: '暂无数据', // 当前实体数据
      currentEntityTypeIsArr: false, // 当前实体是否是数组
      currentEntityTypeIsLengthArr: [], // 实体为数组时，长度数组
      number: '0', // 当实体是数组，选择第几条数据
      // selectEntity:null, // 当实体是数组，
      currentFunObj: {}, // 当前方法对象
      paramsObj: '',
      isParams: false, // 是否入参
      assetsList: [],
      getEntityFun: null,
      totalNumber: 0,
      isTypeParamsFunction:false
    };
  },
  computed: {
    api () {
      console.log('-------11------------')
      const api = this.apiFun();
      return api;
    },
    filterData () {
      return this.filterFun()
    },
    isEntity () {
      const f = (obj) => {
        if (obj && typeof obj === 'object') {
          return true;
        }
        return false;
      }
      if (Array.isArray(this.result)) { // 数组
        return f(this.result[this.entityFilterStr])
      } else {
        return f(this.result)
      }
    }
  },
  watch: {
    api: {
      // deep: true,
      handler () {
        console.log('-------3------------')
        this.getAssetsList()
      }
    }
  },
  methods: {
    setEntityToLeft () {
      let entityObj;
      if (!this.entityFilterStr) {
        entityObj = this.result
      } else {
        this.entityFilterStr.split(' ').forEach((item, index) => {
          if (index === 0) {
            entityObj = this.result[item];
          } else {
            entityObj = entityObj[item]
          }
        })
      }
      console.log('选中的实体：', entityObj)
      const isEntity = (obj) => {
        const cnstor = obj.constructor;
        if (obj && typeof obj === 'object' && typeof cnstor === 'function' && cnstor.name !== 'Object' && cnstor.name !== 'bignumber') {
          return true;
        }
        return false;
      }
      if (!isEntity(entityObj)) {
        this.$Message.warning('当前操作的不是实体，请重新选择');
        return;
      }
      const name = entityObj.constructor.name.toLowerCase();
      console.log('实体name：', name)
      let flag = false;
      let f = (arr) => {
        arr.forEach(item => {
          if (item.value.toLowerCase() === name) {
            this.selectedObj = item;
            this.currentEntity = entityObj;
            item.expand = true
            flag = true;
          } else if (item.children.length > 0) {
            f(item.children)
          }
        })
      }
      f(this.data)
      if (!flag) {
        this.$Message.warning('没有找到该实体');
      }
    },
    filterFun: throttle(function () {
      this.totalNumber = 0
      if (!this.str) {
        return this.data;
      } else {
        const str = this.str.toLowerCase();
        const f = (arr) => {
          const newArr = []
          cloneDeep(arr).forEach(item => {
            if (item.title.toLowerCase().indexOf(str) > -1) {
              item.title = item.title.replace(new RegExp(str, 'g'), `<span style="background:yellow;">${str}</span>`);
              newArr.push(item)
              this.totalNumber++
              // } else if (item.description.toLowerCase().indexOf(str) > -1) {
              //   newArr.push(item)
              //   this.totalNumber++
            } else {
              let methodArr = []
              if (item.methods.length > 0) {
                methodArr = item.methods.filter(it => {
                  if (it.title.toLowerCase().indexOf(str) > -1
                    // || it.description.toLowerCase().indexOf(str) > -1
                  ) {
                    it.title = it.title.replace(new RegExp(str, 'g'), `<span style="background:yellow;">${str}</span>`);
                    this.totalNumber++
                    return true;
                  }
                  return false
                })
              }
              let childrenArr = [];
              if (item.children.length > 0) {
                item.expand = true;
                childrenArr = f(item.children)
              }
              if (methodArr.length > 0 || childrenArr.length > 0) {
                newArr.push(Object.assign(item, { methods: methodArr, children: childrenArr }))
              }
            }
          })
          return newArr
        }
        return f(this.data)
      }
    }, 100),
    changeNumber (val) {
      if (typeof this.getEntityFun === 'function') {
        this.currentEntity = this.getEntityFun(val)
        window.source = this.currentEntity;
        console.log(`当前实体是通过数组得到的，默认取下标为 0 拿到的实体，执行方法，获取下标为 ${val} 的数据：`, this.currentEntity)
      }
    },
    setDate () {
      const f = (arr) => {
        arr.forEach(item => {
          item.expand = false;
          // { root, data, node }
          item.render = (h, { data }) => {
            return h('span', {}, [
              h('span', {
                attrs: {
                  title: data.description,//title显示内容
                },
                domProps: {
                  innerHTML: data.title // 这里是要渲染的数据
                }
              }),
              h('Icon', {
                props: {
                  type: 'md-checkmark-circle'
                },
                style: {
                  marginLeft: '8px',
                  fontSize: '18px',
                  color: "#19be6b",
                  display: this.selectedObj.value === data.value ? 'inline-block' : 'none'
                }
              })
            ])
          }
          if (item.children.length > 0) {
            f(item.children)
          }
        })
      }
      f(data)
      return data;
    },
    async getAssetsList () {
      if (!this.api) {
        return;
      }
      this.assetsList = await this.api.assets.getAssets()
      console.log('-------------------')
      this.ticker = this.assetsList[0].ticker
    },
    async changeFun (val) {
      if (!val) {
        return;
      }
      this.selectFun = val;
      this.currentFunObj = this.selectedObj.methods.filter((item) => item.value === val)[0]
      console.log('当前选中方法：', this.currentFunObj)

      if (this.currentFunObj.options instanceof Function) {
        this.isTypeParamsFunction = true;
        console.log('我是一个function', this.currentFunObj.options)
        const aa = await this.currentFunObj.options(this.api)
        console.log('function:', aa)
        this.paramsObj = aa || 'null'
      } else {
        this.isTypeParamsFunction = false;
        this.paramsObj = JSON.stringify(this.currentFunObj.options, false, 2)
      }


      this.isParams = this.currentFunObj.isOptionRequired || false
    },
    async executionMethod () { // 执行方法
      this.entityFilterStr = ''
      this.loading = true;
      try {
        console.log('执行方法：', this.selectFun)
        this.result = '方法执行中，请稍后...'
        let result;
        let currentEntity;
        // 当前实体为数组的时候，需要选择其中一条
        if (this.currentEntityTypeIsArr) {
          currentEntity = this.currentEntity[parseInt(this.number)];
        } else {
          currentEntity = this.currentEntity;
        }
        if (this.isParams) {
          // 当key为数组中的某一项且值为number类型，则值转BigNumber类型
          const keyArr = ['originPortfolio', 'id', 'size', 'amount', 'venueId', 'percentage', 'perShare', 'maxAmount', 'portfolioId', 'portfolio', 'allowance','corporateAction']
          let params;
          if(typeof this.paramsObj==='string'){
            params = JSON.parse(this.paramsObj)
          }else{
            params = this.paramsObj
          }
          
          if (params instanceof Array) { // 数组
            params.claims.forEach(item => {
              for (let key in item) {
                if ((key === 'expiry'|| key==='requestExpiry') && item[key]) {
                  item[key] = new Date(item[key])
                }
                if (keyArr.indexOf(key) > -1 && typeof params[key] === 'number') {
                  params[key] = new BigNumber(params[key])
                }
              }
            })
          } else {
            for (let key in params) {
              if ((key === 'expiry'|| key==='requestExpiry') && params[key]) {
                params[key] = new Date(params[key])
              }
              if (keyArr.indexOf(key) > -1 && typeof params[key] === 'number') {
                params[key] = new BigNumber(params[key])
              }
            }
          }
          console.log('入参：', params)
          result = await currentEntity[this.selectFun](params)
        } else {
          result = await currentEntity[this.selectFun]()
        }
        console.log('查询结果：', result)
        if (this.selectFun === 'connect') {
          console.log('链接：')
        } else if (this.selectFun === 'disconnect') {
          console.log('断开链接：')
        } else if (result === null) {
          this.result = '没有查到数据，结果为null';
        } else if (result === undefined) {
          this.result = '执行成功！';
        } else if (typeof result === 'string' || typeof result === 'boolean') {
          this.result = result;
        } else if ('hasRun' in result && !result.hasRun) {
          console.log('开始签名。。。', result)
          const runResult = await result.run()
          console.log('签名成功！', runResult)
          this.result = runResult || '执行成功';
        } else {
          this.result = result || '暂无数据';
        }
        window.result = result
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false;
      }
    },
    selectNode ([obj]) {
      console.log('selectNode:', obj)
      if (!obj) {
        if (JSON.stringify(this.selectedObj) === '{}') {
          this.$Message.warning('请重新选择实体！');
          return;
        }
        obj = this.selectedObj
      }
      this.selectedObj = obj
      this.selectFun = ''
      this.getCurrentEntity()
    },
    async getCurrentEntity () {
      if (!this.api) {
        this.$Message.warning('请稍后再试，登录中....');
        return;
      }
      if (!this.ticker) {
        console.log('-------1------------')
        await this.getAssetsList()
      }
      this.currentEntity = '实体查询中...'
      try {
        let source = await this.selectedObj.source({ api: this.api, ticker: this.ticker, number: parseInt(this.number) })
        this.currentEntityTypeIsArr = source instanceof Array;
        if (this.currentEntityTypeIsArr) { // 数组 查询回来的实体数据是数组
          const arr = []
          for (let i = 0; i < source.length; i++) {
            arr.push(i + '')
          }
          this.currentEntityTypeIsLengthArr = arr;
          this.number = '0'
        }
        if (source && typeof source === 'object' && 'fn' in source && typeof source.fn === 'function' && typeof source.totalLength === 'number') {
          const arr = []
          for (let i = 0; i < source.totalLength; i++) {
            arr.push(i + '')
          }
          this.currentEntityTypeIsLengthArr = arr;
          this.getEntityFun = source.fn;
          let currentEntity = this.getEntityFun(parseInt(this.number))
          if (currentEntity instanceof Date) {
            console.log('返回的实体是Date类型：', currentEntity)
            this.currentEntity = JSON.stringify(currentEntity);
          } else {
            this.currentEntity = currentEntity;
          }
          window.source = currentEntity;
          console.log('执行方法,拿到当前实体：', this.selectedObj.title, currentEntity)
          return;
        }
        if (source instanceof Date) {
          source = JSON.stringify(source)
        }
        this.currentEntity = source || '没有查到数据'
        window.source = source
        console.log('执行方法,拿到当前实体：', this.selectedObj.title, source)
        this.getEntityFun = null;
      } catch (e) {
        this.currentEntity = e.toString()
      }

    },
    action () {
      const account = this.api.accountManagement.getSigningAccount();
      console.log("address: ", account.address);
    },
  },
  inject: ["apiFun"],
  mounted () {
    if (!this.ticker) {
      console.log('-------2------------')
      this.getAssetsList()
    }
  }
};
</script>
