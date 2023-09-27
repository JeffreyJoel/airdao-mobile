export interface TokenDTO {
  address: string;
  name: string;
  balance: {
    wei: string;
    ether: number;
  };
  symbol: string;
}
