import { NextApiRequest, NextApiResponse } from 'next';

let cache: SheetDataResponse | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 1000;

interface SheetDataResponse {
  [key: string]: unknown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const now = Date.now();
  if (cache && now - lastFetch < CACHE_DURATION) {
    return res.status(200).json(cache);
  }

  try {
    const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
    const SHEET_TAB = 'Bits';
    const url = `https://gsx2json.com/api?id=${SHEET_ID}&sheet=${SHEET_TAB}`;

    const response = await fetch(url);
    const data: SheetDataResponse = await response.json();

    cache = data;
    lastFetch = now;

    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
