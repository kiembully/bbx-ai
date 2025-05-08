// components/SheetLoader.tsx
import { useEffect, useState } from 'react';

export default function SheetLoader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sheet-data')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
