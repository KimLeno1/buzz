
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AnalysisMode, ProjectFile } from '../types';
import { gemini } from '../services/gemini';

interface ChatInterfaceProps {
  files: ProjectFile[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ files }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.Fast);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await gemini.analyzeProject(files, input, mode);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <span className="font-semibold text-slate-700">Project Assistant</span>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value as AnalysisMode)}
          className="text-xs bg-white border border-slate-300 rounded px-2 py-1 outline-none"
        >
          <option value={AnalysisMode.Fast}>Flash (Fast)</option>
          <option value={AnalysisMode.Deep}>Pro (Deep)</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>
              <p className="text-sm whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-slate-400 animate-pulse">Architect is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-100 flex space-x-2">
        <input 
          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about the codebase..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
