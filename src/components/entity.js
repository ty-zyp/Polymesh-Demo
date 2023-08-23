import { addClaimsOption, revokeClaimsOption, editClaimsOption, modifyPermissionsOption, offeringsLanchOptionFun } from './entityParams'
import { assetPermissionsMethods, IdentityAuthorizations, Portfolios, AccountAuthorizations } from './entityMethods'
import { Polymesh } from '@polymeshassociation/polymesh-sdk'
import { BrowserExtensionSigningManager } from "@polymeshassociation/browser-extension-signing-manager";
import { BigNumber } from '@polymeshassociation/polymesh-sdk';
import {
  OfferingBalanceStatus,
  OfferingSaleStatus,
  OfferingTimingStatus,
} from '@polymeshassociation/polymesh-sdk/types';
const signingManager = async () => {
  const signingManager = await BrowserExtensionSigningManager.create({
    appName: "Demo",
    extensionName: "polywallet",
  }); // The Polymesh wallet extension will ask the user to authorize MY_APP_NAME for access
  return signingManager
}

const data = [
  {
    value: "Polymesh",
    title: "Polymesh",
    description: "机构级区块链",
    source: async function ({ api }) {
      console.log('--', this)
      if (api) {
        return api
      }
      const connect = () => {
        return Polymesh.connect(
          this.methods[7].options
        )
      }
      api = await connect();
      return api
    },
    methods: [
      {
        value: 'createTransactionBatch', title: 'createTransactionBatch	创建事务批处理', description: '从单独交易记录列表创建批处理事务。该列表也可以包含批处理事务。 运行此事务的结果将是列表中每个事务的结果的数组，顺序相同。 没有返回值的事务将在结果数组中生成undefined', options: {
          transactions: ['待执行run方法1', '待执行run方法2']
        },
        available: true, isOptionRequired: true
      },
      { value: 'disconnect', title: 'disconnect	断开', description: '断开客户端连接并关闭所有打开的连接和订阅', options: {}, available: true, isOptionRequired: false },
      { value: 'getSigningIdentity', title: 'getSigningIdentity	获取签名身份', description: '检索与签名帐户关联的标识（如果没有，则为 null）', options: {}, available: true, isOptionRequired: false },
      { value: 'onConnectionError', title: 'onConnectionError	连接错误', description: '处理连接错误', options: {}, available: false, isOptionRequired: false },
      { value: 'onDisconnect', title: 'onDisconnect	断开连接', description: '手柄断开', options: {}, available: false, isOptionRequired: false },
      { value: 'setSigningAccount', title: 'setSigningAccount	设置签名账户', description: '将 SDK 的签名帐户设置为提供的帐户', options: '5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS', available: true, isOptionRequired: true },
      { value: 'setSigningManager', title: 'setSigningManager	设置签名管理器', description: '将 SDK 的签名管理器设置为提供的签名管理器', options: {}, available: false, isOptionRequired: false },
      {
        value: 'connect', title: 'connect	连接', description: '创建开发工具包实例并连接到多边形网格节点', options: {
          nodeUrl: "wss://testnet-rpc.polymesh.live",
          signingManager: signingManager(),
          middleware: {
            link: "https://testnet-graphql.polymesh.live",
            key: "deprecated",
          },
        }, available: true, isOptionRequired: true
      },
    ],
    children: [
      {
        value: "accountManagement", title: "accountManagement	帐户管理", description: "一组用于管理 Polymesh 身份帐户及其权限的方法", source: async ({ api }) => { return api.accountManagement },
        methods: [
          {
            value: "createMultiSigAccount",
            title: "createMultiSigAccount	创建多重签名账户",
            description:
              "创建多签账户|这将为每个签名帐户创建一个授权请求，必须先接受该请求，然后才能批准交易。接受授权时，任何签名帐户都不能与身份关联 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。",
            options: {
              requiredSignatures: new BigNumber(1),
              signers: ['address账号'],
              说明: 'requiredSignatures小于等于signers数组长度'
            },
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "freezeSecondaryAccounts",
            title: "freezeSecondaryAccounts	冻结二级账户",
            description:
              "冻结签名标识中的所有辅助帐户。这意味着撤销他们在区块链上执行任何操作的权限并冻结他们的资金，直到账户通过解冻二级账户解冻|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 freezeSecondaryAccounts.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限",
            options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
          {
            value: "getAccount",
            title: "getAccount	获取帐户",
            description: "从地址返回账户实例。如果帐户具有多重签名者，则返回的值将是多重签名实例",
            options: { address: '' },
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "getAccountBalance", title: "getAccountBalance	获取帐户余额", description: "获取账户的可用/锁定 POLYX 余额|可以订阅", options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须 
          },
          {
            value: "getSigningAccount",
            title: "getSigningAccount	获取签名帐户",
            description: "返回签名帐户，如果未设置签名帐户，则返回 null",
            options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
          {
            value: "getSigningAccounts",
            title: "getSigningAccounts	获取签名帐户",
            description: "返回一个列表，其中包含与 SDK 实例的签名管理器关联的所有签名帐户",
            options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
          {
            value: "inviteAccount",
            title: "inviteAccount	邀请帐户",
            description:
              "向帐户发送邀请以将签名标识作为辅助帐户加入|这将创建一个授权请求，该请求必须由 接受。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。targetAccount",
            options: {
              expiry: '2022-12-21 17:30',
              permissions: null,
              targetAccount: '5G1MrwmAuY91yXDBPvhBghxja9XTwUZCd2oEVJKtoYKiVoh3'
            },
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "leaveIdentity",
            title: "leaveIdentity	离开身份",
            description: "取消签名帐户与其标识的关联。仅当签名帐户是辅助帐户时，才能执行此操作",
            options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
          {
            value: "modifyPermissions", title: "modifyPermissions	修改权限", description: "修改与签名标识关联的辅助帐户列表的所有权限", options: modifyPermissionsOption,
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "removeSecondaryAccounts",
            title: "removeSecondaryAccounts	删除辅助帐户",
            description: "删除与签名标识关联的辅助帐户列表",
            options: {
              accounts: 'address账号'
            },
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
          {
            value: "revokePermissions", title: "revokePermissions	撤销权限", description: "撤销与签名标识关联的辅助帐户列表的所有权限", options: {
              secondaryAccounts: 'address账户',
            },
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "subsidizeAccount",
            title: "subsidizeAccount	补贴账户",
            description:
              "向账户发送授权请求以补贴其交易费用|这将创建一个必须被帐户接受的授权请求。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。beneficiary",
            options: {
              allowance: 150,
              beneficiary: 'address',
            },
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
          },
          {
            value: "unfreezeSecondaryAccounts",
            title: "unfreezeSecondaryAccounts	解冻二级账户",
            description: "解冻签名标识中的所有辅助帐户。这将恢复其冻结前的权限",
            options: {},
            available: true, // 此方法是否可用
            isOptionRequired: false, // 入参是否必须
          },
        ],
        children: [],
      },
      {
        value: "assets", title: "assets	资产", description: "一组用于与资产交互的方法",
        source: async ({ api }) => { return api.assets },
        methods: [
          {
            value: 'claimClassicTicker', title: 'claimClassicTicker	证书ClassicTicker', description: '领取在博学经典（以太坊）中保留的股票代码。以太坊账户 拥有股票代码的人必须签署一条特殊消息，其中包含将拥有股票代码的身份的 DID ，并将签名数据提供给此调用', options: {},
            available: false, isOptionRequired: false
          },
          {
            value: 'createAsset', title: 'createAsset	创建资产', description: '创建资产 | 如果已保留股票代码，则所需角色：股票代码所有者', options: {
              ticker: '股票代码',
              name: '股票名称',
              assetType: "EquityPreferred",
              isDivisible: false,
              // documents: [], // 资产文件 optional（可选）
              // fundingRound: '',// 指定资金轮次（可选）
              // initialStatistics: [], // 初始统计 optional（可选）
              // initialSupply: new BigNumber(0), // 初始资金（可选）
              // requireInvestorUniqueness: false, // 需求投资者唯一性声明（可选）
              // securityIdentifiers: [], // 资产声明 （可选）
            }, available: true, isOptionRequired: true
          },
          { value: 'get', title: 'get	收到', description: '检索链上的所有资产', options: {}, available: true, isOptionRequired: false },
          { value: 'getAsset', title: 'getAsset	获取资产', description: '检索资产', options: { ticker: 'TY001' }, available: true, isOptionRequired: true },
          { value: 'getAssets', title: 'getAssets	获取资产', description: '检索身份拥有的所有资产', options: {}, available: true, isOptionRequired: false },
          { value: 'getTickerReservation', title: 'getTickerReservation	获取票务预订', description: '检索代码保留', options: { ticker: 'TY001' }, available: true, isOptionRequired: true },
          { value: 'getTickerReservations', title: 'getTickerReservations	获取票务预订', description: '检索身份当前拥有的所有股票代码保留。这不包括已经启动的资产|代码中包含不可读字符的预订将被排除在外', options: {}, available: true, isOptionRequired: false },
          { value: 'isTickerAvailable', title: 'isTickerAvailable	可用票务', description: '检查代码是否未被保留|可以订阅', options: { ticker: 'TY001' }, available: true, isOptionRequired: true },
          { value: 'reserveTicker', title: 'reserveTicker	保留Ticker', description: '在签名身份的所有权下保留一个股票代码，以便以后在创建资产时使用。代码将在设定的时间后过期，之后其他用户可以保留它', options: { ticker: 'TY001' }, available: true, isOptionRequired: true },
        ],
        children: [],
      },
      {
        value: "claims", title: "claims	证书", description: "处理证书的一组方法",
        source: async ({ api }) => {
          return api.claims
        },
        methods: [
          {
            value: "addClaims",
            title: "addClaims	添加证书",
            description: "向身份添加声明|所需角色：客户尽职调查提供商：如果参数中至少有一项 CDD 声明",
            available: true, // 此方法是否可用
            isOptionRequired: true, // 入参是否必须
            options: addClaimsOption,
          },
          {
            value: "addInvestorUniquenessClaim",
            title: "addInvestorUniquenessClaim	添加投资者唯一性声明",
            description: "向签名身份添加投资者唯一性声明",
            options: {},
            available: false,
            isOptionRequired: false,
          },
          {
            value: "editClaims",
            title: "editClaims 编辑证书",
            description: '"编辑与身份关联的声明（只能修改到期日期）|所需角色：客户尽职调查提供商：如果参数中至少有一项 CDD 声明"',
            available: true,
            isOptionRequired: true,
            options: editClaimsOption,
          },
          { value: "getCddClaims", title: "getCddClaims	获取CddClaims", description: "检索目标身份的 CDD 声明列表", options: {}, available: true },
          {
            value: "getClaimScopes",
            title: "getClaimScopes	获取证书范围",
            description: "检索已为目标身份提出声明的所有范围。如果范围是资产 DID，则也返回相应的代码",
            options: { target: '' },
            available: true,
            isOptionRequired: false,
          },
          {
            value: "getIdentitiesWithClaims",
            title: "getIdentitiesWithClaims	获取带有声明的标识",
            description: "检索具有关联声明的身份列表。可以使用参数过滤|支持分页|使用中间件",
            options: {},
            available: true,
            isOptionRequired: false,
          },
          {
            value: "getIdentitiesWithClaimsV2",
            title: "getIdentitiesWithClaimsV2	获取带有声明的标识V2",
            description: "检索具有关联声明的身份列表。可以使用参数过滤|支持分页|使用中间件V2",
            options: {},
            available: false,
            isOptionRequired: false,
          },
          {
            value: "getInvestorUniquenessClaims",
            title: "getInvestorUniquenessClaims	获取投资者唯一性声明",
            description: "检索目标身份的 InvestorUniqueness 声明列表",
            options: {},
            available: true,
            isOptionRequired: false,
          },
          {
            value: "getIssuedClaims",
            title: "getIssuedClaims	获取已发布的证书",
            description: "检索身份发出的所有声明|支持分页|使用中间件",
            options: {
              includeExpired: true,
              target: 'did账户'
            },
            available: true,
            isOptionRequired: false,
          },
          {
            value: "getIssuedClaimsV2",
            title: "getIssuedClaimsV2	获取已发布的证书V2",
            description: "检索身份发出的所有声明|支持分页|使用中间件V2",
            options: {},
            available: false,
            isOptionRequired: false,
          },
          {
            value: "getTargetingClaims",
            title: "getTargetingClaims	获取目标声明",
            description: "检索有关身份的所有声明，按声明发布者分组|支持分页|使用中间件（可选）",
            options: {},
            available: true,
            isOptionRequired: false,
          },
          {
            value: "getTargetingClaimsV2",
            title: "getTargetingClaimsV2	获取目标证书V2",
            description: "检索有关身份的所有声明，按声明发布者分组|支持分页|使用中间件（可选）|支持分页|使用 middlewareV2（可选）",
            options: {},
            available: false,
            isOptionRequired: false,
          },
          {
            value: "revokeClaims",
            title: "revokeClaims	撤销",
            description: "撤销身份声明|所需角色：客户尽职调查提供商：如果参数中至少有一项 CDD 声明",
            available: true,
            isOptionRequired: true,
            options: revokeClaimsOption,
          },
        ],
        children: []
      },
      {
        value: "identities", title: "identities	身份", description: "一组用于与多边形网格标识交互的方法。",
        source: async ({ api }) => {
          return api.identities
        },
        methods: [
          { value: 'createPortfolio', title: 'createPortfolio	创建投资组合', description: '在签名身份的所有权下创建新的投资组合', options: { name: 'tianying_bbb' }, available: true, isOptionRequired: true },
          { value: 'createPortfolios', title: 'createPortfolios	创建投资组合', description: '在签名标识的所有权下创建一组新产品组合', options: { names: ['tianying_ccc', 'tianying_ddd'] }, available: true, isOptionRequired: true },
          { value: 'getIdentity', title: 'getIdentity	获取身份', description: '从 DID 创建身份实例', options: { did: 'did账户' }, available: true, isOptionRequired: true },
          { value: 'isIdentityValid', title: 'isIdentityValid	isIdentityValid', description: '返回提供的标识/DID 是否存在', options: { identity: 'did账号' }, available: true, isOptionRequired: true },
          {
            value: 'registerIdentity', title: 'registerIdentity	注册标识', description: '注册身份|必须是 CDD 提供商|这可能会创建必须由 接受的授权请求。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。targetAccount|所需角色：客户尽职调查提供商', options: {
              secondaryAccounts: '',
              targetAccount: 'address账户'
            }, available: false, isOptionRequired: true
          },
        ],
        children: [],
      },
      {
        value: "network", title: "network	网络", description: "一组与Polymesh网络交互的方法。这包括传输 POLYX、读取网络属性和查询历史事件",
        source: async ({ api }) => { return api.network },
        methods: [
          { value: 'getEventByIndexedArgs', title: 'getEventByIndexedArgs	按索引参数获取事件', description: '通过任何索引参数检索单个事件。可以使用参数进行过滤|使用中间件', options: { eventId: 'AllGood', moduleId: 'Asset' }, available: false, isOptionRequired: true },
          { value: 'getEventByIndexedArgsV2', title: 'getEventByIndexedArgsV2	按索引参数V2获取事件', description: '通过任何索引参数检索单个事件。可以使用参数进行过滤|使用中间件V2', options: { eventId: 'AllGood', moduleId: 'Asset' }, available: false, isOptionRequired: true },
          { value: 'getEventsByIndexedArgs', title: 'getEventsByIndexedArgs	按索引参数获取事件', description: '检索事件列表。可以使用参数进行过滤|使用中间件', options: { eventId: 'AllGood', moduleId: 'Asset' }, available: false, isOptionRequired: true },
          { value: 'getEventsByIndexedArgsV2', title: 'getEventsByIndexedArgsV2	按索引参数获取事件V2', description: '检索事件列表。可以使用参数进行过滤|使用中间件V2', options: { eventId: 'AllGood', moduleId: 'Asset' }, available: false, isOptionRequired: true },
          { value: 'getLatestBlock', title: 'getLatestBlock	获取最新块', description: '检索链中最新最终区块的编号', options: {}, available: true, isOptionRequired: false },
          { value: 'getNetworkProperties', title: 'getNetworkProperties	获取网络属性', description: '检索当前网络的信息', options: {}, available: true, isOptionRequired: false },
          {
            value: 'getProtocolFees', title: 'getProtocolFees	获取协议费用', description: '检索与运行特定事务相关的协议费用', options: {
              tags: ['BabeTx']
            }, available: true, isOptionRequired: true
          },
          { value: 'getSs58Format', title: 'getSs58Format	getSs58格式', description: '检索链的 SS58 格式', options: {}, available: true, isOptionRequired: false },
          { value: 'getTransactionByHash', title: 'getTransactionByHash	按哈希获取事务', description: '通过哈希检索事务', options: { txHash: '事物的hash' }, available: false, isOptionRequired: true },
          { value: 'getTransactionByHashV2', title: 'getTransactionByHashV2	按哈希V2获取事务', description: '通过哈希检索事务|使用中间件V2', options: { txHash: '事物的hash' }, available: false, isOptionRequired: true },
          { value: 'getTreasuryAccount', title: 'getTreasuryAccount	获取宝藏帐户', description: '获取国库钱包地址', options: {}, available: true, isOptionRequired: false },
          { value: 'getTreasuryBalance', title: 'getTreasuryBalance	获取资金余额', description: '获取国库POLYX余额|可以订阅', options: {}, available: true, isOptionRequired: false },
          { value: 'getVersion', title: 'getVersion	获取版本', description: '获取当前网络版本（例如 3.1.0）', options: {}, available: true, isOptionRequired: false },
          {
            value: 'transferPolyx', title: 'transferPolyx	转移PolyX', description: '将 POLYX 金额转入指定账户', options: {
              amount: 78,
              memo: '2222',
              to: '5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi', // tianying
            }, available: true, isOptionRequired: true
          },
        ],
        children: [],
      },
      {
        value: "settlements", title: "settlements	结算", description: "一组用于交换资产的方法", source: async ({ api }) => { return api.settlements },
        methods: [
          {
            value: 'addInstruction', title: 'addInstruction	添加指令', description: '创建交换资产的指令|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 addInstruction .checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {
              legs: [
                {
                  to: '5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS',
                  from: '0xb0575e10e20f344e1d4d832ab500fd96ef69759d625dd46eebb5677f2d95a7d1', // 投资组合也行
                  amount: 100,
                  asset: 'TY001'
                }
              ],
              venueId: 0
            }, available: true, isOptionRequired: true
          },
          {
            value: 'affirmInstruction', title: 'affirmInstruction	确认指令', description: '确认指示（授权）| 此方法的类型为 ProcedureMethod，这意味着您可以对其调用 affirmInstruction .checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限',
            options: { id: '指令id' }, available: true, isOptionRequired: true
          },
          {
            value: 'createVenue', title: 'createVenue	创建场地', description: '在签名身份的所有权下创建场所 | 此方法的类型为 ProcedureMethod，这意味着您可以对其调用 createVenue.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {
              description: 'ty01 Venue',
              type: 'Distribution',
            }, available: true, isOptionRequired: true
          },
          { value: 'getInstruction', title: 'getInstruction	获取指令', description: '按指令的 ID 检索指令', options: {}, available: true, isOptionRequired: false },
          {
            value: 'getVenue', title: 'getVenue	获取场地', description: '按 ID 检索场地', options: {
              id: '场地id'
            }, available: true, isOptionRequired: true
          },
        ],
        children: [],
      },
    ],
  }
];

const Account = {
  value: "Account",
  title: "Account 签名账户",
  description: "签名账户信息",
  source: async ({ api }) => {
    const account = await api.accountManagement.getSigningAccount()
    return account
  },
  methods: [
    {
      value: 'checkPermissions', title: 'checkPermissions	检查权限', description: '检查此帐户是否拥有代表其相应身份执行操作的某些权限', options: async (api) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolios()
        return {
          portfolios: defaultPor
        }
      }, available: true, isOptionRequired: true
    },
    { value: 'exists', title: 'exists	存在', description: '确定此账户是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'getBalance', title: 'getBalance	获取余额', description: '获取帐户的可用/锁定的POLYX余额|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getCurrentNonce', title: 'getCurrentNonce	获取当前随机数', description: '检索此帐户的当前随机数', options: {}, available: true, isOptionRequired: false },
    { value: 'getIdentity', title: 'getIdentity	获取身份', description: '检索与此帐户关联的标识（如果没有，则为 null）', options: {}, available: true, isOptionRequired: false },
    { value: 'getMultiSig', title: 'getMultiSig	获取多签', description: '获取此帐户所属的多重签名。如果此帐户不是任何多重签名的签名者，则返回 null', options: {}, available: true, isOptionRequired: false },
    { value: 'getPermissions', title: 'getPermissions	获取权限', description: '检索此帐户作为其相应标识的权限帐户的权限', options: {}, available: true, isOptionRequired: false },
    { value: 'getSubsidy', title: 'getSubsidy	获得补贴', description: '获取此账户和补贴账户的补贴余额。如果 此帐户未获得补贴，返回空值|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getTransactionHistory', title: 'getTransactionHistory	获取交易历史记录', description: '检索此帐户签名的交易列表。可以使用参数进行过滤|如果两者都通过，则仅考虑blockNumberblockHashblockNumber|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'getTransactionHistoryV2', title: 'getTransactionHistoryV2	获取交易历史记录V2', description: '检索此帐户签名的交易列表。可以使用参数进行过滤|如果两者都通过，则仅考虑blockNumberblockHashblockNumber|使用中间件V2', options: {}, available: false, isOptionRequired: false },
    { value: 'hasPermissions', title: 'hasPermissions	有权限', description: '检查此帐户是否拥有代表其相应身份执行操作的某些权限', options: {}, available: false, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isFrozen', title: 'isFrozen	是否冻结', description: '检查此帐户是否被冻结。如果冻结，则在身份的主帐户解冻所有辅助帐户之前，它无法执行任何与身份相关的操作', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回帐户地址', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'address', title: 'address	地址', description: '',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        return account.address
      },
      methods: [], children: []
    },
    {
      value: 'authorizations', title: 'authorizations	授权', description: '',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        return account.authorizations
      },
      methods: AccountAuthorizations, children: []
    },
    {
      value: 'key', title: 'key	.key', description: '帐户的加密公钥的十六进制表示形式。这是一致的 基板链，而地址也取决于链。',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        return account.key
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        return account.uuid
      }, methods: [], children: []
    },

  ],
}

const Asset = {
  value: "Asset",
  title: "Asset 资产",
  description: "资产信息",
  source: async ({ api, ticker }) => {
    // Venue
    const assets = await api.assets.getAsset({ ticker })
    return assets;
  },
  methods: [
    {
      value: "controllerTransfer",
      title: "controllerTransfer	控制器转移",
      description: "强制从给定投资组合转移到调用者的默认投资组合",
      options: {
        amount: 100,
        originPortfolio: 1
      }, available: true, isOptionRequired: true
    },
    {
      value: "createdAt",
      title: "createdAt	创建于",
      description: "检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引）|使用中间件",
      options: {}, available: true, isOptionRequired: false
    },
    {
      value: "createdAtV2",
      title: "createdAtV2	创建于 V2",
      description: "检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引）| 使用中间件V2",
      options: {}, available: true, isOptionRequired: false
    },
    { value: "currentFundingRound", title: "currentFundingRound	当前融资轮次", description: "检索资产的融资轮次|可以订阅", options: {}, available: true, isOptionRequired: false },
    { value: "details", title: "details	细节", description: "检索资产的数据|可以订阅", options: {}, available: true, isOptionRequired: false },
    { value: "exists", title: "exists	存在", description: "判断链上是否存在该资产", options: {}, available: true, isOptionRequired: false },
    { value: "freeze", title: "freeze	冻结", description: "冻结资产转让", options: {}, available: true, isOptionRequired: false },
    { value: "getIdentifiers", title: "getIdentifiers	获取标识符", description: "检索资产的标识符列表|可以订阅", options: {}, available: true, isOptionRequired: false },
    {
      value: "getOperationHistory",
      title: "getOperationHistory	获取操作历史",
      description: "检索此资产的操作历史|操作按执行它们的代理身份分组|使用中间件",
      options: {}, available: true, isOptionRequired: false
    },
    {
      value: "getOperationHistoryV2",
      title: "getOperationHistoryV2	获取操作历史V2",
      description: "检索此资产的操作历史|操作按执行它们的代理身份分组|使用中间件V2",
      options: {}, available: false, isOptionRequired: false
    },
    {
      value: "investorCount",
      title: "investorCount	投资者数量",
      description:
        "检索持有该资产的唯一投资者的数量|这考虑了投资者唯一性声明的范围 ID。如果投资者以两个或多个不同的身份持有此资产的余额，但他们都拥有具有相同范围 ID 的投资者唯一性声明，则出于此结果的目的，他们将只被计算一次",
      options: {}, available: true, isOptionRequired: false
    },
    { value: "isEqual", title: "isEqual	是平等的", description: "判断这个Entity和另一个Entity是否相同", options: {}, available: false, isOptionRequired: false },
    { value: "isFrozen", title: "isFrozen	被冻结", description: "检查资产的转账是否被冻结|可以订阅", options: {}, available: true, isOptionRequired: false },
    {
      value: "modify", title: "modify	调整", description: "修改资产的一些属性|如果传递的值不会导致对资产进行任何更改", options: {
        ticker: 'TY001',
        name: '', //资产名称
        fundingRound: '', //融资轮次
        isDivisible: '', //是否可分割
        '说明：': 'ticker必输，其它选输'
      }, available: true, isOptionRequired: true
    },
    {
      value: "modifyPrimaryIssuanceAgent",
      title: "modifyPrimaryIssuanceAgent	修改主要问题代理",
      description:
        "为资产分配新的主要发行代理|这将创建一个必须由身份接受的授权请求。帐户或target身份可以通过调用authorizations.getReceived来获取其未决的授权请求。此外，帐户或身份可以通过调用authorizations.getOne直接获取授权请求的详细信息",
      options: {
        requestExpiry:'2023-01-11', // 到期日期
        target:'did身份'
      }, available: true, isOptionRequired: true
    },
    { value: "redeem", title: "redeem	赎回", description: "赎回（销毁）一定数量的该资产的代币|令牌从调用者的默认投资组合中删除", options: {
      amount: 100
    }, available: true, isOptionRequired: true },
    {
      value: "removePrimaryIssuanceAgent",
      title: "removePrimaryIssuanceAgent	删除主要发行代理",
      description: "移除资产的主要发行代理|如果未设置主发行代理，则默认使用资产所有者",
      options: {}, available: true, isOptionRequired: false
    },
    { value: "toHuman", title: "toHuman	对人类", description: "返回资产的代码", options: {}, available: true, isOptionRequired: false },
    {
      value: "transferOwnership",
      title: "transferOwnership	所有权转让",
      description:
        "将资产的所有权转移到另一个身份。这会生成一个必须由收件人接受的授权请求|这将创建必须由身份接受的授权请求。帐户或target身份可以通过调用authorizations.getReceived来获取其未决的授权请求。此外，帐户或身份可以通过调用authorizations.getOne直接获取授权请求的详细信息",
      options: {
        target: '目标did账户'
      },
      available: true, isOptionRequired: true
    },
    { value: "unfreeze", title: "unfreeze	解冻", description: "解冻资产的转移", options: {}, available: true, isOptionRequired: false },
    // { value: "generateUuid", title: "generateUuid	生成Uuid", description: "从实体的标识属性生成实体的 UUID", options: {}, available: false, isOptionRequired: false },
    // { value: "unserialize", title: "unserialize	反序列化", description: "将 UUID 反序列化为其唯一标识符", options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: "assetHolders", title: "assetHolders	资产持有人", description: "资产持有人",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.assetHolders;
      },
      methods: [
        { value: 'get', title: 'get	获取', description: '检索所有资产持有人及其各自的余额|支持分页', options: {}, available: true, isOptionRequired: false }
      ], children: []
    },
    {
      value: "checkpoints", title: "checkpoints	检查站", description: "检查站", source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.checkpoints;
      },
      methods: [
        { value: 'create', title: 'create	创建快照', description: '此时创建资产持有人及其各自余额的快照', options: {}, available: true, isOptionRequired: false },
        { value: 'get', title: 'get	查询', description: '检索在此资产上创建的所有检查点，以及相应的创建日期和总供应量|支持分页', options: {}, available: true, isOptionRequired: false },
        { value: 'getOne', title: 'getOne	查询一个', description: '按 ID 检索此资产的单个检查点', options: {id:1}, available: true, isOptionRequired: true },
      ],
      children: [
        {
          value: 'schedules', title: 'schedules	时间表', description: '时间表',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.checkpoints.schedules;
          },
          methods: [
            { value: 'complexityOf', title: 'complexityOf	复杂性', description: '计算给定日历周期复杂性的抽象度量', options: {}, available: false, isOptionRequired: false },
            { value: 'create', title: 'create	创造', description: '创建检查点创建计划（例如，“从下周二开始，每周创建一个检查点，持续 5 周”）|由于链的限制，每当资产 在投资组合之间赎回、发行或转让。这意味着，在没有太多移动的资产上，预期的检查点创建日期之间可能存在差异 以及创建它们的实际日期。但是，这对检查点在余额方面的准确性没有影响', options: {}, available: false, isOptionRequired: false },
            { value: 'currentComplexity', title: 'currentComplexity	当前复杂性', description: '计算此资产的所有当前检查点时间表的复杂性总和。 该数字不能超过资产的最大复杂度（通过最大复杂度获得）)', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索所有活动的检查点计划', options: {}, available: true, isOptionRequired: false },
            { value: 'getOne', title: 'getOne	得到一个', description: '按其 ID 检索与此资产关联的单个检查点计划', options: {}, available: false, isOptionRequired: false },
            { value: 'maxComplexity', title: 'maxComplexity	最大复杂度', description: '检索此资产允许的最大计划复杂性', options: {}, available: true, isOptionRequired: false },
            { value: 'remove', title: 'remove	删除', description: '删除给定资产提供的检查点计划', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },
      ]
    },
    {
      value: "compliance", title: "compliance	合约规则", description: "合约规则",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.compliance;
      },
      methods: [],
      children: [
        {
          value: 'requirements', title: 'requirements	要求', description: '要求',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.compliance.requirements;
          },
          methods: [
            { value: 'add', title: 'add	加', description: '向资产添加新的合规性要求。这不会修改现有要求|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 add.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
            { value: 'arePaused', title: 'arePaused	已暂停', description: '检查资产合规性要求是否已暂停', options: {}, available: true, isOptionRequired: false },
            { value: 'checkSettle', title: 'checkSettle	检查结算', description: '检查资产合规性要求是否已暂停|这不考虑余额|赞成（将金额设置为 0 以模仿此调用）settlements.canTransfer', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索资产的所有合规性要求以及默认的受信任声明颁发者|可以订阅', options: {}, available: true, isOptionRequired: false },
            { value: 'modify', title: 'modify	修改', description: '修改资产的合规性要求|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 modify.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
            { value: 'pause', title: 'pause	暂停', description: '暂停资产的所有要求。这意味着在要求取消暂停之前，将允许所有传输|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 pause.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
            { value: 'remove', title: 'remove	删除', description: '从资产中删除现有的合规性要求', options: {}, available: false, isOptionRequired: false },
            { value: 'reset', title: 'reset	重置', description: '删除资产的所有当前要求。', options: {}, available: true, isOptionRequired: false },
            { value: 'set', title: 'set	设置', description: '配置资产的合规性要求。此操作会将所有现有要求替换为新的要求集|Example:假设 A、B、C、D 和 E 是要求，我们将它们排列为 。 要使传输成功，它必须符合 A 和 B、C 和 D 或 E。[[A, B], [C, D], [E]]', options: {}, available: false, isOptionRequired: false },
            { value: 'unpause', title: 'unpause	取消暂停', description: '取消暂停所有资产的当前需求', options: {}, available: true, isOptionRequired: false },
          ], children: []
        },
        {
          value: 'trustedClaimIssuers', title: 'trustedClaimIssuers	受信任的索赔发行人', description: '可信索赔发行人',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.compliance.trustedClaimIssuers;
          },
          methods: [
            { value: 'add', title: 'add	加', description: '将提供的标识添加到资产的受信任声明颁发者列表中', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索资产的当前默认受信任声明颁发者|可以订阅', options: {}, available: true, isOptionRequired: false },
            { value: 'remove', title: 'remove	删除', description: '从资产的受信任声明颁发者列表中删除提供的身份 *', options: {}, available: false, isOptionRequired: false },
            { value: 'set', title: 'set	设置', description: '通过将现有列表替换为作为参数传递的列表，将受信任声明颁发者的新默认列表分配给资产|这需要两个事务', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },
      ]
    },
    {
      value: "corporateActions", title: "corporateActions	公司行动", description: "企业行动",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.corporateActions;
      },
      methods: [
        { value: 'getAgents', title: 'getAgents	获取代理', description: '检索代理标识列表', options: {}, available: true, isOptionRequired: false },
        { value: 'getDefaultConfig', title: 'getDefaultConfig	获取默认配置', description: '检索由目标、全局预扣税百分比和每个身份的预扣税百分比组成的默认配置。', options: {}, available: true, isOptionRequired: false },
        { value: 'remove', title: 'remove	去除', description: '删除公司行动（注：在支付时间之前可以执行此操作删除股息）', options: {corporateAction:0}, available: true, isOptionRequired: true },
        { value: 'removeAgent', title: 'removeAgent	删除代理', description: '删除资产的公司行动代理|此操作将使资产所有者成为公司行动代理', options: {}, available: true, isOptionRequired: false },
        { value: 'setAgent', title: 'setAgent	设置代理（注：一个资产只能设置一个代理）', description: '为资产分配新的公司行动代理|这可能会创建必须由身份接受的授权请求。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。target|Deprecated:赞成inviteAgent', options: {
          requestExpiry:'接受的截止日期(可选)',
          target:'did身份'
        }, available: true, isOptionRequired: true },
        { value: 'setDefaultConfig', title: 'setDefaultConfig	设置默认配置', description: '分配默认配置值（目标、全局预扣税百分比和每个身份的预扣税百分比）|这些配置值将应用于创建的每个公司行动，直到它们被修改。修改这些值 不影响现有的公司行动。 创建公司行动时，显式传递的值将覆盖这些默认配置值', options: {}, available: false, isOptionRequired: false },
      ],
      children: [
        {
          value: 'distributions', title: 'distributions	分布', description: '处理所有与资产分配相关的功能',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.corporateActions.distributions;
          },
          methods: [
            { value: 'configureDividendDistribution', title: 'configureDividendDistribution	配置股息分配', description: '在某个（现有或未来）检查点为资产持有人的子集创建股息分配|所需角色：原产地投资组合托管人', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索与此资产相关的所有股息分配及其详细信息', options: {}, available: true, isOptionRequired: false },
            { value: 'getOne', title: 'getOne	得到一个', description: '按其ID检索与此资产关联的单个股息分配', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },
      ]
    },
    {
      value: "did", title: "did	did账户", description: "did账户",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.did;
      },
      methods: [], children: []
    },
    {
      value: "documents", title: "documents	文件", description: "文件",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.documents;
      },
      methods: [
        { value: 'get', title: 'get	获取', description: '检索链接到资产的所有文档|支持分页', options: {}, available: true, isOptionRequired: false },
        { value: 'set', title: 'set	设置', description: '通过将现有文档列表替换为参数中传递的文档列表，为资产分配新的文档列表|这需要两个事务', options: {}, available: false, isOptionRequired: false },
      ],
      children: []
    },
    {
      value: "issuance", title: "issuance	发行", description: "处理所有与资产发行相关的功能",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.issuance;
      },
      methods: [
        { value: 'issue', title: 'issue	发行', description: '向调用方的默认投资组合发行一定数量的资产代币', options: {}, available: false, isOptionRequired: false },
      ],
      children: []
    },
    {
      value: "offerings", title: "offerings	供品", description: "供品",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.offerings;
      },
      methods: [
        {
          value: 'get', title: 'get	获取', description: '检索所有资产的产品及其详细信息。可以使用参数进行过滤', options: {
            status: {
              timing: OfferingTimingStatus.Started,
              sale: OfferingSaleStatus.Live,
              balance: OfferingBalanceStatus.Available,
            },
          }, available: true, isOptionRequired: false
        },
        { value: 'getOne', title: 'getOne	得到一个', description: '按 ID 检索与此资产关联的单个产品', options: {}, available: false, isOptionRequired: false },
        {
          value: 'launch', title: 'launch	推出资产产品', description: '推出资产产品|所需角色：1、提供投资组合托管人；2、提高投资组合托管人',
          options: offeringsLanchOptionFun,
          available: true, isOptionRequired: true
        },
      ],
      children: []
    },
    {
      value: "permissions", title: "permissions	权限", description: "权限",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.permissions;
      },
      methods: [
        { value: 'createGroup', title: 'createGroup	创建组', description: '为此资产创建权限组。可以将标识作为代理分配给权限组。分配给权限组的代理具有该组对资产的权限', options: {}, available: false, isOptionRequired: false },
        { value: 'getAgents', title: 'getAgents	获取代理', description: '检索代理列表（对资产具有权限的身份）和 其各自的权限组', options: {}, available: true, isOptionRequired: false },
        {
          value: 'getGroup', title: 'getGroup	获取组', description: '检索此资产的所有权限组',
          options: {
            id: 0,
            'id或type': 'id或type',
            type: 'Full'
          }, available: true, isOptionRequired: true
        },
        { value: 'getGroups', title: 'getGroups	获取组', description: '检索此资产的所有权限组', options: {}, available: true, isOptionRequired: false },
        { value: 'inviteAgent', title: 'inviteAgent	邀请代理', description: '邀请身份成为对此资产具有权限的代理|这将创建一个必须被身份接受的授权请求。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。target', options: {}, available: false, isOptionRequired: false },
        { value: 'removeAgent', title: 'removeAgent	删除代理', description: '撤销代理对此资产的权限|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 removeAgent.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
      ],
      children: []
    },
    {
      value: "settlements", title: "settlements	结算", description: "结算",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.settlements;
      },
      methods: [
        { value: 'canSettle', title: 'canSettle	可以结算', description: '检查是否可以创建结算指令，以便在两个投资组合之间转移一定数量的该资产代币。|这会考虑锁定的令牌。例如，如果投资组合 A 有 1000 个代币，并且调用此函数来检查其中 700 个代币是否可以 转移到投资组合B（假设其他所有内容都检查出来），结果将是成功的。如果创建并授权指令转移这 700 个代币， 它们会被锁定。从那时起，对该函数的进一步调用将返回失败的结果，因为资金被锁定，即使它们没有被锁定。 转移尚未转移', options: {}, available: false, isOptionRequired: false },
        { value: 'canTransfer', title: 'canTransfer	可以转移', description: '检查是否可以创建结算指令以在两个投资组合之间转移一定数量的该资产。返回细分 包含一般错误（例如余额不足或收款无效）、任何违反转账限制以及任何合规性的交易 失败|这会考虑锁定的令牌。例如，如果投资组合 A 有 1000 个代币，并且调用此函数来检查其中 700 个代币是否可以 转移到投资组合B（假设其他所有内容都检查出来），结果将是成功的。如果创建并授权指令转移这 700 个代币， 它们会被锁定。从那时起，对该函数的进一步调用将返回失败的结果，因为资金被锁定，即使它们没有被锁定。 转移尚未转移', options: {}, available: false, isOptionRequired: false },
      ],
      children: []
    },
    {
      value: "ticker", title: "ticker	资产代码", description: "资产代码",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.ticker;
      },
      methods: [], children: []
    },
    {
      value: "transferRestrictions",
      title: "transferRestrictions	转移限制",
      description: "转移限制",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.transferRestrictions;
      },
      methods: [],
      children: [
        {
          value: 'claimCount', title: 'claimCount	索赔计数', description: '索赔计数|处理所有与索赔计数传输限制相关的功能',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.transferRestrictions.claimCount;
          },
          methods: [
            { value: 'addRestriction', title: 'addRestriction	添加限制', description: '向此资产添加索赔计数转移限制。这限制了个人总数 可能持有某些债权范围内的资产的投资者。这可能会限制持有人的数量 未经认证，或确保所有持有人均为特定国籍|结果是过程运行后的限制总量|如果未为资产启用适当的计数统计信息（匹配声明类型和颁发者）。在此方法之前应使用适当的参数调用 enableStat。', options: {}, available: false, isOptionRequired: false },
            { value: 'disableStat', title: 'disableStat	禁用统计', description: '禁用资产的声明计数统计信息。由于统计数据会给每个事务带来轻微的开销 涉及资产，禁用未使用的统计数据将降低投资者的汽油费|如果统计信息正在被限制使用或未设置', options: {}, available: false, isOptionRequired: false },
            { value: 'enableStat', title: 'enableStat	启用统计', description: '启用资产的投资者计数统计信息，以按声明限定范围，这是创建限制之前所必需的|计数器仅在启用统计信息后每次转移令牌时自动更新。 因此，应传入统计信息的初始值。 对于和范围统计有索赔和没有索赔的投资者数量 应该给予。对于范围统计，需要给出每个国家/地区代码的持有者数量。AffiliateAccreditedJurisdiction|目前，如果在交易资产时传入计数值，则存在潜在的竞争条件。 建议在资产的初始配置期间调用此方法，然后再进行交易。 否则，应冻结资产，或在设置后检查统计信息以确保使用正确的值。前途 链的版本可能会公开新的外部函数以避免此问题', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索所有活动的索赔计数转移限制|所有类型都允许最大数量的限制。 结果的属性表示可以添加多少个限制 在达到该限制之前availableSlots', options: {}, available: true, isOptionRequired: false },
            { value: 'removeRestrictions', title: 'removeRestrictions	删除限制', description: '从此资产中删除所有版权声明计数转移限制|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
            { value: 'setRestrictions', title: 'setRestrictions	设置限制', description: '设置此资产的所有声明计数转移限制|此方法还会设置限制的豁免标识。如果身份当前不受索赔计数转移限制的约束 但未传递到此调用中，然后将其删除|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
          ],
          children: []
        },
        {
          value: 'claimPercentage', title: 'claimPercentage	索赔百分比', description: '索赔百分比|处理所有与索赔百分比转移限制相关的功能',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.transferRestrictions.claimPercentage;
          },
          methods: [
            { value: 'addRestriction', title: 'addRestriction	添加限制', description: '为此资产添加百分比转移限制。这可用于限制供应总量 共享索赔类型的投资者可以持有。例如，可以制定限制，以便加拿大投资者必须持有 至少50%的供应。|如果未为此资产启用适当范围的余额统计信息（按声明类型和颁发者）。在此方法之前应调用具有适当参数的启用统计', options: {}, available: false, isOptionRequired: false },
            { value: 'disableStat', title: 'disableStat	禁用统计', description: '禁用资产的投资者余额统计信息。由于统计数据会给每个事务带来轻微的开销 涉及资产，禁用未使用的统计数据将降低投资者的汽油费|如果统计信息正在被限制使用或未设置', options: {}, available: false, isOptionRequired: false },
            { value: 'enableStat', title: 'enableStat	启用统计', description: '启用资产的投资者余额统计，这是创建限制之前所必需的 限制资产供应的总所有权', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索所有有效的索赔百分比转移限制|所有类型都允许最大数量的限制。 结果的属性表示可以添加多少个限制 在达到该限制之前availableSlots', options: {}, available: true, isOptionRequired: false },
            { value: 'removeRestrictions', title: 'removeRestrictions	删除限制', description: '从此资产中删除所有索赔转移百分比限制|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
            { value: 'setRestrictions', title: 'setRestrictions	设置限制', description: '设置此资产的所有索赔转移百分比限制|此方法还会设置限制的豁免标识。如果身份目前不受索赔百分比转移限制 但未传递到此调用中，然后将其删除|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },
        {
          value: 'count', title: 'count	计数', description: '计数|处理所有与计数传输限制相关的功能',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.transferRestrictions.count;
          },
          methods: [
            { value: 'addRestriction', title: 'addRestriction	添加限制', description: '向此资产添加计数传输限制。这限制了个人总数 可能持有资产的投资者。在一些司法管辖区，一旦投资者的门槛 通过后，可能适用不同的规定。计数传输限制可以确保不超过此类限制|如果未为资产启用计数统计信息。Count.enableStat 应该在此方法之前调用', options: {}, available: false, isOptionRequired: false },
            { value: 'disableStat', title: 'disableStat	禁用统计', description: '禁用资产的投资者计数统计信息。由于统计数据会给每个事务带来轻微的开销 涉及资产，禁用未使用的统计数据将减少投资者与资产交易时的汽油费|如果统计信息正在被限制使用或未设置', options: {}, available: false, isOptionRequired: false },
            { value: 'enableStat', title: 'enableStat	启用统计', description: '为资产启用投资者计数统计信息，这是创建限制之前所必需的|计数器仅在启用统计信息后每次转移令牌时自动更新。 因此，应该传入统计信息的初始值，可以使用 Count.investorCount 获取该值。|目前，如果在交易资产时传入计数值，则存在潜在的竞争条件。 建议在资产的初始配置期间调用此方法，然后再进行交易。 否则，应冻结资产，或在设置后检查统计信息以确保使用正确的值。前途 链的版本可能会公开新的外部函数以避免此问题', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '"检索所有活动的计数传输限制|所有类型都允许最大数量的限制。|结果的属性表示可以添加多少个限制availableSlots在达到该限制之前"', options: {}, available: true, isOptionRequired: false },
            { value: 'investorCount', title: 'investorCount	投资者计数', description: '返回资产的个人持有者计数|此值可用于初始化 。如果用于此目的，则存在潜在的争用条件 如果资产转移发生在检查时间和使用时间之间。暂停资产转移，或查看统计信息 创建，如果发生比赛，请重试。链的未来版本应该引入一个外部函数来避免这个问题enableStat', options: {}, available: false, isOptionRequired: false },
            { value: 'removeRestrictions', title: 'removeRestrictions	删除限制', description: '从此资产中删除所有计数传输限制|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
            { value: 'setRestrictions', title: 'setRestrictions	设置限制', description: '设置此资产的所有计数转移限制|此方法还会设置限制的豁免标识。如果身份当前不受计数转移限制的约束 但未传递到此调用中，然后将其删除|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },
        {
          value: 'percentage', title: 'percentage	百分率', description: '百分比|处理所有与百分比转移限制相关的功能',
          source: async ({ api, ticker }) => {
            const assets = await api.assets.getAsset({ ticker })
            return assets.transferRestrictions.percentage;
          },
          methods: [
            { value: 'addRestriction', title: 'addRestriction	添加限制', description: '为此资产添加百分比转移限制。这限制了供应的总百分比 单一投资者可以在没有豁免的情况下收购|如果未为此资产启用余额统计信息。启用统计 应在此方法之前调用', options: {}, available: false, isOptionRequired: false },
            { value: 'disableStat', title: 'disableStat	禁用统计', description: '禁用资产的投资者余额统计。由于统计数据会给每个事务带来轻微的开销 涉及资产，禁用未使用的统计数据将减少投资者与资产交易时的汽油费|如果统计信息正在被限制使用或未设置', options: {}, available: false, isOptionRequired: false },
            { value: 'enableStat', title: 'enableStat	启用统计', description: '启用资产的投资者余额统计，这是创建限制之前所必需的 限制了资产供应的总所有权', options: {}, available: false, isOptionRequired: false },
            { value: 'get', title: 'get	获取', description: '检索所有活动的百分比转移限制|所有类型都允许最大数量的限制。 结果的属性表示可以添加多少个限制 在达到该限制之前availableSlots', options: {}, available: true, isOptionRequired: false },
            { value: 'removeRestrictions', title: 'removeRestrictions	删除限制', description: '从此资产中删除所有百分比转移限制|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
            { value: 'setRestrictions', title: 'setRestrictions	设置限制', description: '设置此资产的所有百分比转移限制|此方法还会设置限制的豁免标识。如果身份当前不受百分比转移限制的约束 但未传递到此调用中，然后将其删除|结果是过程运行后的限制总量', options: {}, available: false, isOptionRequired: false },
          ], children: []
        },

      ],
    },
    {
      value: "uuid", title: "uuid	uuid", description: "",
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        return assets.uuid;
      },
      methods: [], children: []
    },
  ],
}

const Identity = {
  value: "Identity",
  title: "Identity 签名身份",
  description: "表示Polymesh区块链中的身份",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity()
    return identity
  },
  methods: [
    { value: 'areSecondaryAccountsFrozen', title: 'areSecondaryAccountsFrozen	是辅助帐户冻结', description: '检查辅助账户是否被冻结|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'checkRoles', title: 'checkRoles	check角色', description: '检查此标识是否拥有所有指定的角色', options: {}, available: false, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此身份|此检查不认为资产标识存在', options: {}, available: true, isOptionRequired: false },
    { value: 'getAssetBalance', title: 'getAssetBalance	获取资产余额', description: '检索特定资产的余额|可以订阅', options: {ticker:'TY004'}, available: true, isOptionRequired: true },
    { value: 'getHeldAssets', title: 'getHeldAssets	获取持有资产', description: '检索此标识在某一点持有的所有资产的列表|使用中间件|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getHeldAssetsV2', title: 'getHeldAssetsV2	获取持有资产V2', description: '检索此标识在某一点持有的所有资产的列表|使用中间件V2|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getInstructions', title: 'getInstructions	获取指令', description: '检索此身份为参与者的所有指令， 按状态分组', options: {}, available: true, isOptionRequired: false },
    { value: 'getPendingDistributions', title: 'getPendingDistributions	获取待定分配', description: '检索此身份有资格且尚未支付的每个股息分配|使用中间件|此查询可能会很慢，具体取决于此标识持有的资产', options: {}, available: true, isOptionRequired: false },
    { value: 'getPendingInstructions', title: 'getPendingInstructions	获取待定指令', description: '检索涉及此身份的所有待处理指令|已弃用|支持getInstructions', options: {}, available: true, isOptionRequired: false },
    { value: 'getPrimaryAccount', title: 'getPrimaryAccount	获取主要帐户', description: '检索与标识关联的主帐户|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getScopeId', title: 'getScopeId	获取作用域ID', description: '检索与此身份的特定资产的投资者唯一性声明关联的范围 ID，或 null 如果没有', options: {}, available: false, isOptionRequired: false },
    { value: 'getSecondaryAccounts', title: 'getSecondaryAccounts	获取辅助帐户', description: '获取与标识相关的辅助帐户列表|支持分页|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getTrustingAssets', title: 'getTrustingAssets	获取信任资产', description: '获取此标识是受信任声明颁发者的资产列表|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'getTrustingAssetsV2', title: 'getTrustingAssetsV2	获取信任资产V2', description: '获取此标识是受信任声明颁发者的资产列表|使用中间件V2', options: {}, available: true, isOptionRequired: false },
    { value: 'getVenues', title: 'getVenues	获取场地', description: '检索此标识创建的所有场所|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'hasRole', title: 'hasRole	has角色', description: '检查此身份是否拥有指定的角色|如：TickerOwnerRole | CddProviderRole | VenueOwnerRole | PortfolioCustodianRole | IdentityRole（票务所有者角色|Cdd提供者角色|场馆所有者角色|投资组合保管角色|身份角色）', options: {}, available: false, isOptionRequired: false },
    { value: 'hasRoles', title: 'hasRoles	has角色', description: '检查此标识是否拥有所有指定的角色|已弃用|支持checkRoles', options: {}, available: false, isOptionRequired: false },
    { value: 'hasValidCdd', title: 'hasValidCdd	具有有效Cdd', description: '检查此标识是否具有有效的 CDD 声明', options: {}, available: true, isOptionRequired: false },
    { value: 'isCddProvider', title: 'isCddProvider	isCdd提供商', description: '检查此标识是否为 CDD 提供程序', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	等于', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isGcMember', title: 'isGcMember	isGc成员', description: '检查此标识是否为治理委员会成员', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	至人类', description: '返回标识的 DID', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'assetPermissions', title: 'assetPermissions	资产权限', description: '资产权限',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        return identity.assetPermissions
      }, methods: assetPermissionsMethods, children: []
    },
    {
      value: 'authorizations', title: 'authorizations	授权', description: '身份授权',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        return identity.authorizations
      }, methods: IdentityAuthorizations, children: []
    },
    {
      value: 'did', title: 'did	did账户', description: 'did账户',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        return identity.did
      }, methods: [], children: []
    },
    {
      value: 'portfolios', title: 'portfolios	投资 组合', description: '投资 组合',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        return identity.portfolios
      }, methods: Portfolios, children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '', source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        return identity.uuid
      }, methods: [], children: []
    },
  ],
}
const AuthorizationRequest_identity = {
  value: "AuthorizationRequest_identity",
  title: "AuthorizationRequest_identity 身份授权请求",
  description: "表示一个标识向另一个标识（或帐户）发出的某种授权请求。这有多种用途。例如，如果爱丽丝 想要将她的一个资产的所有权转让给 Bob，此方法会向 Bob 发出授权请求， 然后谁必须接受它才能完成所有权转让",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity();
    const authorizationList = await identity.authorizations.getReceived()
    return authorizationList
  },
  methods: [
    { value: 'accept', title: 'accept	接受', description: '接受授权请求。您必须是请求的目标才能接受它', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定此授权请求是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isExpired', title: 'isExpired	已过期', description: '返回授权请求是否已过期', options: {}, available: true, isOptionRequired: false },
    { value: 'remove', title: 'remove	删除', description: '删除授权请求|1、如果您是请求颁发者，这将取消授权;2、如果您是请求目标，这将拒绝授权', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回授权的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: true, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: true, isOptionRequired: false },
  ],
  children: [
    {
      value: 'authId', title: 'authId	身份验证标识', description: '请求的内部标识符（用于接受/拒绝/取消）',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].authId
      },
      methods: [], children: []
    },
    {
      value: 'data', title: 'data	数据', description: '与授权类型对应的授权请求数据',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].data
      },
      methods: [], children: []
    },
    {
      value: 'expiry', title: 'expiry	满期', description: '授权请求到期且无法再被接受的日期。 此时，必须发出新的授权请求。如果请求永不过期，则为 null',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].expiry
      },
      methods: [], children: []
    },
    {
      value: 'issuer', title: 'issuer	发行', description: '发出请求的标识',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].issuer
      },
      methods: [], children: []
    },
    {
      value: 'target', title: 'target	目标', description: '向其发出请求的身份或帐户',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].target
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity();
        const authorizationList = await identity.authorizations.getReceived()
        return authorizationList[number].uuid
      },
      methods: [], children: []
    },
  ],
}
const AuthorizationRequest_account = {
  value: "AuthorizationRequest_account",
  title: "AuthorizationRequest_account 账户授权请求",
  description: "表示一个标识向另一个标识（或帐户）发出的某种授权请求。这有多种用途。例如，如果爱丽丝 想要将她的一个资产的所有权转让给 Bob，此方法会向 Bob 发出授权请求， 然后谁必须接受它才能完成所有权转让",
  source: async ({ api }) => {
    const account = await api.accountManagement.getSigningAccount()
    const authorizations = await account.authorizations.getReceived()
    return authorizations
  },
  methods: AuthorizationRequest_identity.methods,
  children: AuthorizationRequest_identity.children,
}

