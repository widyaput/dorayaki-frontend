import { ISortParam } from "@/hooks/useSorter";
import { AxiosInstance } from "axios";

export interface IGetStockResponse {
  key: string;
  fetcher: any;
}


export const getStock = (
  instance: AxiosInstance,
  idShop: number,
  page: number,
  limit: number,
  search: string,
  sortParams: ISortParam[],
): IGetStockResponse => {
  const params = new URLSearchParams({
    pageIndex: page.toString(),
    itemsPerPage: limit.toString(),
    dorayaki: search,
  })

  let key = `/shops/${idShop}/stocks?${params.toString()}`;
  for (let param of sortParams) {
    key += `&sort=${(param.order === 'descend' ? '-' : '')+param.field}`
  }
  const fetcher = async () => {
    const response = await instance.get(key);
    return response.data;
  }

  return {key, fetcher};
}