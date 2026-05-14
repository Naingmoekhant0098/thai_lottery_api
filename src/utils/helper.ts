/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export const getToday = (): string => {
  return new Date().toISOString().split('T')[0] || '';
};

/**
 * Check if check-in time is late based on school time and threshold
 */
export const isLate = (
  checkIn: Date,
  schoolTime: string | null,
  threshold: number
): boolean => {
  if (!schoolTime) return false;

  const [h, m]: any = schoolTime.split(':');
  const schoolDate = new Date(checkIn);
  schoolDate.setHours(Number(h), Number(m), 0);
  const diff = (checkIn.getTime() - schoolDate.getTime()) / (1000 * 60);

  return diff > threshold;
};
