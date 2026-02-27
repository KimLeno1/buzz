
import React, { useState } from 'react';
import { 
  Send, 
  User, 
  Headphones, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Search
} from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'Support Agent',
      text: 'Hello! Welcome to Buy Buzz Support. How can we assist you today?',
      time: '10:00 AM',
      isAgent: true
    },
    {
      id: 2,
      sender: 'You',
      text: 'Hi, I have a question about my recent data purchase.',
      time: '10:02 AM',
      isAgent: false
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAgent: false
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: chatHistory.length + 2,
        sender: 'Support Agent',
        text: "I'd be happy to help with that. Could you please provide your order ID?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAgent: true
      };
      setChatHistory(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
      {/* Chat Header */}
      <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Headphones size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-4 border-indigo-600 rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Live Support</h3>
            <p className="text-xs text-indigo-100 font-medium opacity-80">Typically responds in 2 mins</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search in Chat */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
        <Search size={16} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search in conversation..." 
          className="bg-transparent text-xs font-medium text-gray-500 outline-none w-full"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        <div className="text-center">
          <span className="px-3 py-1 bg-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full">Today</span>
        </div>
        
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isAgent ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.isAgent ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.isAgent ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                {msg.isAgent ? <Headphones size={16} /> : <User size={16} />}
              </div>
              <div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.isAgent 
                    ? 'bg-white text-gray-700 rounded-tl-none border border-gray-100' 
                    : 'bg-indigo-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`text-[10px] font-bold text-gray-400 mt-1.5 ${msg.isAgent ? 'text-left' : 'text-right'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..." 
              className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Smile size={20} />
            </button>
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Agents Online
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            End-to-End Encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
