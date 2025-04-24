import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/uikit/Modal';
import { Button } from '../components/uikit/Button';
import { Input } from '../components/uikit/Input';
import { Table, Seats } from '../hooks/types';
import { useTables } from '../hooks/useTables';
import { useGuests } from '../hooks/useGuests';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface EditTableModalProps {
  table: Table;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTableModal = ({
  table,
  isOpen,
  onClose,
}: EditTableModalProps) => {
  const [tableName, setTableName] = useState(table.id);
  const setTables = useTables((store) => store.setTables);
  const tables = useTables((store) => store.tables);
  const guests = useGuests((store) => store.guests);
  const setGuests = useGuests((store) => store.setGuests);

  const onClickSave = () => {
    // Update table and its seats
    const updatedTables = tables.map((t) => {
      if (t.id === table.id) {
        // Update the table ID and all its seats' IDs
        const updatedSeats: Seats = {
          top: t.seats.top.map((seat) => ({
            ...seat,
            id: seat.id.replace(t.id, tableName),
            tableId: tableName,
          })),
          right: t.seats.right.map((seat) => ({
            ...seat,
            id: seat.id.replace(t.id, tableName),
            tableId: tableName,
          })),
          bottom: t.seats.bottom.map((seat) => ({
            ...seat,
            id: seat.id.replace(t.id, tableName),
            tableId: tableName,
          })),
          left: t.seats.left.map((seat) => ({
            ...seat,
            id: seat.id.replace(t.id, tableName),
            tableId: tableName,
          })),
        };

        return {
          ...t,
          id: tableName,
          seats: updatedSeats,
          location: t.location, // Preserve the location
        };
      }
      return t;
    });

    // Update guest seat references
    const updatedGuests = guests.map((guest) => {
      if (guest.seat?.tableId === table.id) {
        return {
          ...guest,
          seat: {
            ...guest.seat,
            id: guest.seat.id.replace(table.id, tableName),
            tableId: tableName,
          },
        };
      }
      return guest;
    });

    setTables(updatedTables);
    setGuests(updatedGuests);
    onClose();
  };

  return (
    <Modal title="Edit table" isOpen={isOpen} onClose={onClose}>
      <Form>
        <Input
          label="Name of table"
          placeholder="Name of the table here..."
          type="string"
          name="tableName"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <Button
          variant="primary"
          disabled={tableName.length === 0 || tableName === table.id}
          onClick={onClickSave}
          style={{ marginTop: '50px' }}
        >
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};
