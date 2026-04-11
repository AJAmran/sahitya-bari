'use client';

import { useEffect, useState } from 'react';

export default function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return <span>...</span>;

  return <>{year}</>;
}
