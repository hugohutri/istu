import { useState } from 'react';
import { Modal } from '../components/uikit/Modal';
import { useGuests } from '../hooks/useGuests';
import { Button } from '../components/uikit/Button';
import { Input } from '../components/uikit/Input';
import { Spacer } from '../components/uikit/Spacer';
import { Hr } from '../components/uikit/Hr';
import { Guest } from '../hooks/types';
import { NameForm } from './components/NameForm';
import { FriendBadge } from './components/FriendBadge';
import { Delete } from './components/Delete';
import { Friendlist } from './components/Friendlist';
import { AddButton } from './components/AddButton';
import { FriendInputContainer } from './components/FriendInputContainer';

export const EditGuestButton = ({ guest }: { guest: Guest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const editGuest = useGuests((store) => store.editGuest);

  const [name, setName] = useState(guest.name);
  const [friendNames, setFriendNames] = useState<string[]>(guest.friendNames);
  const [newFriend, setNewFriend] = useState<string>();
  const [avec, setAvec] = useState(guest.avecName);

  const buttonSubmit = () => {
    const newGuest = { name, avecName: avec, friendNames: friendNames };
    editGuest(guest, newGuest);

    setIsOpen(false);
  };

  const addFriend = () => {
    if (!newFriend) return;
    setFriendNames([...friendNames, newFriend]);
    setNewFriend(undefined);
  };

  const deleteFriend = (friend: string) => {
    const newFriendNames = [...friendNames];
    newFriendNames.splice(newFriendNames.indexOf(friend), 1);
    setFriendNames(newFriendNames);
  };

  return (
    <>
      <Button variant="neutral" size="small" onClick={() => setIsOpen(true)}>
        Edit guest
      </Button>
      <Modal
        title="Edit guest"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
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
          <Friendlist>
            {friendNames.map((friend) => (
              <FriendBadge key={friend}>
                {friend}
                <Delete onClick={() => deleteFriend(friend)}>✕</Delete>
              </FriendBadge>
            ))}
          </Friendlist>
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
