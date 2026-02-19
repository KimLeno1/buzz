
import React, { useMemo } from 'react';
import { ProjectFile } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProjectDashboardProps {
  files: ProjectFile[];
  summary: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ files, summary }) => {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    files.forEach(f => counts[f.type] = (counts[f.type] || 0) + 1);
    return Object.entries(counts).map(([name, value]) => ({ name, value })).slice(0, 5);
  }, [files]);

  return (
    <div className="space-y-6 overflow-y-auto h-full pr-2 custom-scrollbar">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold mb-2">Summary</h3>
        <p className="text-slate-600 italic text-sm">"{summary || 'Loading...'}"</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-64">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">File Types</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Files</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto text-xs text-slate-600">
            {files.slice(0, 10).map((f, i) => <div key={i} className="truncate">{f.path}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
