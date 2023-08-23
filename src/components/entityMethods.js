export const assetPermissionsMethods = [
  { value: 'checkPermissions', title: 'checkPermissions	检查权限', description: '检查此身份是否对资产具有特定的事务权限', options: {}, available: false, isOptionRequired: false },
  { value: 'enabledAt', title: 'enabledAt	启用在', description: '检索启用/添加此标识时发出的事件的标识符数据（块号、日期和事件索引） 对特定资产具有权限的代理|使用中间件', options: {}, available: false, isOptionRequired: false },
  { value: 'enabledAtV2', title: 'enabledAtV2	已启用AtV2', description: '检索启用/添加此标识时发出的事件的标识符数据（块号、日期和事件索引） 对特定资产具有权限的代理|使用中间件V2', options: {}, available: false, isOptionRequired: false },
  { value: 'get', title: 'get	获取', description: '检索此标识具有权限的所有资产，以及相应的权限组', options: {}, available: true, isOptionRequired: false },
  { value: 'getGroup', title: 'getGroup	获取组', description: '检索特定资产的此身份的权限组', options: {}, available: false, isOptionRequired: false },
  { value: 'getOperationHistory', title: 'getOperationHistory	获取操作历史记录', description: '检索此标识对特定资产执行的操作触发的所有事件|使用中间件|支持分页', options: {}, available: false, isOptionRequired: false },
  { value: 'getOperationHistoryV2', title: 'getOperationHistoryV2	获取操作历史V2', description: '检索此标识对特定资产执行的操作触发的所有事件|使用中间件V2|支持分页', options: {}, available: false, isOptionRequired: false },
  { value: 'hasPermissions', title: 'hasPermissions	有权限', description: '检查此身份是否对资产具有特定的事务权限|已弃用|支持checkPermissions', options: {}, available: false, isOptionRequired: false },
  { value: 'setGroup', title: 'setGroup	设置组', description: '将此身份分配给给定资产的其他权限组|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 setGroup.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
  { value: 'waive', title: 'waive	放弃', description: '从给定资产的当前权限组中退位。这意味着此身份将不再对所述资产拥有任何权限|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 waive.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {}, available: false, isOptionRequired: false },
]

export const IdentityAuthorizations = [
  { value: 'getOne', title: 'getOne	得到一个', description: '按其 ID 检索此标识目标或发出的单个授权请求', options: { id: 50039 }, available: true, isOptionRequired: true },
  { value: 'getReceived', title: 'getReceived	获取接收', description: '获取此签名者作为其目标的所有待处理授权请求', options: {
    type: 'TransferAssetOwnership'
  }, available: true, isOptionRequired: false },
  { value: 'getSent', title: 'getSent	获取发送', description: '获取此标识发出的所有待处理授权请求|支持分页', options: {}, available: true, isOptionRequired: false },
]
export const AccountAuthorizations = [
  { value: 'getOne', title: 'getOne	得到一个', description: '按标识检索针对此签名者的单个授权请求', options: {}, available: false, isOptionRequired: false },
  { value: 'getReceived', title: 'getReceived	获取接收', description: '获取此签名者作为其目标的所有待处理授权请求', options: {}, available: true, isOptionRequired: false },
]
export const Portfolios = [
  {
    value: 'delete', title: 'delete	删去', description: '按 ID 删除投资组合|所需角色：投资组合托管人|此方法的类型为 ProcedureMethod，这意味着您可以对其调用 delete.checkAuthorization，以查看签名帐户和标识是否具有运行它所需的角色和权限', options: {
      portfolio: 1,
      说明: '通过组合id或者对应组合实体删除组合'
    }, available: true, isOptionRequired: true
  },
  { value: 'getCustodiedPortfolios', title: 'getCustodiedPortfolios	获取客户投资组合', description: '检索由此身份保管的所有投资组合。 这仅包括由不同身份拥有但由该身份托管的投资组合。 要获取此身份拥有的投资组合，请使用 getPortfolios|支持分页', options: {}, available: true, isOptionRequired: false },
  {
    value: 'getPortfolio', title: 'getPortfolio	获取投资组合', description: '检索编号的投资组合或默认投资组合（如果未传递投资组合 ID）',
    options: {
      portfolioId: 0
    },
    available: true, isOptionRequired: true
  },
  { value: 'getPortfolios', title: 'getPortfolios	获取投资组合', description: '检索此身份拥有的所有投资组合', options: {}, available: true, isOptionRequired: false },
]