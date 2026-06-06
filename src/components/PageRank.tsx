import type { PageRankItem, SourceName } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  data: PageRankItem[];
  selectedSource: SourceName;
}

export default function PageRank({ data, selectedSource }: Props) {
  const maxVisits = Math.max(...data.map((d) => d.visits));

  return (
    <div className="bg-panel-bg rounded-xl p-4 h-full flex flex-col border border-slate-700/50">
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-sm font-semibold text-slate-200">热门页面排行</h3>
        {selectedSource !== 'all' && (
          <span className="text-[9px] text-blue-400 bg-blue-500/20 px-1 rounded">
            {selectedSource}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-500 border-b border-slate-700">
              <th className="pb-2 font-medium">页面路径</th>
              <th className="pb-2 font-medium text-right">访问次数</th>
              <th className="pb-2 font-medium text-right">平均停留</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.map((item, i) => (
              <tr key={item.path} className="group hover:bg-slate-800/50 transition-colors">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4">{i + 1}</span>
                    <span className="text-slate-300 truncate max-w-[140px]" title={item.path}>{item.path}</span>
                    <ArrowUpRight size={12} className="text-slate-600 group-hover:text-slate-400" />
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full transition-all duration-700"
                      style={{ width: `${(item.visits / maxVisits) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-300 font-medium">{item.visits.toLocaleString()}</td>
                <td className="py-2.5 text-right text-slate-400">{item.avgDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
