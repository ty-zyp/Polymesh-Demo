# Account 账户
## 属性：
address
authorizations
key
uuid
## 方法：
**checkPermissions**  检查权限：检查此帐户是否拥有代表其相应身份执行操作的某些权限checkPermissions  检查权限：

**exists**  存在：确定此账户是否存在于链上exists  存在：

**getBalance** 获取余额getBalance：

**getCurrentNonce** 检索此帐户的当前随机数getCurrentNonce：

**getIdentity** 获取身份：检索与此帐户关联的标识（如果没有，则为 null）getIdentity：
  ### 属性
    **assetPermissions** 资产许可证

    **authorizations** 授权

    **did** 做

    **portfolios** 投资组合

    **uuid** uuid

  ### 方法
    **areSecondaryAccountsFrozen** 第二帐户已冻结：检查辅助账户是否被冻结

    **checkRoles** 选中角色：检查此标识是否拥有所有指定的角色

    **exists** 存在：确定链上是否存在此身份

    **getAssetBalance** 获取资产余额：检索特定资产的余额

    **getHeldAssets** 获取固定资产：检索此标识在某一点持有的所有资产的列表

    **getHeldAssetsV2** 获取资产V2：检索此标识在某一点持有的所有资产的列表

    **getInstructions** 获取说明：检索此身份为参与者的所有指令， 按状态分组

    **getPendingDistributions** 获取待定分发：检索此身份有资格且尚未支付的每个股息分配

    **getPendingInstructions** 获取待处理指令：检索涉及此身份的所有待处理指令

    **getPrimaryAccount** 获取主要帐户：检索与标识关联的主帐户

    **getScopeId** 获取范围Id：检索与此身份的特定资产的投资者唯一性声明关联的范围 ID，或 null 如果没有

    **getSecondaryAccounts** 获取辅助帐户：获取与标识相关的辅助帐户列表

    **getTrustingAssets** 获取托管资产：获取此标识是受信任声明颁发者的资产列表

    **getTrustingAssetsV2** 获取信任资产V2：获取此标识是受信任声明颁发者的资产列表

    **getVenues** 获得场地：检索此标识创建的所有场所

    **hasRole** 具有角色：检查此身份是否拥有指定的角色

    **hasRoles** 具有角色：检查此标识是否拥有所有指定的角色

    **hasValidCdd** 具有有效Cdd：检查此标识是否具有有效的 CDD 声明

    **isCddProvider** isCdd提供程序：检查此标识是否为 CDD 提供程序

    **isEqual** 等于：确定此实体是否与另一个实体相同

    **isGcMember** isGc成员：检查此标识是否为治理委员会成员

    **toHuman** 到人类：返回标识的 DID

    **generateUuid** 生成Uuid：从实体的标识属性生成实体的 UUID

    **unserialize** 反序列化：将 UUID 反序列化为其唯一标识符



**getMultiSig** 获取多签：获取此帐户所属的多重签名。如果此帐户不是任何多重签名的签名者，则返回 nullgetMultiSig：

**getPermissions** 获取权限：检索此帐户作为其相应标识的权限帐户的权限getPermissions 

**getSubsidy** 获得补贴：获取此账户和补贴账户的补贴余额。如果 此帐户未获得补贴，返回空值getSubsidy：

**getTransactionHistory** 获取交易历史记录：检索此帐户签名的交易列表。可以使用参数进行过滤

**getTransactionHistoryV2** 获取交易历史记录V2

**hasPermissions** 有权限：检查此用户是否拥有代表其相应身份执行操作的某些权限

**isEqual** 平等的：确定此实体是否与另一个实体相同

**isFrozen** 是冻结的：检查此帐户是否被冻结。如果冻结，则在身份的主帐户解冻所有辅助帐户之前，它无法执行任何与身份相关的操作

**toHuman** 返回帐户地址

**generateUuid** 生成Uuid：从实体的标识属性生成实体的 UUID

**unserialize** 反序列化：将 UUID 反序列化为其唯一标识符

​



# Asset实体
## 属性

**assetHolders** 资产持有人：

**checkpoints** 检查点

**compliance** 合规

**corporateActions** 企业行动

**did** 资产的身份ID（用于索赔）

**documents** 文档

**issuance** 发行

**offerings** 供品

**permissions** 权限

**settlements** 定居点

**ticker** 股票

**transferRestrictions** 转让限制

**uuid** uuid


## 方法
**controllerTransfer** 控制器传输：强制从给定投资组合转移到调用方的默认投资组合

**createdAt** 创建时间：检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引）

**createdAtV2** 创建于V2：检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引）

**currentFundingRound** 当前融资轮次

**details** 细节：检索资产的数据

**exists** 存在：确定此资产是否存在于链上

**freeze** 冻结：冻结资产的转移

**getIdentifiers** 获取标识符：检索资产的标识符列表

**getOperationHistory** 获取操作历史记录：检索此资产的操作历史记录

**getOperationHistoryV2** 获取操作历史记录V2

**investorCount** 投资者计数：检索持有此资产的唯一投资者的数量

**isEqual** 等于：确定此实体是否与另一个实体相同

**isFrozen** 是冻结的：检查资产的转账是否被冻结

**modify** 修改：修改资产的某些属性

**modifyPrimaryIssuanceAgent** 修改主要发行代理：为资产分配新的主发行代理

**redeem** 赎回：赎回（销毁）一定数量的此资产代币

**removePrimaryIssuanceAgent** 删除主要发行代理：删除资产的主要发行代理（如果未设置主要发行代理，则默认使用资产所有者）

**toHuman** 到人类：返回资产的股票代码

**transferOwnership** 转让所有权：将资产的所有权转让给另一个身份。这将生成必须接受的授权请求 由收件人

**unfreeze** 解冻：解冻资产的转移

**generateUuid** 生成Uuid：从实体的标识属性生成实体的 UUID

**unserialize** 反序列化：将 UUID 反序列化为其唯一标识符


# 授权 Authorization Request
## 属性

authId** 身份验证ID：与授权类型对应的授权请求数据

**data** 数据：

**expiry** 到期：授权请求到期且无法再被接受的日期。 此时，必须发出新的授权请求。如果请求永不过期，则为 null

**issuer** 发行人

**target** 目标：向其发出请求的身份或帐户

**uuid** uuid

## 方法

**accept** 接受：接受授权请求。您必须是请求的目标才能接受它

**exists** 存在：确定此授权请求是否存在于链上

**isEqual** 等于：确定此实体是否与另一个实体相同

**isExpired** 已过期:返回授权请求是否已过期

**remove** 去除:删除授权请求
  如果您是请求颁发者，这将取消授权
  如果您是请求目标，这将拒绝授权

**toHuman** 到人类：返回授权的静态数据

**generateUuid** 生成Uuid：从实体的标识属性生成实体的 UUID

**unserialize** 反序列化：将 UUID 反序列化为其唯一标识符