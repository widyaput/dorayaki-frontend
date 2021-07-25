import axios from '@/modules/axios';

export const getShop = (id: number): {key: string, fetcher: any} => {
  const key = `/shops/${id}`;

  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }

  return { key, fetcher };
}