const Checkpoint = {
  value: "Checkpoint",
  title: "Checkpoint 检查点",
  description: "代表资产持有人及其各自余额的快照 在某个时间点",
  source: async ({ api, ticker }) => {
    // 典型 1
    const assets = await api.assets.getAsset({ ticker })
    const checkpoints = await assets.checkpoints.get();
    if (checkpoints.data.length === 0) {
      return checkpoints.data
    }
    return {
      fn: (number) => {
        return checkpoints.data[number].checkpoint
      },
      totalLength: checkpoints.data.length
    }
  },
  methods: [
    { value: 'allBalances', title: 'allBalances	所有余额', description: '在此检查点检索所有资产持有人余额|支持分页|创建检查点时未持有任何代币的当前资产持有者将以 0 的余额列出。 这源于链存储优化和分页。', options: {}, available: true, isOptionRequired: false },
    { value: 'balance', title: 'balance	余额', description: '在此检查点检索特定资产持有人身份的余额|检查点仅在余额发生变化时记录余额。实现是查询 [ticker， did] 对的所有余额更新。 如果自创建检查点以来未发生任何余额更新，则存储将没有用户的条目。相反，应使用当前余额。 仅当标识在创建检查点后进行交易时，才会存储余额。这有助于将存储使用量降至最低', options: {}, available: true, isOptionRequired: false },
    { value: 'createdAt', title: 'createdAt	创建于', description: '检索此检查点的创建日期', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此检查点', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回检查点的股票代码和标识符', options: {}, available: true, isOptionRequired: false },
    { value: 'totalSupply', title: 'totalSupply	总供应量', description: '在此检查点检索资产的总供应量', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID|静态方法', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符|静态方法', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'id', title: 'id	编号', description: '检查点标识符号',
      source: async ({ api, ticker }) => {
        // 典型 1
        const assets = await api.assets.getAsset({ ticker })
        const checkpoints = await assets.checkpoints.get();
        if (checkpoints.data.length === 0) {
          return checkpoints.data
        }
        return {
          fn: (number) => {
            return checkpoints.data[number].checkpoint.id
          },
          totalLength: checkpoints.data.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker }) => {
        // 典型 1
        const assets = await api.assets.getAsset({ ticker })
        const checkpoints = await assets.checkpoints.get();
        if (checkpoints.data.length === 0) {
          return checkpoints.data
        }
        return {
          fn: (number) => {
            return checkpoints.data[number].checkpoint.uuid
          },
          totalLength: checkpoints.data.length
        }
      },
      methods: [], children: []
    },
  ],
}
const CheckpointSchedule = {
  value: "CheckpointSchedule",
  title: "CheckpointSchedule 检查点计划",
  description: "表示资产的检查点计划。可以设置计划以定期创建检查点",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const schedulesList = await assets.checkpoints.schedules.get();
    if (schedulesList.length === 0) {
      return schedulesList
    }
    return {
      fn: (number) => {
        return schedulesList[number].schedule
      },
      totalLength: schedulesList.length
    }
  },
  methods: [
    { value: 'details', title: 'details	详', description: '检索特定于此时间表的信息', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此检查点计划', options: {}, available: true, isOptionRequired: false },
    { value: 'getCheckpoints', title: 'getCheckpoints	获取检查点', description: '检索此计划创建的所有检查点', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回计划的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'complexity', title: 'complexity	复杂性', description: '本附表复杂性的抽象衡量标准。周期越短，复杂性越高',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.complexity
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'expiryDate', title: 'expiryDate	到期日期', description: '使用此时间表创建最后一个检查点的日期。 空值表示此计划永不过期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.expiryDate
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'id', title: 'id	编号', description: '计划标识符号',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.id
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'period', title: 'period	时期', description: '此计划创建检查点的频率。空值表示此时间表 创建单个检查点，然后过期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.period
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'start', title: 'start	开始', description: '第一个检查点创建日期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.start
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const schedulesList = await assets.checkpoints.schedules.get();
        if (schedulesList.length === 0) {
          return schedulesList
        }
        return {
          fn: (number) => {
            return schedulesList[number].schedule.uuid
          },
          totalLength: schedulesList.length
        }
      },
      methods: [], children: []
    },
  ],
}

