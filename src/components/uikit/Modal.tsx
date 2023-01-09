import React from 'react';
import styled from 'styled-components';
import { Hr } from './Hr';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <HeaderRow>
          <Title>{title}</Title>
          <X onClick={onClose}>✕</X>
        </HeaderRow>
        <Hr />
        {children}
      </ModalWrapper>
    </>
  );
};

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const X = styled.div`
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.theme.color.text};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.color.elevated};
  /* border-radius: 4px; */
  box-shadow: 0 0px 32px rgba(0, 0, 0, 0.5);
  z-index: 2;
  padding: 18px;

  min-width: 300px;
  min-height: 300px;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  /* font-weight: bold; */
  color: ${(props) => props.theme.color.text};
`;
