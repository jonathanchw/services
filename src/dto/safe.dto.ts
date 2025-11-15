export enum SafeOperationType {
  DEPOSIT = 'deposit',
  RECEIVE = 'receive',
  SWAP = 'swap',
  SEND = 'send',
  WITHDRAW = 'withdraw',
}

export enum FiatCurrency {
  CHF = 'chf',
  EUR = 'eur',
  USD = 'usd',
}

export interface CustodyAsset {
  name: string;
  description: string;
}

export interface CustodyAssetBalance {
  asset: CustodyAsset;
  balance: number;
  value: CustodyFiatValue;
}

export interface CustodyBalance {
  totalValue: CustodyFiatValue;
  balances: CustodyAssetBalance[];
}

export interface CustodyFiatValue {
  chf: number;
  eur: number;
  usd: number;
}

export interface CustodyHistoryEntry {
  date: string;
  value: CustodyFiatValue;
}

export interface CustodyHistory {
  totalValue: CustodyHistoryEntry[];
}
