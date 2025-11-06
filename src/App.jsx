// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import './markdown.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import GlobalStyle from './styles/globalStyles';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('conversations');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeConv, setActiveConv] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (conversations.length > 0) {
      setMessages(conversations[activeConv]?.messages || []);
    } else {
      setMessages([]);
    }
  }, [activeConv, conversations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      const updatedMessages = [...newMessages, { role: 'assistant', text: data.response }];
      setMessages(updatedMessages);
      setConversations(prev => {
        const copy = [...prev];
        // Use first user message as name
        const firstUserMsg = updatedMessages.find(m => m.role === 'user')?.text || `Conversation ${activeConv + 1}`;
        copy[activeConv] = { messages: updatedMessages, name: firstUserMsg };
        return copy;
      });
    } catch (err) {
      setError(err.message);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setConversations(prev => [...prev, { messages: [], name: 'New Conversation' }]);
    setActiveConv(conversations.length);
    setMessages([]);
    setError('');
    setInput('');
    setSidebarOpen(false);
  };

  const handleSelectConversation = (idx) => {
    setActiveConv(idx);
    setError('');
    setInput('');
    setSidebarOpen(false);
  };

  const handleDeleteConversation = (idx) => {
    setConversations(prev => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
    setActiveConv(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleRenameConversation = (idx) => {
    const newName = prompt('Enter new conversation name:', conversations[idx].name);
    if (newName && newName.trim()) {
      setConversations(prev => {
        const copy = [...prev];
        copy[idx].name = newName.trim();
        return copy;
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <div style={{display:'flex', height:'100vh', gap: '0', overflow:'hidden'}}>
        <Sidebar
          conversations={conversations}
          active={activeConv}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
          onDelete={handleDeleteConversation}
          onRename={handleRenameConversation}
          collapsed={!sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile overlay: clicking it closes the sidebar (visible only on small screens via CSS) */}
        {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

        <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0}}>
          <Header onToggleSidebar={() => setSidebarOpen(s => !s)} />
          <ChatWindow messages={messages} isLoading={isLoading} />
          {error && <div style={{padding:'0 1rem', color:'#ffb4a2'}}>⚠️ {error}</div>}
          <MessageInput
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;