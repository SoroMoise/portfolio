"use client";

import { useEffect, useState } from "react";
import { formatAbidjanTime } from "@/lib/time";

export function LocalTime({ initial }: { initial: string }) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    const tick = () => setTime(formatAbidjanTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time}
    </time>
  );
}
