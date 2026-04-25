export const toISODate = (value: Date): string => {
  return value.toISOString().slice(0, 10);
};

export const formatFriendlyDate = (value: string): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(`${value}T00:00:00`));
};

export const getToday = (): string => toISODate(new Date());

export const shiftDate = (value: string, amount: number): string => {
  const base = new Date(`${value}T00:00:00`);
  base.setDate(base.getDate() + amount);
  return toISODate(base);
};
