import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { Button } from '../components/uikit/Button';
import { Stack } from '../components/uikit/Stack';
import { useGuests } from '../hooks/useGuests';
import { Guest } from '../hooks/types';

const OpenModalButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 1rem;
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.color.textInverted};
`;

export const AddCsvModal = () => {
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
      .slice(string.indexOf('\n') + 1)
      .split('\n')
      .map((h) => h.trim());
    const guests = csvRows.map((row) => {
      const guestValues = row.split(';');
      const nameHeaderIndex = csvHeader.indexOf('name');
      const avecHeaderIndex = csvHeader.indexOf('avec');
      const friendHeaderIndex = csvHeader.indexOf('friendlist');
      return {
        name: guestValues[nameHeaderIndex],
        avecName: guestValues[avecHeaderIndex],
        friendNames: [guestValues[friendHeaderIndex]],
      };
    });

    setGuests(guests);
  };
  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
  };
  return (
    <>
      <OpenModalButton onClick={() => setIsOpen(true)}>Add csv</OpenModalButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle> Import csv </ModalTitle>
        <Stack dir="column" spacing={10}>
          <input
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleOnChange}
          />
          {guests.map((guest) => (
            <div key={guest.name}>
              <div>Name: {guest.name}</div>
              <div>Avec: {guest.avecName}</div>
              <div>Friends: {guest.friendNames}</div>
            </div>
          ))}
          <Button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Read from csv
          </Button>
          <Button onClick={buttonSubmit}>Add guests</Button>
        </Stack>
      </Modal>
    </>
  );
};
