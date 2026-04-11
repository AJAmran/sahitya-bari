'use client';

import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

export default function RelativeTime({ date }: { date: string | Date }) {
  const [formatted, setFormatted] = useState<string>('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormatted(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  if (!formatted) {
    return <span className="opacity-0">loading...</span>;
  }

  return <span>{formatted}</span>;
}
