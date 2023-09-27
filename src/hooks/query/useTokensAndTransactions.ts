import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedQueryResponse } from '@appTypes/QueryResponse';
import { API } from '@api/api';
import { Transaction, TokenDTO } from '@models';
import { PaginatedResponseBody } from '@appTypes/Pagination';
import { TransactionDTO } from '@models/dtos/TransactionDTO';

export function useTokensAndTransactions(
  address: string,
  page: number,
  limit: number,
  enabled: boolean
): PaginatedQueryResponse<{ tokens: TokenDTO[]; transactions: Transaction[] }> {
  const {
    data,
    hasNextPage,
    error,
    isInitialLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery<
    PaginatedResponseBody<{
      tokens: TokenDTO[];
      transactions: TransactionDTO[];
    }>
  >(['wallet-tokens-and-transactions', address, page, limit], {
    queryFn: ({ pageParam = 1 }) => {
      return API.explorerService.getTransactionsOfAccountV2(
        address,
        parseInt(pageParam),
        limit
      );
    },
    getNextPageParam: (
      lastPage: PaginatedResponseBody<{
        tokens: TokenDTO[];
        transactions: TransactionDTO[];
      }>
    ) => {
      if (lastPage.next) {
        return lastPage.next;
      }
      return null;
    },
    enabled
  });

  const tokens =
    data && data.pages
      ? (data.pages
          .map((page) => page.data.tokens)
          .flat(Number.POSITIVE_INFINITY) as TokenDTO[])
      : [];
  const transactions =
    data && data.pages
      ? (data.pages
          .map((page) =>
            page.data.transactions.map((t) => {
              const transaction = new Transaction(t);
              transaction.isSent = t.from === address;
              return transaction;
            })
          )
          .flat(Number.POSITIVE_INFINITY) as Transaction[])
      : [];

  return {
    data: data?.pages
      ? { tokens, transactions }
      : { tokens: [], transactions: [] },
    loading: isInitialLoading || isFetchingNextPage,
    error,
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage
  };
}
