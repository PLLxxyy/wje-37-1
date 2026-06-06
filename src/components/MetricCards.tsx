import { Users, Eye, Clock, TrendingDown } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

interface Props {
  onlineUsers: number;
  totalVisits: number;
  avgDuration: string;
  bounceRate: number;
}

export default function MetricCards({ onlineUsers, totalVisits, avgDuration, bounceRate }: Props) {
  const cards = [
    { label: '当前在线', value: formatNumber(onlineUsers), unit: '人', change: 2.4, icon: Users, color: 'text-blue-400' },
    { label: '今日总访问', value: formatNumber(totalVisits), unit: '次', change: 5.1, icon: Eye, color: 'text-emerald-400' },
    { label: '平均停留', value: avgDuration, unit: '', change: -1.2, icon: Clock, color: 'text-amber-400' },
    { label: '跳出率', value: `${bounceRate.toFixed(1)}`, unit: '%', change: -0.8, icon: TrendingDown, color: 'text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const changeColor = card.change >= 0 ? 'text-emerald-400' : 'text-rose-400';
        const changeSign = card.change >= 0 ? '+' : '';
        return (
          <div key={card.label} className="bg-panel-bg rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">{card.label}</span>
              <Icon size={20} className={card.color} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-100">{card.value}</span>
              <span className="text-sm text-slate-400">{card.unit}</span>
            </div>
            <div className={`text-xs mt-1 ${changeColor}`}>
              {changeSign}{card.change}% 较昨日
            </div>
          </div>
        );
      })}
    </div>
  );
}
