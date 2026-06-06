export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function getHourLabels(): string[] {
  return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
}

export function getDayLabels(): string[] {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days;
}
