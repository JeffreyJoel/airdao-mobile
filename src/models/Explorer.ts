import { ExplorerAccountType } from '@appTypes';
import { ExplorerAccountDTO, ExplorerInfoDTO } from './dtos';

export class ExplorerInfo {
  totalAddresses: number;
  totalHolders: number;
  totalSupply: number;

  constructor(details: ExplorerInfoDTO) {
    this.totalAddresses = details.accounts.total;
    this.totalHolders = details.accounts.withBalance;
    this.totalSupply = details.totalSupply;
  }
}

export class ExplorerAccount {
  _id: string;
  address: string;
  ambBalance: number;
  transactionCount: number;
  type: ExplorerAccountType;

  constructor(details: ExplorerAccountDTO) {
    this._id = details._id;
    this.address = details.address;
    this.ambBalance = details.balance.ether;
    this.transactionCount = details.totalTx;
    this.type = details.type;
  }

  calculatePercentHoldings(totalSupply: number): number {
    return (this.ambBalance / totalSupply) * 100;
  }
}
