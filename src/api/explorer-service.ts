/* eslint-disable camelcase */
import axios from 'axios';
import { ExplorerAccountDTO, ExplorerInfoDTO } from '@models';
import { ExplorerAccountType, TransactionType } from '@appTypes';
import { TransactionDTO } from '@models/dtos/TransactionDTO';
import { PaginatedResponseBody } from '@appTypes/Pagination';
import Config from '@constants/config';
import { SearchSort } from '@screens/Search/Search.types';

const exploreApiUrl = Config.EXPLORER_API_URL;

const getExplorerAccountTypeFromResponseMeta = (
  search: string
): ExplorerAccountType => {
  if (search.includes('apollo')) return ExplorerAccountType.Apollo;
  else if (search.includes('atlas')) return ExplorerAccountType.Atlas;
  else if (search.includes('addresses')) return ExplorerAccountType.Atlas;
  throw Error('Given address does not belong to an account!');
};

const getExplorerInfo = async (): Promise<ExplorerInfoDTO> => {
  try {
    const response = await axios.get(`${exploreApiUrl}/info/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getExplorerAccounts = async (
  limit = 20,
  sort: SearchSort = SearchSort.Balance
): Promise<ExplorerAccountDTO[]> => {
  try {
    const response = await axios.get(
      `${exploreApiUrl}/accounts?limit=${limit}&sort=${sort}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const searchAddress = async (address: string): Promise<ExplorerAccountDTO> => {
  try {
    const response = await axios.get(`${exploreApiUrl}/search/${address}`);
    const { meta, data } = response.data;
    const type = getExplorerAccountTypeFromResponseMeta(meta.search);
    return data.account ? { ...data.account, type } : { ...data, type };
  } catch (error) {
    throw error;
  }
};

const getTransactionsOfAccount = async (
  address: string,
  page: number,
  limit: number,
  type?: TransactionType | ''
): Promise<PaginatedResponseBody<TransactionDTO[]>> => {
  try {
    if (!address) return { data: [], next: null };
    const response = await axios.get(
      `${exploreApiUrl}/accounts/${address}/transactions?page=${page}&limit=${limit}&type=${type}`
    );
    const nextUrl = response.data.pagination.hasNext
      ? `${exploreApiUrl}/accounts/${address}/transactions?page=${
          page + 1
        }&limit=${limit}&type=${type}`
      : null;
    return { data: response.data.data, next: nextUrl };
  } catch (error) {
    throw error;
  }
};

export const explorerService = {
  getExplorerInfo,
  getExplorerAccounts,
  searchAddress,
  getTransactionsOfAccount
};