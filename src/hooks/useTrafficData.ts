import { useState, useEffect, useCallback } from 'react';
import type { TrafficView, SourceData, PageRankItem, DeviceData } from '../types';
import { getHourLabels, getDayLabels } from '../utils/helpers';

function generateHourData(): { time: string; value: number }[] {
  const labels = getHourLabels();
  const now = new Date().getHours();
  return labels.map((t, i) => ({
    time: t,
    value: i <= now ? Math.floor(Math.random() * 3000) + 500 : 0,
  }));
}

function generateDayData(): { time: string; value: number }[] {
  const labels = getDayLabels();
  return labels.map((t) => ({
    time: t,
    value: Math.floor(Math.random() * 50000) + 10000,
  }));
}

function generateSources(): SourceData[] {
  return [
    { name: '搜索引擎', value: Math.floor(Math.random() * 5000) + 3000 },
    { name: '直接访问', value: Math.floor(Math.random() * 4000) + 2000 },
    { name: '社交媒体', value: Math.floor(Math.random() * 3000) + 1500 },
    { name: '外部链接', value: Math.floor(Math.random() * 2000) + 800 },
    { name: '邮件营销', value: Math.floor(Math.random() * 1000) + 300 },
  ];
}

function generatePages(): PageRankItem[] {
  const pages = [
    { path: '/home', visits: 12450, avgDuration: '2:34' },
    { path: '/products', visits: 8320, avgDuration: '3:12' },
    { path: '/blog/how-to-guide', visits: 6780, avgDuration: '4:05' },
    { path: '/pricing', visits: 5420, avgDuration: '1:48' },
    { path: '/about', visits: 3890, avgDuration: '1:22' },
    { path: '/contact', visits: 2150, avgDuration: '0:56' },
    { path: '/docs/api', visits: 1980, avgDuration: '5:30' },
    { path: '/login', visits: 1650, avgDuration: '0:42' },
  ];
  return pages.map((p) => ({
    ...p,
    visits: Math.max(100, p.visits + Math.floor((Math.random() - 0.5) * 1000)),
  }));
}

function generateDevices(): DeviceData[] {
  const desktop = Math.floor(Math.random() * 30) + 40;
  return [
    { name: '桌面端', value: desktop },
    { name: '移动端', value: 100 - desktop },
  ];
}

export function useTrafficData() {
  const [onlineUsers, setOnlineUsers] = useState(3420);
  const [totalVisits, setTotalVisits] = useState(128450);
  const [avgDuration, setAvgDuration] = useState('2:45');
  const [bounceRate, setBounceRate] = useState(34.2);

  const [traffic, setTraffic] = useState<TrafficView>({
    hour: generateHourData(),
    day: generateDayData(),
  });
  const [sources, setSources] = useState<SourceData[]>(generateSources());
  const [pages, setPages] = useState<PageRankItem[]>(generatePages());
  const [devices, setDevices] = useState<DeviceData[]>(generateDevices());

  const tick = useCallback(() => {
    setOnlineUsers((v) => Math.max(100, v + Math.floor((Math.random() - 0.5) * 200)));
    setTotalVisits((v) => v + Math.floor(Math.random() * 50));
    setBounceRate((v) => Math.max(10, Math.min(90, v + (Math.random() - 0.5) * 2)));

    setTraffic({
      hour: generateHourData(),
      day: generateDayData(),
    });
    setSources(generateSources());
    setPages(generatePages());
    setDevices(generateDevices());
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 5000);
    return () => clearInterval(interval);
  }, [tick]);

  return {
    onlineUsers,
    totalVisits,
    avgDuration,
    bounceRate,
    traffic,
    sources,
    pages,
    devices,
  };
}