const CorporateAction = {
  value: "CorporateAction",
  title: "CorporateAction 公司行动",
  description: "代表资产发行人发起的可能影响其头寸的行动 资产持有人",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const distributionsList = await assets.corporateActions.distributions.get();
    if (distributionsList.length === 0) {
      return distributionsList
    }
    return {
      fn: (number) => {
        return distributionsList[number].distribution
      },
      totalLength: distributionsList.length
    }
  },
  methods: [
    { value: 'checkpoint', title: 'checkpoint	检查站', description: '检索与此公司行动关联的检查点。如果检查点已安排并且具有 尚未创建，而是返回相应的检查点计划。空值表示 公司行动是在没有关联检查点的情况下创建的', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定此公司行为是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'linkDocuments', title: 'linkDocuments	链接文档', description: '将文件列表链接到此公司行动|删除任何以前的链接以支持新列表|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 linkDocuments.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
    { value: 'modifyCheckpoint', title: 'modifyCheckpoint	修改检查点', description: '修改公司行动的检查点', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回公司行动的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },

  ],
  children: [
    Asset,
    // { value: 'asset', title: 'asset	资产', description: '受此公司行动影响的资产', source: async () => { }, methods: [], children: [] },
    {
      value: 'declarationDate', title: 'declarationDate	声明日期', description: '公司行动的创建日期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.declarationDate
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'defaultTaxWithholding', title: 'defaultTaxWithholding	默认预扣税', description: '此公司行动的默认预扣税百分比 （0-100）',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.defaultTaxWithholding
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'description', title: 'description	描述', description: '公司行动的简要文字说明',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.description
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'id', title: 'id	编号', description: '内部公司行动编号',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.id
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'targets', title: 'targets	目标', description: '与此公司行动相关的资产持有人身份。如果处理为 ，则 操作不会针对数组，不在数组中的标识将成为目标，反之亦然Exclude',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.targets
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'taxWithholdings', title: 'taxWithholdings	预扣税', description: '每个身份的预扣税款的百分比 （0-100）。任何不存在的身份 在此数组中使用默认预扣税百分比',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.taxWithholdings
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributionsList = await assets.corporateActions.distributions.get();
        if (distributionsList.length === 0) {
          return distributionsList
        }
        return {
          fn: (number) => {
            return distributionsList[number].distribution.uuid
          },
          totalLength: distributionsList.length
        }
      },
      methods: [], children: []
    },

  ],
}

