import { useState } from 'react';
import { Form } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { useGuests } from '../pages/editor/hooks/useGuests';

const OpenModalButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.color.textInverted};
`;

const NameForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 5px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 15px;
`;

const NameFormInput = styled.input`
  display: table-cell;
  margin: 0 0 0 15px;
  padding: 0.5rem;
`;

export const AddPersonModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addGuest } = useGuests();

  interface FormValues {
    name: string;
    friendNames: string[];
    avec: string;
  }

  const buttonSubmit = () => {
    console.log('submit');
    addGuest({ name: 'testi', friendNames: [] });
    setIsOpen(false);
  };

  return (
    <>
      <OpenModalButton onClick={() => setIsOpen(true)}>
        Add person
      </OpenModalButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle> Add person </ModalTitle>
        <NameForm>
          <NameFormInput type="text" placeholder="Name" />
          <NameFormInput type="text" placeholder="Avec" />
          <NameFormInput type="text" placeholder="kamerukset :D" />
          <button onClick={buttonSubmit}>Submit</button>
        </NameForm>
      </Modal>
    </>
  );
};
