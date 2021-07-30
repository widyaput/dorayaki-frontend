import { useState } from 'react';

import { DEFAULT_PER_PAGE_PAGINATION } from '../config/default';

export interface IPaginationTableAntd {
  current: number;
  pageSize: number;
}

export interface IUsePagination {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPagination: (newValue: IPaginationTableAntd) => void;
}

export const usePagination = (): IUsePagination => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE_PAGINATION);

  const setPagination = (newValue: IPaginationTableAntd) => {
    setPage(newValue.current);
    setPerPage(newValue.pageSize);
  };

  return { page, setPage, perPage, setPerPage, setPagination };
};
