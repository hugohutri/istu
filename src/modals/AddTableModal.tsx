import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
// import { Seats, Side, Table } from '../hooks/types';
import { createTableObject, useTables } from '../hooks/useTables';
import { Button } from '../components/uikit/Button';
import { Body } from '../components/uikit/Body';
import { Input } from '../components/uikit/Input';
import { Spacer } from '../components/uikit/Spacer';

const SeatForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AddTableButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topSeats, setTopSeats] = useState(0);
  const [bottomSeats, setBottomSeats] = useState(0);
  const [leftSeats, setLeftSeats] = useState(0);
  const [rightSeats, setRightSeats] = useState(0);
  const [tableName, setTableName] = useState('');
  const addTable = useTables((store) => store.addTable);

  const resetTableValues = () => {
    setBottomSeats(0);
    setLeftSeats(0);
    setRightSeats(0);
    setTopSeats(0);
    setTableName('');
  };

  const onClickCreateTable = () => {
    const table = createTableObject({
      seatCount: {
        top: topSeats,
        right: rightSeats,
        bottom: bottomSeats,
        left: leftSeats,
      },
      tableName,
    });
    console.log('table', table);
    addTable(table);
    setIsOpen(false);
    resetTableValues();
  };

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Add table
      </Button>
      <Modal title="Add table" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SeatForm>
          <Input
            label="Name of table"
            placeholder="Name of the table here..."
            type="string"
            name="tableName"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <Spacer amount="50px" />

          <Body variant="bold">Number of seats on each side:</Body>

          <Input
            label="Seats on top"
            placeholder="top"
            name="top"
            type="number"
            value={topSeats}
            onChange={(e) => setTopSeats(+e.target.value)}
          />

          <Input
            label="Seats on right"
            placeholder="right"
            name="right"
            type="number"
            value={rightSeats}
            onChange={(e) => setRightSeats(+e.target.value)}
          />

          <Input
            label="Seats on bottom"
            placeholder="bottom"
            name="bottom"
            type="number"
            value={bottomSeats}
            onChange={(e) => setBottomSeats(+e.target.value)}
          />

          <Input
            label="Seats on left"
            placeholder="left"
            name="left"
            type="number"
            value={leftSeats}
            onChange={(e) => setLeftSeats(+e.target.value)}
          />

          <Spacer amount="50px" />
          <Button
            variant="primary"
            disabled={tableName.length === 0}
            onClick={onClickCreateTable}
          >
            Create Table
          </Button>
        </SeatForm>
      </Modal>
    </>
  );
};
