export const getHazardBadgeClass = (isHazardous: boolean): string => {
  return isHazardous
    ? "border-[color:var(--accent-red)]/70 bg-[color:var(--accent-red)]/15 text-[color:var(--accent-red)]"
    : "border-[color:var(--accent-blue)]/70 bg-[color:var(--accent-blue)]/15 text-[color:var(--accent-blue)]";
};

export const getHazardLabel = (isHazardous: boolean): string => {
  return isHazardous ? "Observacao reforcada" : "Trajeto estavel";
};
