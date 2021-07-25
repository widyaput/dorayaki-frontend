/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export interface ISortParam {
  field: string;
  order: string;
}

export const useSorter = (defaultSortParams: ISortParam[]): any => {
  const [sortParams, setSortParams] = useState<ISortParam[]>(defaultSortParams);

  const setSorter = (inputSortParams: ISortParam | ISortParam[]) => {
    const newSortParams = [];
    if (!Array.isArray(inputSortParams)) {
      newSortParams.push({ field: inputSortParams.field, order: inputSortParams.order });
    } else {
      for (let input of inputSortParams) {
        newSortParams.push({ field: input.field, order: input.order});
      }
    }
    
    setSortParams(newSortParams);
  };

  return { sortParams, setSortParams, setSorter };
};
