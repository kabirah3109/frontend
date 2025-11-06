import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const ChatWrap = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  padding: 1rem;
  gap: 1rem;
  overflow: hidden;
  @media (max-width: 780px) {
    /* reduce side padding slightly on small screens */
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }
`;

const Messages = styled.div`
  flex:1;
  overflow:auto;
  display:flex;
  flex-direction:column;
  gap:0.6rem;
  padding-right: 8px;
  padding-bottom: 80px; /* default space so last message isn't behind fixed input */

  @media (max-width: 780px) {
    padding-bottom: 140px;
  }
`;

const Bubble = styled(motion.div)`
  max-width: 78%;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: ${props => props.role === 'user' ? 'var(--bubble-user)' : 'var(--bubble-assistant)'};
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  color: ${props => props.role === 'user' ? 'var(--bubble-user-text)' : 'var(--bubble-assistant-text)'};
  line-height: 1.45;
  box-shadow: ${props => props.role === 'user' ? '0 8px 20px rgba(79,60,255,0.12)' : 'none'};
  @media (max-width: 480px) {
    max-width: 92%;
    padding: 0.6rem 0.75rem;
    border-radius: 12px;
  }
`;

const Typing = styled.div`
  display:flex;
  gap:6px;
  align-items:center;
`;

const Dot = styled(motion.span)`
  width:8px;
  height:8px;
  border-radius:50%;
  background: var(--accent);
`;

export default function ChatWindow({ messages, isLoading }){
  const listRef = useRef();

  useEffect(()=>{
    const el = listRef.current;
    if(el) el.scrollTop = el.scrollHeight;
  },[messages, isLoading]);

  return (
    <ChatWrap>
      <Messages ref={listRef}>
        <AnimatePresence initial={false} >
          {messages.map((m, i) => (
            <Bubble
              key={i}
              role={m.role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <div style={{fontSize:12, color:'#3b6b77', marginBottom:6}}>{m.role === 'user' ? 'You' : 'Gemini'}</div>
              {m.role === 'assistant' ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
            </Bubble>
          ))}

          {isLoading && (
            <Bubble key="typing" role="assistant" initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <Typing>
                <Dot animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <Dot animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                <Dot animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
              </Typing>
            </Bubble>
          )}
        </AnimatePresence>
      </Messages>
    </ChatWrap>
  );
}
