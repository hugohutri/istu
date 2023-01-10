import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { Button } from '../components/uikit/Button';
import { Stack } from '../components/uikit/Stack';

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

  const [file, setFile] = useState<File>();
  const [guests, setGuests] = useState<{ name: string }[]>([]);
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
      .split(',')
      .map((h) => h.trim());
    const csvRows = string
      .slice(string.indexOf('\n') + 1)
      .split('\n')
      .map((h) => h.trim());
    console.log(csvHeader);
    console.log(csvRows);
    const guests = csvRows.map((row) => {
      const guestValues = row.split(',');
      console.log(guestValues);
      const nameHeaderIndex = csvHeader.indexOf('name');
      console.log(nameHeaderIndex);
      return {
        name: guestValues[nameHeaderIndex],
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
        //console.log(event.target.result);
        const text = event.target.result;
        if (!text || typeof text !== 'string') {
          return;
        }

        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  //const headerKeys = Object.keys(Object.assign({}, ...guests));
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
          <Button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Import csv
          </Button>
          {guests.map((guest) => (
            <div key={guest.name}>{guest.name}</div>
          ))}
          <div>{JSON.stringify(guests)}</div>
        </Stack>
      </Modal>
    </>
  );
};
