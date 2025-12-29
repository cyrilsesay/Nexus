
export enum PaymentMethodType {
  ORANGE_MONEY = 'ORANGE_MONEY',
  AFRI_MONEY = 'AFRI_MONEY',
  CARD = 'CARD'
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethodType;
  status: TransactionStatus;
  customerName: string;
  customerPhone?: string;
  cardNumber?: string;
  timestamp: string;
}

export interface BusinessStats {
  totalVolume: number;
  transactionCount: number;
  successRate: number;
  avgTicketSize: number;
}
