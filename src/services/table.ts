/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPagination {
  current : number;
  pageSize : number;
  total : number;
}

interface IResponseData {
    items_per_page: number;
    total_items: number;
    page_index: number;
    sort: string;
    data: [];
}

export const tableResponse = (response : { data : IResponseData }) : any => {
  if(!response) return [];

  const { data } = response;
  const pagination : IPagination = {
    current: data.page_index,
    pageSize: data.items_per_page,
    total: data.total_items,
  }

  return { tableData: data, pagination }
}