const CustomPermissionGroup = {
  value: "CustomPermissionGroup",
  title: "CustomPermissionGroup 自定义权限组",
  description: "表示资产的一组自定义权限",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const permissions = await assets.permissions.getGroups();
    return permissions.custom;
  },
  methods: [
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此自定义权限组', options: {}, available: true, isOptionRequired: false },
    { value: 'getPermissions', title: 'getPermissions	获取权限', description: '检索与此权限组关联的权限和事务组的列表', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'setPermissions', title: 'setPermissions	设置权限', description: '修改组的权限', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回组的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'id', title: 'id	编号', description: '编号',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const permissions = await assets.permissions.getGroups();
        return permissions.custom[number].id;
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const permissions = await assets.permissions.getGroups();
        return permissions.custom[number].uuid;
      },
      methods: [], children: []
    },
  ],
}

const DefaultPortfolio = {
  value: "DefaultPortfolio",
  title: "DefaultPortfolio 默认投资组合",
  description: "表示标识的默认产品组合",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity()
    const defaultPor = await identity.portfolios.getPortfolio({
      portfolioId: 0
    })
    return defaultPor
  },
  methods: [
    { value: 'exists', title: 'exists	存在', description: '确定此投资组合是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'getAssetBalances', title: 'getAssetBalances	获取资产余额', description: '检索此投资组合中所有资产的余额', options: { assets: ['TY001'] }, available: true, isOptionRequired: false },
    { value: 'getCustodian', title: 'getCustodian	获取保管人', description: '检索此投资组合的托管人身份|如果未设置保管人，则返回所有者标识', options: {}, available: true, isOptionRequired: false },
    { value: 'getTransactionHistory', title: 'getTransactionHistory	获取交易历史记录', description: '检索涉及此项目组合的交易列表。可以使用参数进行过滤|支持分页|使用中间件', options: {
       size: 9999,
       说明:"不入参则查询的数据偏少"
    }, available: true, isOptionRequired: false },
    { value: 'getTransactionHistoryV2', title: 'getTransactionHistoryV2	获取交易历史记录V2', description: '检索涉及此项目组合的交易列表。可以使用参数进行过滤|使用中间件V2', options: {}, available: true, isOptionRequired: false },
    { value: 'isCustodiedBy', title: 'isCustodiedBy	是保管人', description: '返回标识是否为项目组合保管人', options: { identity: 'did账户' }, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isOwnedBy', title: 'isOwnedBy	是拥有者', description: '返回标识是否为项目组合所有者', options: { identity: 'did账号' }, available: false, isOptionRequired: false },
    { value: 'moveFunds', title: 'moveFunds	移动基金', description: '将资金从此投资组合转移到同一身份拥有的另一个投资组合|所需角色：投资组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'quitCustody', title: 'quitCustody	退出监护权', description: '单方面将投资组合的保管权归还给投资组合所有者|所需角色：|投资组合托管人', options: {}, available: true, isOptionRequired: false },
    { value: 'setCustodian', title: 'setCustodian	设置保管人', description: '向身份发送邀请，将其指定为此投资组合的保管人|这将创建一个授权请求，该请求必须由 接受。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。targetIdentity|所需角色：投资组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回投资组合 ID 和所有者 DID', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符|静态方法', options: {}, available: false, isOptionRequired: false },

  ],
  children: [
    {
      value: 'owner', title: 'owner	所有者', description: '投资组合所有者的身份',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolio({
          portfolioId: 0
        })
        return defaultPor.owner
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolio({
          portfolioId: 0
        })
        return defaultPor.uuid
      },
      methods: [], children: []
    },
  ],
}

const DefaultTrustedClaimIssuer = {
  value: "DefaultTrustedClaimIssuer",
  title: "DefaultTrustedClaimIssuer 默认受信任声明颁发者",
  description: "表示 Polymesh 区块链中特定资产的默认受信任声明颁发者",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const requirements = await assets.compliance.requirements.get();
    const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
    if (defaultTrustedClaimIssuers.length === 0) {
      return defaultTrustedClaimIssuers
    }
    return {
      fn: (number) => {
        return defaultTrustedClaimIssuers[number].identity
      },
      totalLength: defaultTrustedClaimIssuers.length
    }
  },
  methods: [
    { value: 'addedAt', title: 'addedAt	添加时间', description: '检索添加受信任声明颁发者时发出的事件的标识符数据（块号、日期和事件索引）|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'addedAtV2', title: 'addedAtV2	添加AtV2', description: '检索添加受信任声明颁发者时发出的事件的标识符数据（块号、日期和事件索引）|使用中间件V2', options: {}, available: true, isOptionRequired: false },
    { value: 'areSecondaryAccountsFrozen', title: 'areSecondaryAccountsFrozen	是辅助帐户冻结', description: '检查辅助账户是否被冻结|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'checkRoles', title: 'checkRoles	check角色', description: '检查此标识是否拥有所有指定的角色', options: {}, available: false, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此身份|此检查不认为资产标识存在', options: {}, available: true, isOptionRequired: false },
    { value: 'getAssetBalance', title: 'getAssetBalance	获取资产余额', description: '检索特定资产的余额|可以订阅', options: { ticker: '' }, available: true, isOptionRequired: true },
    { value: 'getHeldAssets', title: 'getHeldAssets	获取HeldAssets', description: '检索此标识在某一点持有的所有资产的列表|使用中间件|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getHeldAssetsV2', title: 'getHeldAssetsV2	获取HeldAssetsV2', description: '检索此标识在某一点持有的所有资产的列表|使用中间件V2|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getInstructions', title: 'getInstructions	获取指令', description: '检索此身份为参与者的所有指令， 按状态分组', options: {}, available: true, isOptionRequired: false },
    { value: 'getPendingDistributions', title: 'getPendingDistributions	获取待定分配', description: '检索此身份有资格且尚未支付的每个股息分配|使用中间件|此查询可能会很慢，具体取决于此标识持有的资产', options: {}, available: true, isOptionRequired: false },
    { value: 'getPendingInstructions', title: 'getPendingInstructions	获取待定指令', description: '检索涉及此身份的所有待处理指令|已废弃，支持getInstructions', options: {}, available: true, isOptionRequired: false },
    { value: 'getPrimaryAccount', title: 'getPrimaryAccount	获取主要帐户', description: '检索与标识关联的主帐户|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getScopeId', title: 'getScopeId	获取作用域ID', description: '检索与此身份的特定资产的投资者唯一性声明关联的范围 ID，或 null 如果没有', options: {}, available: false, isOptionRequired: false },
    { value: 'getSecondaryAccounts', title: 'getSecondaryAccounts	获取辅助帐户', description: '获取与标识相关的辅助帐户列表|支持分页|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getTrustingAssets', title: 'getTrustingAssets	获取信任资产', description: '获取此标识是受信任声明颁发者的资产列表|使用中间件', options: {}, available: false, isOptionRequired: false },
    { value: 'getTrustingAssetsV2', title: 'getTrustingAssetsV2	获取信任资产V2', description: '获取此标识是受信任声明颁发者的资产列表|使用中间件V2', options: {}, available: false, isOptionRequired: false },
    { value: 'getVenues', title: 'getVenues	获取场馆', description: '检索此标识创建的所有场所|可以订阅', options: {}, available: false, isOptionRequired: false },
    { value: 'hasRole', title: 'hasRole	has角色', description: '检查此身份是否拥有指定的角色', options: {}, available: false, isOptionRequired: false },
    { value: 'hasRoles', title: 'hasRoles	has角色', description: '检查此标识是否拥有所有指定的角色|已废弃|支持checkRoles', options: {}, available: false, isOptionRequired: false },
    { value: 'hasValidCdd', title: 'hasValidCdd	具有有效Cdd', description: '检查此标识是否具有有效的 CDD 声明', options: {}, available: true, isOptionRequired: false },
    { value: 'isCddProvider', title: 'isCddProvider	isCdd提供商', description: '检查此标识是否为 CDD 提供程序', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	等于', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isGcMember', title: 'isGcMember	isGc成员', description: '检查此标识是否为治理委员会成员', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	至人类', description: '返回标识的 DID', options: {}, available: true, isOptionRequired: false },
    { value: 'trustedFor', title: 'trustedFor	受信任的', description: '检索此声明颁发者受信任的声明类型。null 值表示颁发者对于所有声明类型都是受信任的', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'assetPermissions', title: 'assetPermissions	资产权限', description: '资产权限',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const requirements = await assets.compliance.requirements.get();
        const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
        if (defaultTrustedClaimIssuers.length === 0) {
          return defaultTrustedClaimIssuers
        }
        return {
          fn: (number) => {
            return defaultTrustedClaimIssuers[number].identity.assetPermissions
          },
          totalLength: defaultTrustedClaimIssuers.length
        }
      },
      methods: assetPermissionsMethods, children: []
    },
    {
      value: 'authorizations', title: 'authorizations	授权', description: '身份授权',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const requirements = await assets.compliance.requirements.get();
        const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
        if (defaultTrustedClaimIssuers.length === 0) {
          return defaultTrustedClaimIssuers
        }
        return {
          fn: (number) => {
            return defaultTrustedClaimIssuers[number].identity.authorizations
          },
          totalLength: defaultTrustedClaimIssuers.length
        }
      },
      methods: IdentityAuthorizations, children: []
    },
    {
      value: 'did', title: 'did	did账户', description: '存储在区块链中的身份 ID',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const requirements = await assets.compliance.requirements.get();
        const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
        if (defaultTrustedClaimIssuers.length === 0) {
          return defaultTrustedClaimIssuers
        }
        return {
          fn: (number) => {
            return defaultTrustedClaimIssuers[number].identity.did
          },
          totalLength: defaultTrustedClaimIssuers.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'portfolios', title: 'portfolios	投资 组合', description: '投资组合',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const requirements = await assets.compliance.requirements.get();
        const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
        if (defaultTrustedClaimIssuers.length === 0) {
          return defaultTrustedClaimIssuers
        }
        return {
          fn: (number) => {
            return defaultTrustedClaimIssuers[number].identity.portfolios
          },
          totalLength: defaultTrustedClaimIssuers.length
        }
      },
      methods: Portfolios, children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const requirements = await assets.compliance.requirements.get();
        const defaultTrustedClaimIssuers = requirements.defaultTrustedClaimIssuers;
        if (defaultTrustedClaimIssuers.length === 0) {
          return defaultTrustedClaimIssuers
        }
        return {
          fn: (number) => {
            return defaultTrustedClaimIssuers[number].identity.uuid
          },
          totalLength: defaultTrustedClaimIssuers.length
        }
      },
      methods: [], children: []
    },
  ],
}
const DividendDistribution = {
  value: "DividendDistribution",
  title: "DividendDistribution 股息分配",
  description: "代表资产发行人希望通过其分配股息的公司行动 在资产持有人（目标）的子集之间",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const distributions = await assets.corporateActions.distributions.get();
    if (distributions.length === 0) {
      return distributions
    }
    return {
      fn: (number) => {
        return distributions[number].distribution
      },
      totalLength: distributions.length
    }
  },
  methods: [
    { value: 'checkpoint', title: 'checkpoint	检查站', description: '检索与此股息分配关联的检查点。如果检查点已计划但尚未创建， 而是返回相应的检查点计划', options: {}, available: true, isOptionRequired: false },
    { value: 'claim', title: 'claim	索赔', description: '领取与签名身份相对应的红利|如果不可分割，则身份的份额将向下舍入到最接近的整数（预扣税款后）currency', options: {}, available: true, isOptionRequired: false },
    { value: 'details', title: 'details	详', description: '检索与此股息分配相关的详细信息', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '检索分发是否存在', options: {}, available: true, isOptionRequired: false },
    { value: 'getParticipant', title: 'getParticipant	获取参与者', description: '检索有权在此分配中获得股息的身份（参与者）， 它有权获得的金额以及是否已支付|如果尚未创建分发检查点，则结果将为 null。 这是因为如果没有检查点，就无法确定分配参与者的相应付款', options: { identity: '', 说明: '可不传参或传did账号' }, available: true, isOptionRequired: false },
    { value: 'getParticipants', title: 'getParticipants	获取参与者', description: '检索有权在此分配中获得股息的所有身份（参与者）的完整列表， 他们有权获得的金额以及是否已获得付款|对于大量资产持有者，此请求可能需要大量时间|如果尚未创建分发检查点，则结果将为空数组。 这是因为如果没有检查点，就无法确定分发参与者', options: {}, available: true, isOptionRequired: false },
    { value: 'getPaymentHistory', title: 'getPaymentHistory	获取付款历史记录', description: '检索此分配的付款历史记录|使用中间件|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getPaymentHistoryV2', title: 'getPaymentHistoryV2	获取付款历史记录V2', description: '检索此分配的付款历史记录|使用中间件 V2|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getWithheldTax', title: 'getWithheldTax	获取预扣税', description: '在此分配中检索到目前为止已预扣的税款金额|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'getWithheldTaxV2', title: 'getWithheldTaxV2	getWithheldTaxV2', description: '在此分配中检索到目前为止已预扣的税款金额|使用中间件V2', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'linkDocuments', title: 'linkDocuments	链接文档', description: '将文件列表链接到此公司行动|删除任何以前的链接以支持新列表|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 linkDocuments.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
    { value: 'modifyCheckpoint', title: 'modifyCheckpoint	修改检查点', description: '修改分配的检查点', options: {}, available: false, isOptionRequired: false },
    { value: 'pay', title: 'pay	支付', description: '将相应的股息份额转移到身份列表|由于性能问题，我们不会验证分配是否有足够的剩余资金来向提供的身份支付相应的金额|如果不可分割，则身份的份额将向下舍入到最接近的整数（预扣税款后）currency|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 pay.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: { target: [], 说明: '需要支付的did账号' }, available: true, isOptionRequired: true },
    { value: 'reclaimFunds', title: 'reclaimFunds	回收资金', description: '将任何剩余资金收回回原始投资组合。这只能在分发过期后完成|预扣税也在同一笔交易中回收|所需角色：原产地投资组合托管人|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 reclaimFunds.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回股息分配的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'currency', title: 'currency	货币', description: '分配股息的货币代码',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.currency
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'declarationDate', title: 'declarationDate	声明日期', description: '公司行动的创建日期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.declarationDate
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'defaultTaxWithholding', title: 'defaultTaxWithholding	默认预扣税', description: '此公司行动的默认预扣税百分比 （0-100）',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.defaultTaxWithholding
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'description', title: 'description	描述', description: '公司行动的简要文字说明',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.description
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'expiryDate', title: 'expiryDate	到期日期', description: '无法再支付/收回股息的日期。空值表示分配永不过期',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.expiryDate
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'id', title: 'id	编号', description: '内部公司行动编号',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.id
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'maxAmount', title: 'maxAmount	最大金额', description: '要分配的最大金额。分配是“先到先得”的，因此资金可以在之前耗尽 每个资产持有人都会收到相应的金额currency',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.maxAmount
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'origin', title: 'origin	起源', description: '分配股息的投资组合',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.origin
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'paymentDate', title: 'paymentDate	付款日期', description: '股息支付/回收的日期开始',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.paymentDate
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'perShare', title: 'perShare	每股', description: '资产持有人持有的每股股份的支付金额currency',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.perShare
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'targets', title: 'targets	目标', description: '与此公司行动相关的资产持有人身份。如果处理为 ，则 操作不会针对数组，不在数组中的标识将成为目标，反之亦然Exclude',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.targets
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'taxWithholdings', title: 'taxWithholdings	预扣税', description: '每个身份的预扣税款的百分比 （0-100）。任何不存在的身份 在此数组中使用默认预扣税百分比',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.taxWithholdings
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '企业行动基地。uuid',
      source: async ({ api, ticker }) => {
        const assets = await api.assets.getAsset({ ticker })
        const distributions = await assets.corporateActions.distributions.get();
        if (distributions.length === 0) {
          return distributions
        }
        return {
          fn: (number) => {
            return distributions[number].distribution.uuid
          },
          totalLength: distributions.length
        }
      },
      methods: [], children: []
    },
  ],
}

const Instruction = {
  value: "Instruction",
  title: "Instruction 指令（分为已确定、失败、未决）",
  description: "代表将在某个场所执行的结算指令",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity()
    const getInstructions = await identity.getInstructions()
    console.log('affirmedList',getInstructions)
    const affirmedList = getInstructions.affirmed
    return affirmedList
  },
  methods: [
    { value: 'affirm', title: 'affirm	肯定属实', description: '确认此指示（授权）', options: {}, available: true, isOptionRequired: false },
    { value: 'details', title: 'details	细节', description: '检索特定于本指令的信息', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定此指令是否存在于链上（或存在并被修剪）', options: {}, available: true, isOptionRequired: false },
    { value: 'getAffirmations', title: 'getAffirmations	获取确认信息', description: '检索此指令生成的每个授权（状态和授权身份）|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getLegs', title: 'getLegs	获取腿', description: '检索本指令的所有支腿|支持分页', options: {}, available: true, isOptionRequired: false },
    { value: 'getStatus', title: 'getStatus	获取状态', description: '检索此指令的当前状态|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'getStatusV2', title: 'getStatusV2	获取状态V2', description: '检索此指令的当前状态|使用中间件V2', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	等于', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isExecuted', title: 'isExecuted	已执行', description: '检索指令是否已执行并从中修剪 链条。', options: {}, available: true, isOptionRequired: false },
    { value: 'isPending', title: 'isPending	正在挂起', description: '检索指令是否仍在链上挂起', options: {}, available: true, isOptionRequired: false },
    { value: 'reject', title: 'reject	拒绝', description: '拒绝此指示|拒绝将执行结算，它将立即失败。SettleOnAffirmation|拒绝的行为就像未授权一样SettleOnBlock|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 reject.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    { value: 'reschedule', title: 'reschedule	重新安排日程', description: '重新安排失败的指令再次尝试|如果指令状态不是InstructionStatus.Failed|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 reschedule.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	至人类', description: '返回指令的ID', options: {}, available: true, isOptionRequired: false },
    { value: 'withdraw', title: 'withdraw	撤回', description: '从本指令中撤回确认（未经授权）|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 withdraw.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'id', title: 'id	编号', description: '场地的标识符号',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity()
        const getInstructions = await identity.getInstructions()
        const affirmedList = getInstructions.affirmed
        return affirmedList[number].id
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity()
        const getInstructions = await identity.getInstructions()
        const affirmedList = getInstructions.affirmed
        return affirmedList[number].uuid
      },
      methods: [], children: []
    },
  ],
}

const KnownPermissionGroup = {
  value: "KnownPermissionGroup",
  title: "KnownPermissionGroup 已知权限组",
  description: "表示资产的预定义权限组",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const permissions = await assets.permissions.getGroups();
    console.log(permissions)
    return permissions.known;
  },
  methods: [
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此已知权限组', options: {}, available: true, isOptionRequired: false },
    { value: 'getPermissions', title: 'getPermissions	获取权限', description: '检索与此权限组关联的权限和事务组的列表', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回已知权限组的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'type', title: 'type	类型', description: '权限组类型',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const permissions = await assets.permissions.getGroups();
        console.log('ExceptMeta 未授权')
        console.log('Full 所有交易授权')
        console.log('PolymeshV1Caa 授权： 企业行动 公司选票 资本分布')
        console.log('PolymeshV1Pia 授权：资产问题  资产赎回 资产.控制者转移 STO（sto.invest除外）')
        return permissions.known[number].type;
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const permissions = await assets.permissions.getGroups();
        console.log(permissions)
        return permissions.known[number].uuid;
      },
      methods: [], children: []
    },
  ],
}
const MultiSig = {
  value: "MultiSig",
  title: "MultiSig 多重签名",
  description: "代表多签账户。多重签名账户由一个或多个签名账户组成。为了提交交易，必须首先批准特定数量的签名帐户",
  source: async ({ api }) => {
    const account = await api.accountManagement.getSigningAccount()
    const multiSig = await account.getMultiSig()
    return multiSig
  },
  methods: [
    { value: 'checkPermissions', title: 'checkPermissions	检查权限', description: '检查此帐户是否拥有代表其相应身份行事的某些权限', options: {}, available: false, isOptionRequired: false },
    { value: 'details', title: 'details	详', description: '返回有关此 MultiSig 的详细信息，例如签名帐户和执行 MultiSigProposal 所需的签名数量', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '判断这个Account是否存在链上', options: {}, available: true, isOptionRequired: false },
    { value: 'getBalance', title: 'getBalance	获取余额', description: '获取账户的免费/锁定 POLYX 余额|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'getCreator', title: 'getCreator	获取创建者', description: '返回多重签名创建者的身份。此身份可以直接添加或删除签名者，而无需先创建 MultiSigProposal。', options: {}, available: true, isOptionRequired: false },
    { value: 'getCurrentNonce', title: 'getCurrentNonce	获取当前值随机数', description: '检索此帐户的当前随机数', options: {}, available: true, isOptionRequired: false },
    { value: 'getIdentity', title: 'getIdentity	获取身份', description: '检索与此帐户关联的身份（如果没有则为空）', options: {}, available: true, isOptionRequired: false },
    { value: 'getMultiSig', title: 'getMultiSig	获取多签', description: '获取此帐户所属的多重签名。如果此帐户不是任何 MultiSig 的签名者，则返回 null', options: {}, available: true, isOptionRequired: false },
    { value: 'getPermissions', title: 'getPermissions	获取权限', description: '检索此帐户作为其相应身份的许可帐户的权限|如果没有与帐户关联的身份', options: {}, available: true, isOptionRequired: false },
    { value: 'getProposal', title: 'getProposal	获取提案', description: '给定一个 ID，获取此多签名的多签名提案', options: { id: 0 }, available: true, isOptionRequired: true },
    { value: 'getProposals', title: 'getProposals	获取提案', description: '返回此多签账户的所有多签提案', options: {}, available: true, isOptionRequired: false },
    { value: 'getSubsidy', title: 'getSubsidy	获得补贴', description: '获取此账户和补贴账户的补贴余额。如果 此帐户未获得补贴，返回空值|可以订阅', options: {}, available: false, isOptionRequired: false },
    { value: 'getTransactionHistory', title: 'getTransactionHistory	获取交易历史记录', description: '检索此帐户签名的交易列表。可以使用参数进行过滤|如果两者都通过，则仅考虑blockNumberblockHashblockNumber|使用中间件', options: {}, available: false, isOptionRequired: false },
    { value: 'getTransactionHistoryV2', title: 'getTransactionHistoryV2	获取交易历史记录V2', description: '检索此帐户签名的交易列表。可以使用参数进行过滤|如果两者都通过，则仅考虑blockNumberblockHashblockNumber|使用中间件V2', options: {}, available: false, isOptionRequired: false },
    { value: 'hasPermissions', title: 'hasPermissions	有权限', description: '检查此帐户是否拥有代表其相应身份执行操作的某些权限|已废弃|建议checkPermissions', options: {}, available: false, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isFrozen', title: 'isFrozen	冻结', description: '检查此帐户是否被冻结。如果冻结，则在身份的主帐户解冻所有辅助帐户之前，它无法执行任何与身份相关的操作|如果帐户未关联到任何标识，则返回 false', options: {}, available: true, isOptionRequired: false },
    { value: 'modify', title: 'modify	修改', description: '修改多重签名的签名者。签名帐户必须属于多签创建者的身份|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 modify.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回帐户地址', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'address', title: 'address	地址', description: '帐户的 Polymesh 特定地址。作为标识符',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        return multiSig.address
      },
      methods: [], children: []
    },
    {
      value: 'authorizations', title: 'authorizations	授权', description: '授权',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        return multiSig.authorizations
      },
      methods: AccountAuthorizations, children: []
    },
    {
      value: 'key', title: 'key	钥匙 ', description: '帐户加密公钥的十六进制表示。这在 Substrate 链中是一致的，而地址也取决于链。',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        return multiSig.key
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        return multiSig.uuid
      },
      methods: [], children: []
    },
  ],
}

