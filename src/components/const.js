export const accountList = [
  {
    value: "address ripple okay pulse aisle magic submit bacon cereal anger dream during",
    label: "tyzyp",
    accountNo: "账户1",
    addres: "5HR15dJ26BfbQAxBpNYzzNKqZfHQeS12h4jmBZzg8r4B4QpS",
  },
  {
    value: "lunar observe decide network during seek upon athlete swallow omit praise replace",
    label: "ty",
    accountNo: "账户2",
    address: "5H8SiEmQtA9VhbRfpzENVmsVjF6L6kZqNvV5qWL8KKWwxp71",
    children: [
      {
        value: "donate armor climb laundry powder roast inhale hover soda exact ring void",
        label: "ty_01",
        accountNo: "账户2-2级账户01",
        address: "5Dt3xYGL62g62aRhCWQBFC7FL8XTm7L8PooLZktb5b3uynUH",
        children: [],
      },
      {
        value: "water silk lucky budget main load carbon accuse insane tissue amazing virus",
        label: "ty_02",
        accountNo: "账户2-2级账户02",
        address: "5FRotydFHFYk6SUPUUXBp3o6CL2Pz5uSXHLhQMx8YrG3kp2w",
        children: [],
      },
    ],
  },
  {
    value: "leader puppy endless decide secret become zebra observe hurt deposit rifle warfare",
    label: "tianying",
    accountNo: "账户3",
    address: "5FRCDiznJwYNYv6kq7its8ry6xUWQDqVdcMSqve5nVdyj6pi",
    children: [
      {
        value: "genuine balcony biology consider giggle desert drift noodle summer figure priority rug",
        label: "tianying_01",
        accountNo: "账户3-2级账户01",
        address: "5Cts6oxfex8CCoUMpsGvjJFvfqo3t6Xyf3qay5ufpF95Q5TY",
        children: [],
      },
      {
        value: "amount wagon monkey caution mushroom casual kit damage never proof casual crew",
        label: "tianying_02",
        accountNo: "账户3-2级账户02",
        address: "5Cqw6nKfui71PCv5BLrjegR4VjvfRcMJNHQUbQ2xTR4yWT2z",
        children: [],
      },
      {
        value: "artefact exclude what cry tumble episode sugar giant maze town pioneer syrup",
        label: "tianying_03",
        accountNo: "账户3-2级账户03",
        address: "5GGrMcnnzGwyZ5wz6sDWBDgv5ysGTaLWSEyE2aQN37nf8PPd",
        children: [],
      },
    ],
  },
  {
    value: "pizza twist holiday fiscal garlic shell flash rough cook floor tornado fatigue",
    label: "zyp",
    accountNo: "账户4",
    address: "5CAxdgwYy7nYYCwdnWicZGsV7AEGg5sGA9KsU2k57WibkagA",
    children: [],
  },
  {
    value: "nothing boost avocado mystery disease hat buddy van head choice chaos kind",
    label: "zyp01",
    accountNo: "账户5",
    address: "5Ci1fLJdgR7QBGgubYs3Uj8doquE6h8bKxHgXyNYerYQxh9w",
    children: [],
  },
];

export const menuArr = [
  { name: "polymesh-sdk", url: "/sdk" },
  { name: "polkadot", url: "/polkat" },
  { name: "entity", url: "/entity" },
];
// sdk
export const menuSdkList = [
  { name: "账户[accountMenagement]", url: "/sdk/accountMenagement" },
  { name: "资产[assets]", url: "/sdk/assets" },
  { name: "身份[identities]", url: "/sdk/identities" },
  { name: "声明[claims]", url: "/sdk/claims" },
  { name: "结算[settlements]", url: "/sdk/settlements" },
  { name: "网络[network]", url: "/sdk/network" },
  { name: "demo", url: "/sdk/demo" },
  { name: "demo1", url: "/sdk/demo1" },
];
// polkat
export const menuPolkatList = [
  { name: "初始化", url: "/polkat/init" },
  { name: "Json导入账户", url: "/polkat/import" },
  { name: "账户", url: "/polkat/account" },
  { name: "API", url: "/polkat/api" },
];
export const menuEntity = [{ name: "初始化", url: "/entity" }];

export const saveAccount = (key, value) => {
  console.log(key, value);
  const curtime = Date.now();
  localStorage.setItem(
    key,
    JSON.stringify({
      time: curtime,
      ...value,
    })
  );
};

export const getAccount = (key, exp) => {
  const val = localStorage.getItem(key);
  const dataObj = JSON.parse(val);
  console.log(key, exp, dataObj);
  if (Date.now() - dataObj?.time > exp) {
    return null;
  }
  return dataObj;
};

// export const connect = async (accountKey, no,) { // 初始化账号，创建长链接
// 	console.log('秘钥：', accountKey)
// 	this.signingManager = await LocalSigningManager.create({
// 		"accounts": [{ "mnemonic": accountKey }]
// 	});
// 	const apiAlice = await Polymesh.connect({
// 		nodeUrl: 'wss://testnet-rpc.polymesh.live',
// 		"signingManager": this.signingManager
// 	});
// 	console.log(no === 1 ? '主账户' : '辅助账户|第二账户', '链接成功：', apiAlice);
// 	const acme = await apiAlice.getSigningIdentity();
// 	const did = acme.did;
// 	if (no === 2) { // 需要返回值
// 		window.assitAccountKey = this.assitAccountKey;
// 		this.assitAccount = apiAlice;
// 		window.assitAccount = apiAlice;
// 		this.assitAccountDid = did;
// 		window.assitAccountDid = did;
// 		console.log('辅助账户did assitAccountDid', did, apiAlice);
// 		return apiAlice;
// 	} else {
// 		window.accountKey = this.accountKey;
// 		this.apiAlice = apiAlice;
// 		window.apiAlice = apiAlice;
// 		this.apiAlickDid = did;
// 		window.apiAlickDid = did;
// 		console.log('主账户did apiAlickDid', did, apiAlice);
// 	}
// },
