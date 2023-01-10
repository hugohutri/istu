import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { useGuests } from '../hooks/useGuests';
import { Button } from '../components/uikit/Button';
import { Input } from '../components/uikit/Input';
import { Spacer } from '../components/uikit/Spacer';
import { Hr } from '../components/uikit/Hr';

const NameForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Friendlist = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.text};

  &:empty:after {
    content: '-';
  }
  :before {
    content: 'Friends: ';
    font-weight: bold;
  }
`;

export const AddGuest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addGuest = useGuests((store) => store.addGuest);

  const [name, setName] = useState('');
  const [friendNames, setFriendNames] = useState<string[]>([]);
  const [newFriend, setNewFriend] = useState<string>();
  const [avec, setAvec] = useState<string>();

  const buttonSubmit = () => {
    addGuest({
      name,
      avecName: avec,
      friendNames: friendNames,
    });
    clearFields();
    setIsOpen(false);
  };

  const addFriend = () => {
    if (!newFriend) return;
    setFriendNames([...friendNames, newFriend]);
    setNewFriend(undefined);
  };

  const clearFields = () => {
    setName('');
    setAvec(undefined);
    setNewFriend(undefined);
    setFriendNames([]);
  };

  useEffect(() => {
    if (isOpen) clearFields();
  }, [isOpen]);

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Add guest
      </Button>
      <Modal title="Add guest" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NameForm>
          <Input
            type="text"
            label="Name of the guest"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Spacer amount="10px" />
          <Input
            label="Name of Companion / Partner"
            type="text"
            placeholder="Full name"
            value={avec}
            onChange={(e) => setAvec(e.target.value)}
          />

          <Spacer amount="10px" />
          <FriendInputContainer>
            <Input
              label="Friends"
              type="text"
              placeholder="Full name"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
            />
            <Spacer amount="2px" />
            <AddButton size="small" disabled={!newFriend} onClick={addFriend}>
              Add
            </AddButton>
          </FriendInputContainer>

          <Spacer amount="2px" />
          <Friendlist>{friendNames.join(', ')}</Friendlist>
          <Spacer amount="2px" />

          <Spacer amount="10px" />
          <Hr />
          <Button disabled={!name} onClick={buttonSubmit}>
            Submit
          </Button>
        </NameForm>
      </Modal>
    </>
  );
};

const AddButton = styled(Button)`
  height: auto;
  content: '+';
  margin-top: auto;
  align-self: bottom;
`;

const FriendInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10px auto;
`;
