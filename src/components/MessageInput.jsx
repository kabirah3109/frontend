import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Form = styled.form`
  display:flex; 
  gap:0.6rem;
  padding: 0.8rem 1rem;
  border-top: 1px solid rgba(255,255,255,0.03);
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));
  /* keep input visible on mobile: stick to bottom */
  @media (max-width: 780px) {
    /* pin to viewport bottom on small screens so it's always visible above keyboard */
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(env(safe-area-inset-bottom, 12px));
    z-index: 220;
    backdrop-filter: blur(6px);
    background: linear-gradient(180deg, rgba(8,10,14,0.9), rgba(6,8,12,0.85));
    padding-left: 12px;
    padding-right: 12px;
    box-shadow: 0 -8px 24px rgba(2,6,23,0.6);
  }
`;

const Input = styled.input`
  flex:1;
  padding:0.75rem 1rem;
  border-radius: 999px;
  border: none;
  background: var(--input-bg);
  color: var(--text);
  outline: none;
  &::placeholder { color: rgba(255,255,255,0.34); }
  /* make sure input field is visibly outlined on mobile */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
`;

const Send = styled(motion.button)`
  background: var(--send-bg);
  border:none;
  padding:0.6rem 1rem;
  border-radius: 999px;
  cursor:pointer;
  font-weight:700;
  color: #fff;
  box-shadow: 0 6px 18px rgba(10,10,20,0.45);
  border: 1px solid rgba(255,255,255,0.02);
`;

export default function MessageInput({ value, onChange, onSubmit, disabled }){
  return (
    <Form onSubmit={onSubmit}>
      <Input value={value} onChange={onChange} placeholder="Type a message..." disabled={disabled} />
      <Send whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} type="submit" disabled={disabled}>
        Send
      </Send>
    </Form>
  );
}
