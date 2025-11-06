import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border-bottom: 1px solid rgba(255,255,255,0.04);
  @media (max-width: 780px) {
    padding: 0.6rem 0.8rem;
  }
`;

const Title = styled.div`
  display:flex;
  flex-direction:column;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: 0.4px;
  color: var(--text);
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const Sub = styled.span`
  font-size: 0.75rem;
  color: var(--muted);
`;

const Nav = styled.nav`
  display:flex;
  gap: 0.5rem;
  align-items:center;
`;

const Button = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--text);
  padding: 0.4rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  @media (max-width: 480px) {
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
  }
`;

export default function Header({ onToggleSidebar }) {
  return (
    <HeaderWrap>
      <Title>
        <H1> Beerah AI Assistant</H1>
        <Sub>Calm. Fast. Helpful.</Sub>
      </Title>
      <Nav>
        <Button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰ Conversations
        </Button>
      </Nav>
    </HeaderWrap>
  );
}
