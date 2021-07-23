/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export interface ISortParam {
  field: string;
  order: string;
}

export const useSorter = (defaultSortParams: ISortParam[]): any => {
  const [sortParams, setSortParams] = useState<ISortParam[]>(defaultSortParams);

  const setSorter = (inputSortParams: any) => {
    const newSortParams = [];

    newSortParams.push({ field: inputSortParams.field, order: inputSortParams.order });

    setSortParams(newSortParams);
  };

  return { sortParams, setSortParams, setSorter };
};
