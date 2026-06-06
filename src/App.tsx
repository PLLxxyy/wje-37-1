import MetricCards from './components/MetricCards';
import TrafficChart from './components/TrafficChart';
import SourceChart from './components/SourceChart';
import PageRank from './components/PageRank';
import DeviceChart from './components/DeviceChart';
import { useTrafficData } from './hooks/useTrafficData';
import { BarChart3, X } from 'lucide-react';
import type { SourceName } from './types';

export default function App() {
  const {
    onlineUsers,
    totalVisits,
    avgDuration,
    bounceRate,
    traffic,
    sources,
    pages,
    devices,
    selectedSource,
    setSelectedSource,
  } = useTrafficData();

  const handleSourceClick = (name: string) => {
    const sourceName = name as SourceName;
    if (selectedSource === sourceName) {
      setSelectedSource('all');
    } else {
      setSelectedSource(sourceName);
    }
  };

  return (
    <div className="w-screen h-screen bg-dashboard-bg text-slate-100 flex flex-col p-4 gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-400" size={26} />
          <h1 className="text-xl font-bold tracking-wide">网站访问流量看板</h1>
          {selectedSource !== 'all' && (
            <div className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium">
              <span>渠道: {selectedSource}</span>
              <button
                onClick={() => setSelectedSource('all')}
                className="hover:bg-blue-500/30 rounded p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
        <div className="text-xs text-slate-500">数据每 5 秒自动刷新</div>
      </div>

      {/* Metric Cards */}
      <div className="shrink-0">
        <MetricCards
          onlineUsers={onlineUsers}
          totalVisits={totalVisits}
          avgDuration={avgDuration}
          bounceRate={bounceRate}
          selectedSource={selectedSource}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-4">
        {/* Left: Traffic Chart */}
        <div className="col-span-12 lg:col-span-7 min-h-0">
          <TrafficChart data={traffic} selectedSource={selectedSource} />
        </div>

        {/* Right: Source + Device */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 min-h-0">
          <div className="flex-1 min-h-0">
            <SourceChart
              data={sources}
              selectedSource={selectedSource}
              onSelect={handleSourceClick}
            />
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
            <PageRank data={pages} selectedSource={selectedSource} />
            <DeviceChart data={devices} selectedSource={selectedSource} />
          </div>
        </div>
      </div>
    </div>
  );
}
