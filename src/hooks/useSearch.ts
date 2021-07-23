import { useState } from 'react';

export interface IUseSearch {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const useSearch = () : IUseSearch => {
  const [search, setSearch] = useState('');

  return { search, setSearch };
}