import { DEFAULT_API_PREFIX } from "@/config/default"
import axios from '@/modules/axios'

export const getUser = () => {
  const key = `${DEFAULT_API_PREFIX}/checkProfile`
  const fetcher = async () => {
    const resp = await axios.get(key);
    return resp.data;
  }

  return {key, fetcher};
}