import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { SourceData, SourceName } from '../types';
import type { EChartsOption } from 'echarts';

interface Props {
  data: SourceData[];
  selectedSource: SourceName;
  onSelect: (name: string) => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SourceChart({ data, selectedSource, onSelect }: Props) {
  const onEvents = useMemo(() => ({
    click: (params: { name: string }) => {
      onSelect(params.name);
    },
  }), [onSelect]);

  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(30,41,59,0.95)',
      borderColor: '#475569',
      textStyle: { color: '#e2e8f0' },
      formatter: '{b}: {c} ({d}%)<br/><span style="color:#94a3b8;font-size:10px">点击切换筛选</span>',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#94a3b8', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
      selectedMode: false,
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
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: { show: false },
        data: data.map((d, i) => {
          const isSelected = selectedSource === d.name;
          const isFiltered = selectedSource !== 'all' && !isSelected;
          return {
            ...d,
            itemStyle: {
              color: COLORS[i % 5],
              opacity: isFiltered ? 0.3 : 1,
              borderWidth: isSelected ? 3 : 2,
              borderColor: isSelected ? '#e2e8f0' : '#1e293b',
            },
            emphasis: {
              itemStyle: {
                color: COLORS[i % 5],
                opacity: 1,
              },
            },
          };
        }),
      },
    ],
  };

  return (
    <div className="bg-panel-bg rounded-xl p-4 h-full flex flex-col border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-200">访客来源分布</h3>
        <span className="text-[10px] text-slate-500">点击饼图筛选渠道</span>
      </div>
      <div className="flex-1 min-h-0">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          onEvents={onEvents}
          notMerge={true}
        />
      </div>
    </div>
  );
}