const MultiSigProposal = {
  value: "MultiSigProposal",
  title: "MultiSigProposal 多签名提案",
  description: "多签交易提案。这是围绕外部函数的包装器，当批准量达到多重签名帐户上设置的签名阈值时，将执行该外部函数",
  source: async ({ api }) => {
    const account = await api.accountManagement.getSigningAccount()
    const multiSig = await account.getMultiSig()
    const proposals = await multiSig.getProposals()
    return proposals
  },
  methods: [
    { value: 'details', title: 'details	详', description: '获取建议的详细信息。这包括批准和拒绝的数量、到期时间以及包装的外联函数的详细信息', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定此提案是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回人类可读的表示形式', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    { value: 'isUniqueIdentifiers', title: 'isUniqueIdentifiers	isUniqueIdentifiers', description: '类型保护，用于检查传递的对象是否与类的唯一标识符相对应。必须覆盖', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'id', title: 'id	编号', description: '编号',
      source: async ({ api, number }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        const proposals = await multiSig.getProposals()
        return proposals[number].id
      },
      methods: [], children: []
    },
    {
      value: 'multiSig', title: 'multiSig	多签', description: '多签',
      source: async ({ api, number }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        const proposals = await multiSig.getProposals()
        return proposals[number].multiSig
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, number }) => {
        const account = await api.accountManagement.getSigningAccount()
        const multiSig = await account.getMultiSig()
        const proposals = await multiSig.getProposals()
        return proposals[number].uuid
      },
      methods: [], children: []
    },
  ],
}
const NumberedPortfolio = {
  value: "NumberedPortfolio",
  title: "NumberedPortfolio 编号投资组合",
  description: "表示标识的编号（非默认）组合",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity()
    const defaultPor = await identity.portfolios.getPortfolio({
      portfolioId: new BigNumber(1)
    })
    return defaultPor
  },
  methods: [
    { value: 'createdAt', title: 'createdAt	创建于', description: '检索创建此投资组合时发出的事件的标识符数据（区块号、日期和事件索引）|使用中间件|在请求数据时，数据可能尚未准备就绪。在这种情况下，返回null', options: {}, available: true, isOptionRequired: false },
    { value: 'createdAtV2', title: 'createdAtV2	创建AtV2', description: '检索创建此投资组合时发出的事件的标识符数据（区块号、日期和事件索引）|使用中间件V2|在请求数据时，数据可能尚未准备就绪。在这种情况下，返回null', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '返回此投资组合是否存在', options: {}, available: true, isOptionRequired: false },
    { value: 'getAssetBalances', title: 'getAssetBalances	获取资产余额', description: '检索此投资组合中所有资产的余额', options: {}, available: true, isOptionRequired: false },
    { value: 'getCustodian', title: 'getCustodian	获取保管人', description: '检索此投资组合的托管人身份|如果未设置保管人，则返回所有者标识', options: {}, available: true, isOptionRequired: false },
    { value: 'getName', title: 'getName	获取名称', description: '返回投资组合名称', options: {}, available: true, isOptionRequired: false },
    { value: 'getTransactionHistory', title: 'getTransactionHistory	获取交易历史记录', description: '检索涉及此项目组合的交易列表。可以使用参数进行过滤|支持分页|使用中间件', options: {}, available: false, isOptionRequired: false },
    { value: 'getTransactionHistoryV2', title: 'getTransactionHistoryV2	获取交易历史记录V2', description: '检索涉及此项目组合的交易列表。可以使用参数进行过滤|使用中间件V2', options: {}, available: false, isOptionRequired: false },
    { value: 'isCustodiedBy', title: 'isCustodiedBy	是保管人', description: '返回标识是否为项目组合保管人', options: { identity: 'did账户' }, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'isOwnedBy', title: 'isOwnedBy	是拥有者', description: '返回标识是否为项目组合所有者', options: {}, available: true, isOptionRequired: false },
    { value: 'modifyName', title: 'modifyName	修改名称', description: '重命名投资组合|所需角色：投资组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'moveFunds', title: 'moveFunds	移动基金', description: '将资金从此投资组合转移到同一身份拥有的另一个投资组合|所需角色：投资组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'quitCustody', title: 'quitCustody	退出监护权', description: '单方面将投资组合的保管权归还给投资组合所有者|所需角色：投资组合托管人', options: {}, available: true, isOptionRequired: false },
    { value: 'setCustodian', title: 'setCustodian	设置保管人', description: '向身份发送邀请，将其指定为此投资组合的保管人|这将创建一个授权请求，该请求必须由 接受。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。targetIdentity|所需角色：投资组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回投资组合 ID 和所有者 DID', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    {
      value: 'id', title: 'id	编号', description: '投资组合标识符编号',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolio({
          portfolioId: new BigNumber(1)
        })
        return defaultPor.id
      },
      methods: [], children: []
    },
    {
      value: 'owner', title: 'owner	所有者', description: '投资组合所有者的身份',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolio({
          portfolioId: new BigNumber(1)
        })
        return defaultPor.owner
      },
      methods: Identity.methods, children: Identity.children
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api }) => {
        const identity = await api.getSigningIdentity()
        const defaultPor = await identity.portfolios.getPortfolio({
          portfolioId: new BigNumber(1)
        })
        return defaultPor.uuid
      },
      methods: [], children: []
    },
  ],
}
const Offering = {
  value: "Offering",
  title: "Offering 提供",
  description: "表示Polymesh区块链中的资产产品",
  source: async ({ api, ticker }) => {
    const assets = await api.assets.getAsset({ ticker })
    const offerings = await assets.offerings.get();
    return offerings
  },
  methods: [
    { value: 'close', title: 'close	关闭', description: '关闭产品|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 close.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    { value: 'details', title: 'details	详', description: '检索产品的详细信息|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定该产品是否存在于链上', options: {}, available: true, isOptionRequired: false },
    { value: 'freeze', title: 'freeze	冻结', description: '冻结产品|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 freeze.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限。', options: {}, available: true, isOptionRequired: false },
    { value: 'getInvestments', title: 'getInvestments	获取投资', description: '检索对本次发行进行的所有投资|支持分页|使用中间件', options: {}, available: true, isOptionRequired: false },
    { value: 'getInvestmentsV2', title: 'getInvestmentsV2	获取投资V2', description: '检索对本次发行进行的所有投资|支持分页|使用中间件 V2', options: {}, available: true, isOptionRequired: false },
    { value: 'invest', title: 'invest	投资', description: '投资产品|所需角色：1、购买投资组合托管人；2、资金组合托管人', options: {}, available: false, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'modifyTimes', title: 'modifyTimes	修改时间', description: '修改产品的开始/结束时间|如果：1、尝试修改已开始的产品的开始时间；2、尝试修改产品上已结束的任何内容；3、尝试将开始或结束时间更改为过去的日期', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回产品的 ID 和资产代码', options: {}, available: true, isOptionRequired: false },
    { value: 'unfreeze', title: 'unfreeze	解冻', description: '解冻产品', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },
  ],
  children: [
    Asset,
    {
      value: 'id', title: 'id	编号', description: '发行的标识符号',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const offerings = await assets.offerings.get();
        return offerings[number].id
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, ticker, number }) => {
        const assets = await api.assets.getAsset({ ticker })
        const offerings = await assets.offerings.get();
        return offerings[number].uuid
      },
      methods: [], children: []
    },
  ],
}

