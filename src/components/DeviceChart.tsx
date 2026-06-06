import ReactECharts from 'echarts-for-react';
import type { DeviceData, SourceName } from '../types';
import type { EChartsOption } from 'echarts';

interface Props {
  data: DeviceData[];
  selectedSource: SourceName;
}

export default function DeviceChart({ data, selectedSource }: Props) {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(30,41,59,0.95)',
      borderColor: '#475569',
      textStyle: { color: '#e2e8f0' },
      formatter: '{b}: {d}%',
    },
    series: [
      {
        name: '设备分布',
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#1e293b',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'center',
          formatter: () => '设备',
          fontSize: 14,
          color: '#94a3b8',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#e2e8f0',
          },
        },
        labelLine: { show: false },
        data: data.map((d, i) => ({
          ...d,
          itemStyle: {
            color: i === 0 ? '#3b82f6' : '#10b981',
          },
        })),
        animationDuration: 600,
      },
    ],
  };

  return (
    <div className="bg-panel-bg rounded-xl p-4 h-full flex flex-col border border-slate-700/50">
      <div className="flex items-center gap-1.5 mb-2">
        <h3 className="text-sm font-semibold text-slate-200">设备分布</h3>
        {selectedSource !== 'all' && (
          <span className="text-[9px] text-blue-400 bg-blue-500/20 px-1 rounded">
            {selectedSource}
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true} />
      </div>
      <div className="flex justify-center gap-6 text-xs mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: i === 0 ? '#3b82f6' : '#10b981' }} />
            <span className="text-slate-400">{d.name}</span>
            <span className="text-slate-200 font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
