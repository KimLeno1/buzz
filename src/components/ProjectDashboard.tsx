
import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  ExternalLink,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed' | 'revision';
  date: string;
  progress: number;
  thumbnail?: string;
}

const ProjectDashboard: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'PRJ-001',
      name: 'Business Launch Flyer',
      type: 'Flyer Design',
      status: 'completed',
      date: '2024-03-15',
      progress: 100,
      thumbnail: 'https://picsum.photos/seed/design1/200/200'
    },
    {
      id: 'PRJ-002',
      name: 'Social Media Kit',
      type: 'Branding',
      status: 'in-progress',
      date: '2024-03-20',
      progress: 65,
      thumbnail: 'https://picsum.photos/seed/design2/200/200'
    },
    {
      id: 'PRJ-003',
      name: 'Event Poster - Tech Summit',
      type: 'Poster',
      status: 'revision',
      date: '2024-03-22',
      progress: 90,
      thumbnail: 'https://picsum.photos/seed/design3/200/200'
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-blue-100 text-blue-600';
      case 'revision': return 'bg-amber-100 text-amber-600';
      case 'pending': return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Projects', value: '12', icon: <FileText className="text-indigo-600" /> },
          { label: 'In Progress', value: '3', icon: <Clock className="text-blue-600" /> },
          { label: 'Completed', value: '8', icon: <CheckCircle2 className="text-green-600" /> },
          { label: 'Revisions', value: '1', icon: <AlertCircle className="text-amber-600" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-xl">{stat.icon}</div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Live</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Project List Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-48 relative overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-3 bg-white rounded-full text-indigo-600 shadow-xl">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">{project.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{project.type} • Created {project.date}</p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Progress</span>
                    <span className="text-[10px] font-bold text-indigo-600">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${project.progress}%` }} 
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={14} /> Assets
                  </button>
                  <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
