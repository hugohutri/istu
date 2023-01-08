import { useState } from 'react';
import { Form } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { useGuests } from '../hooks/useGuests';
import { Button } from '../components/uikit/Button';
import { Stack } from '../components/uikit/Stack';

const OpenModalButton = styled.button``;

const ModalTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.color.text};
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
  padding: 0.5rem;
`;

const Friendlist = styled.div`
  color: ${(props) => props.theme.color.text};
`;

export const AddPersonModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addGuest } = useGuests();
  const [name, setName] = useState('');
  const [friendNames, setFriendNames] = useState<string[]>([]);
  const [newFriend, setNewFriend] = useState<string>();
  const [avec, setAvec] = useState<string>();

  const buttonSubmit = () => {
    console.log('submit');
    addGuest({ name: name, avecName: avec, friendNames: friendNames });
    setName('');
    setAvec(undefined);
    setFriendNames([]);
    setNewFriend(undefined);
    setIsOpen(false);
  };

  const addFriend = () => {
    if (!newFriend) return;
    setFriendNames([...friendNames, newFriend]);
    setNewFriend(undefined);
  };

  return (
    <>
      <OpenModalButton onClick={() => setIsOpen(true)}>
        Add person
      </OpenModalButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle> Add person </ModalTitle>

        <NameForm>
          <Stack dir="column" spacing={10}>
            <NameFormInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <NameFormInput
              type="text"
              placeholder="Avec"
              value={avec}
              onChange={(e) => setAvec(e.target.value)}
            />
            <NameFormInput
              type="text"
              placeholder="kamerukset :D"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
            />
            <Button disabled={!newFriend} onClick={addFriend}>
              Add friend
            </Button>
            <Friendlist>Friends: {friendNames.join(',')}</Friendlist>
            <Button disabled={!name} onClick={buttonSubmit}>
              Submit
            </Button>
          </Stack>
        </NameForm>
      </Modal>
    </>
  );
};
