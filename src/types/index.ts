export type SourceName = '搜索引擎' | '直接访问' | '社交媒体' | '外部链接' | '邮件营销' | 'all';

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
  source?: SourceName;
}

export interface DeviceData {
  name: string;
  value: number;
  source?: SourceName;
}

export interface MetricData {
  onlineUsers: number;
  totalVisits: number;
  avgDuration: string;
  bounceRate: number;
  source?: SourceName;
}
