import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';

const OpenModalButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const AddTableButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OpenModalButton onClick={() => setIsOpen(true)}>
        Add table
      </OpenModalButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>jou</p>
      </Modal>
    </>
  );
};
