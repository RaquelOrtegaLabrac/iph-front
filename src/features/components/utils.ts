export function getWiFiLevelAsPercentage(wifiLevel: string): number {
  switch (wifiLevel) {
    case "low":
      return 33;
    case "medium":
      return 66;
    case "high":
      return 100;
    default:
      return 0;
  }
}
