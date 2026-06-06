export interface MetricCardData {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
}

export interface TimeSeriesPoint {
  time: string;
  value: number;
}

export interface TrafficView {
  hour: TimeSeriesPoint[];
  day: TimeSeriesPoint[];
}

export interface SourceData {
  name: string;
  value: number;
}

export interface PageRankItem {
  path: string;
  visits: number;
  avgDuration: string;
}

export interface DeviceData {
  name: string;
  value: number;
}
