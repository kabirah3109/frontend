import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarWrap = styled(motion.aside)`
  width: 300px;
  max-width: 80vw;
  background: linear-gradient(180deg, rgba(245,248,255,0.02), rgba(240,244,255,0.01));
  border-right: 1px solid rgba(255,255,255,0.04);
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NewBtn = styled(motion.button)`
  background: linear-gradient(90deg, var(--new-btn-start), var(--new-btn-end));
  color: var(--new-btn-text);
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(17,24,39,0.12);
  transition: transform 120ms ease, box-shadow 120ms ease;
  display:inline-block;
`;

const List = styled.div`
  overflow: auto;
  flex:1;
  display:flex;
  flex-direction:column;
  gap:0.5rem;
`;

const Item = styled(motion.div)`
  display:flex;
  align-items:center;
  gap:0.5rem;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  background: rgba(255,255,255,0.01);
  color: var(--text);
`;

const Controls = styled.div`
  display:flex;
  gap:0.4rem;
  margin-left:auto;
`;

export default function Sidebar({ conversations, active, onSelect, onNew, onDelete, onRename, collapsed }) {
  return (
    <AnimatePresence initial={false}>
      {!collapsed && (
        <SidebarWrap
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
        >
          <NewBtn onClick={onNew}>+ New Conversation</NewBtn>
          <List>
            {conversations.length === 0 && (
              <div style={{color:'var(--muted)'}}>No conversations yet, start a new one.</div>
            )}
            {conversations.map((c, i) => (
              <Item
                key={i}
                onClick={() => onSelect(i)}
                whileHover={{ scale: 1.02 }}
                style={{ border: active === i ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <div style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.name}</div>
                <Controls>
                  <button title="Rename" onClick={(e)=>{e.stopPropagation(); onRename(i);}}>✏️</button>
                  <button title="Delete" onClick={(e)=>{e.stopPropagation(); onDelete(i);}}>🗑️</button>
                </Controls>
              </Item>
            ))}
          </List>
        </SidebarWrap>
      )}
    </AnimatePresence>
  );
}
