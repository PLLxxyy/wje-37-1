import ReactECharts from 'echarts-for-react';
import type { SourceData } from '../types';

interface Props {
  data: SourceData[];
}

export default function SourceChart({ data }: Props) {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(30,41,59,0.95)',
      borderColor: '#475569',
      textStyle: { color: '#e2e8f0' },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#94a3b8', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        name: '访客来源',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#1e293b',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#e2e8f0',
          },
        },
        labelLine: { show: false },
        data: data.map((d, i) => ({
          ...d,
          itemStyle: {
            color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-panel-bg rounded-xl p-4 h-full flex flex-col border border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-200 mb-2">访客来源分布</h3>
      <div className="flex-1 min-h-0">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
