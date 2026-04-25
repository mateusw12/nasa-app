"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DatePickerProps {
  name: string;
  defaultValue: string;
  label?: string;
}

export const DatePicker = ({ name, defaultValue, label = "Date" }: DatePickerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(name) || defaultValue;

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
      {label}
      <input
        type="date"
        value={currentValue}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/30 bg-black/20 px-3 py-2 text-[var(--text)]"
      />
    </label>
  );
};
