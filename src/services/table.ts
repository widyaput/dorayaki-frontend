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
    total_pages: number;
    data: [];
}

export const tableResponse = (data : IResponseData) : any => {
  if(!data) return [];

  const pagination : IPagination = {
    current: data.page_index,
    pageSize: data.items_per_page,
    total: data.total_items,
  }
  return { tableData: data.data, pagination }
}