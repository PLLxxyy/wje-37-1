import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TrafficView, SourceData, PageRankItem, DeviceData, SourceName, MetricData } from '../types';
import { getHourLabels, getDayLabels } from '../utils/helpers';

const SOURCE_NAMES: Exclude<SourceName, 'all'>[] = ['搜索引擎', '直接访问', '社交媒体', '外部链接', '邮件营销'];

function generateHourData(source: SourceName): { time: string; value: number; source: SourceName }[] {
  const labels = getHourLabels();
  const now = new Date().getHours();
  const sourceFactor = source === 'all' ? 1 : 0.3 + Math.random() * 0.5;
  return labels.map((t, i) => ({
    time: t,
    value: i <= now ? Math.floor((Math.random() * 3000 + 500) * sourceFactor) : 0,
    source,
  }));
}

function generateDayData(source: SourceName): { time: string; value: number; source: SourceName }[] {
  const labels = getDayLabels();
  const sourceFactor = source === 'all' ? 1 : 0.3 + Math.random() * 0.5;
  return labels.map((t) => ({
    time: t,
    value: Math.floor((Math.random() * 50000 + 10000) * sourceFactor),
    source,
  }));
}

function generateSources(): SourceData[] {
  return SOURCE_NAMES.map((name) => ({
    name,
    value: Math.floor(Math.random() * 5000) + 3000,
  }));
}

function generatePages(source: SourceName): PageRankItem[] {
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
  const sourceFactor = source === 'all' ? 1 : 0.2 + Math.random() * 0.6;
  return pages.map((p) => ({
    ...p,
    visits: Math.max(100, Math.floor(p.visits * sourceFactor + (Math.random() - 0.5) * 500)),
    source,
  }));
}

function generateDevices(source: SourceName): DeviceData[] {
  const baseDesktop = source === '搜索引擎' ? 55 : source === '社交媒体' ? 40 : source === '邮件营销' ? 42 : 45;
  const desktop = Math.min(85, Math.max(25, baseDesktop + Math.floor((Math.random() - 0.5) * 20)));
  return [
    { name: '桌面端', value: desktop, source },
    { name: '移动端', value: 100 - desktop, source },
  ];
}

function generateMetrics(source: SourceName): MetricData {
  const sourceFactor = source === 'all' ? 1 : 0.2 + Math.random() * 0.5;
  return {
    onlineUsers: Math.floor(3420 * sourceFactor + (Math.random() - 0.5) * 200),
    totalVisits: Math.floor(128450 * sourceFactor + Math.random() * 50),
    avgDuration: source === 'all' ? '2:45' : ['1:30', '2:10', '2:45', '3:20', '4:00'][Math.floor(Math.random() * 5)],
    bounceRate: Math.max(10, Math.min(90, 34.2 + (Math.random() - 0.5) * 10)),
    source,
  };
}

export function useTrafficData() {
  const [selectedSource, setSelectedSource] = useState<SourceName>('all');

  const [allMetrics, setAllMetrics] = useState<Record<SourceName, MetricData>>(() => {
    const result = {} as Record<SourceName, MetricData>;
    (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
      result[s] = generateMetrics(s);
    });
    return result;
  });

  const [allTraffic, setAllTraffic] = useState<Record<SourceName, TrafficView>>(() => {
    const result = {} as Record<SourceName, TrafficView>;
    (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
      result[s] = {
        hour: generateHourData(s),
        day: generateDayData(s),
      };
    });
    return result;
  });

  const [sources, setSources] = useState<SourceData[]>(generateSources());

  const [allPages, setAllPages] = useState<Record<SourceName, PageRankItem[]>>(() => {
    const result = {} as Record<SourceName, PageRankItem[]>;
    (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
      result[s] = generatePages(s);
    });
    return result;
  });

  const [allDevices, setAllDevices] = useState<Record<SourceName, DeviceData[]>>(() => {
    const result = {} as Record<SourceName, DeviceData[]>;
    (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
      result[s] = generateDevices(s);
    });
    return result;
  });

  const tick = useCallback(() => {
    setAllMetrics((prev) => {
      const next = { ...prev };
      (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
        const factor = s === 'all' ? 1 : 0.2 + Math.random() * 0.5;
        next[s] = {
          onlineUsers: Math.max(100, Math.floor(prev[s].onlineUsers + (Math.random() - 0.5) * 200 * factor)),
          totalVisits: prev[s].totalVisits + Math.floor(Math.random() * 50 * factor),
          avgDuration: prev[s].avgDuration,
          bounceRate: Math.max(10, Math.min(90, prev[s].bounceRate + (Math.random() - 0.5) * 2)),
          source: s,
        };
      });
      return next;
    });

    setAllTraffic((prev) => {
      const next = { ...prev };
      (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
        next[s] = {
          hour: generateHourData(s),
          day: generateDayData(s),
        };
      });
      return next;
    });

    setSources(generateSources());

    setAllPages((prev) => {
      const next = { ...prev };
      (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
        next[s] = generatePages(s);
      });
      return next;
    });

    setAllDevices((prev) => {
      const next = { ...prev };
      (['all', ...SOURCE_NAMES] as SourceName[]).forEach((s) => {
        next[s] = generateDevices(s);
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 5000);
    return () => clearInterval(interval);
  }, [tick]);

  const filteredData = useMemo(() => ({
    onlineUsers: allMetrics[selectedSource].onlineUsers,
    totalVisits: allMetrics[selectedSource].totalVisits,
    avgDuration: allMetrics[selectedSource].avgDuration,
    bounceRate: allMetrics[selectedSource].bounceRate,
    traffic: allTraffic[selectedSource],
    pages: allPages[selectedSource],
    devices: allDevices[selectedSource],
  }), [selectedSource, allMetrics, allTraffic, allPages, allDevices]);

  return {
    ...filteredData,
    sources,
    selectedSource,
    setSelectedSource,
  };
}
