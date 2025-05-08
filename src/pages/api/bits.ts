import { NextApiRequest, NextApiResponse } from 'next';

interface SheetDataResponse {
  [key: string]: unknown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const SHEET_ID: string | undefined = process.env.NEXT_PUBLIC_SHEET_ID;
  const SHEET_TAB: string = 'Bits';

  const url: string = `https://gsx2json.com/api?id=${SHEET_ID}&sheet=${SHEET_TAB}`;

  try {
    const response: Response = await fetch(url);
    const data: SheetDataResponse = await response.json();

    res.status(200).json(data);
  } catch (error: unknown) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ error: 'Failed to fetch sheet data' });
  }
}