const Subsidy = {
  value: "Subsidy",
  title: "Subsidy 补贴",
  description: "代表链上的补贴关系",
  source: async ({ api }) => {
    const account = await api.accountManagement.getSigningAccount()
    const subsid = await account.getSubsidy()
    return subsid ? subsid.subsidy : '没有查到数据'
  },
  methods: [
    { value: 'decreaseAllowance', title: 'decreaseAllowance	减少津贴', description: '减少此补贴关系的免税额|只允许补贴者减少津贴|如果减少的金额超过现有津贴|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 reductionAllowance.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: { allowance: 100 }, available: false, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定这种补贴关系是否存在链上链', options: {}, available: true, isOptionRequired: false },
    { value: 'getAllowance', title: 'getAllowance	获取津贴', description: '获得此补贴关系的POLYX补贴金额|如果补贴不存在', options: {}, available: true, isOptionRequired: false },
    { value: 'increaseAllowance', title: 'increaseAllowance	增加津贴', description: '增加此补贴关系的津贴|只允许补贴者增加津贴', options: {}, available: false, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'quit', title: 'quit	退出', description: '终止此补贴关系。受益人账户将被迫支付自己的交易费用|受惠人和受资助人均可单方面退出补贴|此方法的类型为 NoArgsProcedureMethod，这意味着您可以对其调用 quit.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: true, isOptionRequired: false },
    { value: 'setAllowance', title: 'setAllowance	设置津贴', description: '为此补贴关系设定津贴|只允许补贴者设置津贴|如果要设置的津贴等于当前津贴|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 setAllowance.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回补贴的静态数据', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },

  ],
  children: [
    {
      value: 'beneficiary', title: 'beneficiary	受益人', description: '为其支付交易的账户',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const subsid = await account.getSubsidy()
        return subsid ? subsid.subsidy.beneficiary : '没有查到数据'
      },
      methods: Account.methods, children: Account.children
    },
    {
      value: 'subsidizer', title: 'subsidizer	补贴机构', description: '支付交易费用的帐户',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const subsid = await account.getSubsidy()
        return subsid ? subsid.subsidy.subsidizer : '没有查到数据'
      },
      methods: Account.methods, children: Account.children
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api }) => {
        const account = await api.accountManagement.getSigningAccount()
        const subsid = await account.getSubsidy()
        return subsid ? subsid.subsidy.uuid : '没有查到数据'
      },
      methods: [], children: []
    },

  ],
}

