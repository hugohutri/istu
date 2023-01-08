import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

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
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
  padding: 10px;

  min-width: 300px;
  min-height: 300px;
`;

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>{children}</ModalWrapper>
    </>
  );
};
