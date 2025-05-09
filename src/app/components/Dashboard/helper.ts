interface StatData {
  stat: string;
  value: number;
  fullMark: number;
}

export const convertBuildStatsToRadarData = (stats: Record<string, number>): StatData[] => {
  return Object.entries(stats).map(([key, value]) => {
    let fullMark: number;

    // Determine fullMark based on the stat type
    switch (key.toLowerCase()) {
      case 'weight':
        fullMark = 120;
        break;
      default:
        fullMark = 100;
    }

    return {
      stat: key,
      value,
      fullMark,
    };
  });
};
