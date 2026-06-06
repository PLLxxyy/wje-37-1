import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { TrafficView } from '../types';

interface Props {
  data: TrafficView;
}

export default function TrafficChart({ data }: Props) {
  const [view, setView] = useState<'hour' | 'day'>('hour');
  const current = data[view];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30,41,59,0.95)',
      borderColor: '#475569',
      textStyle: { color: '#e2e8f0' },
    },
    grid: { left: 48, right: 16, top: 40, bottom: 24 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: current.map((d) => d.time),
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94a3b8' },
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#3b82f6', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59,130,246,0.4)' },
              { offset: 1, color: 'rgba(59,130,246,0.05)' },
            ],
          },
        },
        data: current.map((d) => d.value),
      },
    ],
  };

  return (
    <div className="bg-panel-bg rounded-xl p-4 h-full flex flex-col border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-200">访问量趋势</h3>
        <div className="flex bg-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setView('hour')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              view === 'hour' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            小时
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              view === 'day' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            日
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
