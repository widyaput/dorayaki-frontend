import { ISortParam } from "@/hooks/useSorter";
import { AxiosInstance } from "axios";

export interface IGetDorayakiResponse {
  key: string;
  fetcher: any;
}

export const getShops = (
  instance: AxiosInstance,
  page: number,
  limit: number,
  kecamatan: string,
  provinsi: string,
  sortParams: ISortParam[],
): IGetDorayakiResponse => {
  const { field, order } = sortParams[0];
  const params =  new URLSearchParams({
    pageIndex: page.toString(),
    itemsPerPage: limit.toString(),
    kecamatan,
    provinsi,
    sort: (order === 'descend' ? '-' : '' )+`${field}`
  })

  const key = `/shops/search?${params.toString()}`;
  const fetcher = async () => {
    const response = await instance.get(key);
    return response.data;
  }

  return {key, fetcher};
};
