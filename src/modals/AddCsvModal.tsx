import { ChangeEvent, useState } from 'react';

import { Modal } from '../components/uikit/Modal';
import { Button } from '../components/uikit/Button';
import { Stack } from '../components/uikit/Stack';
import { useGuests } from '../hooks/useGuests';
import { Guest } from '../hooks/types';
import { Body } from '../components/uikit/Body';
import styled from 'styled-components';

const FileInput = styled.input`
  color: ${(props) => props.theme.color.text};
`;
const NameContainer = styled.div`
  padding-bottom: 0.5rem;
`;
const Scrollable = styled.div`
  overflow-y: scroll;
  max-height: 300px;
`;
export const ImportFromCsv = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addGuests } = useGuests();
  const [file, setFile] = useState<File>();
  const [guests, setGuests] = useState<Guest[]>([]);
  const fileReader = new FileReader();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string: string) => {
    const csvHeader = string
      .slice(0, string.indexOf('\n'))
      .split(';')
      .map((h) => h.trim());
    const csvRows = string
      .slice(string.indexOf('\n') + 1, string.length - 1)
      .split('\n')
      .map((h) => h.trim());
    const guests = csvRows.map((row) => {
      const guestValues = row.split(';');
      const nameHeaderIndex = csvHeader.indexOf('name');
      const avecHeaderIndex = csvHeader.indexOf('avec');
      const friendHeaderIndex = csvHeader.indexOf('friendlist');
      const friendsString = guestValues?.[friendHeaderIndex];
      const friendNames = friendsString
        ?.split(',')
        ?.map((h) => h.trim())
        .filter((h) => h.length > 0);

      return {
        name: guestValues[nameHeaderIndex],
        avecName: guestValues[avecHeaderIndex],
        friendNames: friendNames ?? [],
      };
    });

    setGuests(guests);
  };
  const readFromCsv = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        if (!event.target) {
          return;
        }
        const text = event.target.result;
        if (!text || typeof text !== 'string') {
          return;
        }

        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const buttonSubmit = () => {
    addGuests(guests);
    setIsOpen(false);
    setGuests([]);
  };
  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Import guests
      </Button>
      <Modal
        title="Import from csv"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Stack dir="column" spacing={10}>
          <FileInput
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleOnChange}
          />
          <Scrollable>
            {guests.map((guest) => (
              <NameContainer key={guest.name}>
                <Body>Name: {guest.name}</Body>
                <Body>Avec: {guest.avecName}</Body>
                <Body>Friends: </Body>
                {guest.friendNames?.map((friend, i) => (
                  <Body key={i}>-{friend}</Body>
                ))}
              </NameContainer>
            ))}
          </Scrollable>
          <Button
            disabled={!file}
            onClick={(e) => {
              readFromCsv(e);
            }}
          >
            Read from csv
          </Button>
          <Button disabled={guests.length == 0} onClick={buttonSubmit}>
            Add guests
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
