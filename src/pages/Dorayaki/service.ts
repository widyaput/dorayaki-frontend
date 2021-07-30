import { ISortParam } from "@/hooks/useSorter";
import { AxiosInstance } from "axios";

export interface IGetDorayakiResponse {
  key: string;
  fetcher: any;
}

export const getDorayakis = (
  instance: AxiosInstance,
  page: number,
  limit: number,
  search: string,
  sortParams: ISortParam[],
): IGetDorayakiResponse => {
  const { field, order } = sortParams[0];
  const params =  new URLSearchParams({
    pageIndex: page.toString(),
    itemsPerPage: limit.toString(),
    dorayaki: search,
    sort: (order === 'descend' ? '-' : '' )+`${field}`
  })

  const key = `/dorayakis/search?${params.toString()}`;
  const fetcher = async () => {
    const response = await instance.get(key);
    return response.data;
  }

  return {key, fetcher};
};
