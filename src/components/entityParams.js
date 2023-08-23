import { BigNumber } from '@polymeshassociation/polymesh-sdk';
export const addClaimsOption = {
  "claims": [
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "BuyLockup",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "SellLockup",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": "2022-12-22T08:32:42.870Z",
      "claim": {
        "type": "KnowYourCustomer",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "Jurisdiction",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        },
        "code": "Cn"
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "Accredited",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "Affiliate",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "Exempted",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": null,
      "claim": {
        "type": "Blocked",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    }
  ]
}
export const revokeClaimsOption = {
  "claims": [
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "BuyLockup",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "SellLockup",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "KnowYourCustomer",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "Jurisdiction",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        },
        "code": "Cn"
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "Accredited",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "Affiliate",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "Exempted",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    },
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "claim": {
        "type": "Blocked",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    }
  ]
}
export const editClaimsOption = {
  "claims": [
    {
      "target": "0x1a3fb688e10f4a544ab627c74b4059133ac81cc8a09cb947dbb65ff55d56c975",
      "expiry": new Date('2022-12-30'),
      "claim": {
        "type": "BuyLockup",
        "scope": {
          "type": "Ticker",
          "value": "TY001"
        }
      }
    }
  ]
}
export const modifyPermissionsOption= {
  secondaryAccounts: [
    {
      account: 'did账户',
      permissions: {
        assets: null, // 资产
        portfolios: null,// 投资 组合
        transactionGroups: null,// 事务组
        transactions: null,// 交易
      },
    },
  ],
}
// Assets -> Offering -> launch 方法
export const offeringsLanchOptionFun = async (api) => {
  const identity = await api.getSigningIdentity()
  console.log('=========:', identity)
  const [venue] = await identity.getVenues();
  const offeringPortfolio = await identity.portfolios.getPortfolio();
  const raisingPortfolio = await identity.portfolios.getPortfolio({
    portfolioId: new BigNumber(2),
  });

  return {
    offeringPortfolio, // optional, defaults to the PIA's default portfolio
    raisingPortfolio,
    raisingCurrency: 'USD_COIN',
    venue, // optional, defaults to the first "Offering" type venue created by the owner of the Offering Portfolio
    name: 'MY_STO',
    start: new Date(new Date().getTime() + 60 * 1000 * 20), // optional, defaults to right now
    end: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000), // optional, defaults to never
    tiers: [
      {
        price: new BigNumber(100),
        amount: new BigNumber(1000),
      },
      {
        price: new BigNumber(150),
        amount: new BigNumber(500),
      },
    ],
    minInvestment: new BigNumber(750),
  }
}