const TickerReservation = {
  value: "TickerReservation",
  title: "TickerReservation 股票代码预订",
  description: "表示Polymesh区块链中的保留资产符号。股票代码预订过期 经过一段时间后，它们可以由另一个身份保留。 股票代码必须事先由身份保留，以便该身份能够使用它创建资产",
  source: async ({ api }) => {
    const TickerReservations = await api.assets.getTickerReservations()
    return TickerReservations
  },
  methods: [
    { value: 'createAsset', title: 'createAsset	创建资产', description: '使用预留代码创建资产|所需角色：股票代码所有者', options: {}, available: false, isOptionRequired: false },
    { value: 'details', title: 'details	详', description: '检索预订的所有者、到期日期和状态|可以订阅', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定链上是否存在此股票代码预留', options: {}, available: true, isOptionRequired: false },
    { value: 'extend', title: 'extend	扩展', description: '从现在起将股票代码的预订时间段延长 60 天 以便稍后在创建资产时使用它。|所需角色：股票代码所有者', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回预订的股票代码', options: {}, available: true, isOptionRequired: false },
    { value: 'transferOwnership', title: 'transferOwnership	转让所有权', description: '将股票代码预留的所有权转让给另一个身份。这将生成必须接受的授权请求 按目标|这将创建必须由身份接受的授权请求。 帐户或身份可以通过调用 authorizations.getReceived 来获取其挂起的授权请求。 此外，帐户或身份可以通过调用 authorizations.getOne 直接获取授权请求的详细信息。target|所需角色：股票代码所有者', options: {}, available: false, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },

  ],
  children: [
    {
      value: 'ticker', title: 'ticker	股票', description: '保留的股票代码',
      source: async ({ api, number }) => {
        const TickerReservations = await api.assets.getTickerReservations()
        return TickerReservations[number].ticker
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, number }) => {
        const TickerReservations = await api.assets.getTickerReservations()
        return TickerReservations[number].uuid
      },
      methods: [], children: []
    },

  ],
}

// 场地类型 type：
// Distribution	分配
// Exchange	交换
// Other	另外
// Sto	斯托

const Venue = {
  value: "Venue",
  title: "Venue 场地",
  description: "表示处理结算的场所| 场地type类型:Distribution分配;Exchange交换;Other另外;Sto斯托",
  source: async ({ api }) => {
    const identity = await api.getSigningIdentity()
    const venue = await identity.getVenues()
    return venue
  },
  methods: [
    { value: 'addInstruction', title: 'addInstruction	添加指令', description: '在此场地创建结算指令|所需角色：场地所有者', options: {
      legs: [
        {
          amount: "金额",
          from: "资金来自组合",
          to: "目标账户",
          asset:"资产对象"
        }
      ]
    }, available: true, isOptionRequired: true },
    { value: 'addInstructions', title: 'addInstructions	添加说明', description: '在此场地创建一批结算说明|所需角色：场地所有者', options: {}, available: false, isOptionRequired: false },
    { value: 'details', title: 'details	详', description: '检索特定于此场地的信息', options: {}, available: true, isOptionRequired: false },
    { value: 'exists', title: 'exists	存在', description: '确定此场地是否存在连锁', options: {}, available: true, isOptionRequired: false },
    { value: 'getInstructions', title: 'getInstructions	获取说明', description: '在此场地检索所有待处理和失败的说明', options: {}, available: true, isOptionRequired: false },
    { value: 'getPendingInstructions', title: 'getPendingInstructions	获取待处理说明', description: '在此场地检索所有待处理的指示|已废弃|支持getInstructions', options: {}, available: true, isOptionRequired: false },
    { value: 'isEqual', title: 'isEqual	是平等的', description: '确定此实体是否与另一个实体相同', options: {}, available: false, isOptionRequired: false },
    { value: 'modify', title: 'modify	修改', description: '修改描述和类型|所需角色：场地所有者|修改的时候type必须不同', options: {
      description: 'ty01 Venue',
      type: 'Exchange',
    }, available: true, isOptionRequired: true },
    { value: 'toHuman', title: 'toHuman	到人类', description: '返回场地的ID', options: {}, available: true, isOptionRequired: false },
    // { value: 'generateUuid', title: 'generateUuid	生成Uuid', description: '从实体的标识属性生成实体的 UUID', options: {}, available: false, isOptionRequired: false },
    // { value: 'unserialize', title: 'unserialize	反序列化', description: '将 UUID 反序列化为其唯一标识符', options: {}, available: false, isOptionRequired: false },

  ],
  children: [
    {
      value: 'id', title: 'id	编号', description: '场地的标识符编号',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity()
        const venue = await identity.getVenues()
        return venue[number].id
      },
      methods: [], children: []
    },
    {
      value: 'uuid', title: 'uuid	uuid', description: '',
      source: async ({ api, number }) => {
        const identity = await api.getSigningIdentity()
        const venue = await identity.getVenues()
        return venue[number].uuid
      },
      methods: [], children: []
    },

  ],
}
// {
//   // 示例
//   value: "",
//   title: "",
//   description: "",
//   source: async () => { },
//   methods: [],
//   children: [],
// },
export default [...data,
  Account,
  Asset,
  Identity,
  AuthorizationRequest_identity,
  AuthorizationRequest_account,
  Checkpoint,
  CheckpointSchedule,
  CorporateAction,
  CustomPermissionGroup,
  KnownPermissionGroup,
  DefaultPortfolio,
  NumberedPortfolio,
  DefaultTrustedClaimIssuer,
  DividendDistribution,
  Instruction,
  MultiSig,
  MultiSigProposal,
  Offering,
  Subsidy,
  TickerReservation,
  Venue
]

