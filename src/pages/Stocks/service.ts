import { ISortParam } from "@/hooks/useSorter";
import axios from "@/modules/axios";
import { AxiosInstance } from "axios";
import { mutate } from "swr";

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

export const mutateStock = (
  instance: AxiosInstance,
  idShop: number,
  idDorayaki: number,
  inputStock: number,
  key: any,
) => {
  const url = `/shops/${idShop}/stocks/${idDorayaki}`;
  const mutator = async () => {
    await instance.post(url, {
      add_stok: inputStock
    });
    mutate(key);
  }
  return mutator;
}

export const transferStock = (
  instance: AxiosInstance,
  idShop: number,
  targetShop: number,
  idDorayaki: number,
  inputStock: number,
  key: any,
) => {
  const url = `/shops/${idShop}/transfer/${targetShop}`;
  const mutator = async () => {
    await instance.post(url, {
      stock: inputStock,
      id_dorayaki: idDorayaki,
    });
    mutate(key);
  }
  return mutator;
}

export const getAllDorayaki = () => {
  const key = '/dorayakis';

  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }
  return { key, fetcher }
}

export const getAllShop = () => {
  const key = '/shops';
  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }

  return { key, fetcher }
}