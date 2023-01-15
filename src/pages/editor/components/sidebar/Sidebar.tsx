import styled from 'styled-components';
import { Button } from '../../../../components/uikit/Button';
import { Stack } from '../../../../components/uikit/Stack';
import { exportPNG } from '../../../../hooks/exportPNG';
import { useGuests } from '../../../../hooks/useGuests';
import { ImportFromCsv } from '../../../../modals/AddCsvModal';
import { AddGuest } from '../../../../modals/AddPersonModal';
import { GuestItem } from './GuestItem';
import { OptimizeButton } from './Optimize';
import { AddTableButton } from '../../../../modals/AddTableModal';
import { A } from '../../../../components/uikit/A';
import { ExportModal } from '../../../../modals/ExportModal';

const StyledSidebar = styled.div`
  color: ${(props) => props.theme.color.onPrimary};
  background-color: ${(props) => props.theme.color.primary};
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const NameList = styled(Stack)`
  flex-grow: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.primary};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.onPrimary};
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  /* align-items: center; */
  padding: 1rem 0.5rem;
  border-top: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.color.onPrimary};
  background-color: ${(props) => props.theme.color.primary};
`;

export const Sidebar = () => {
  const guests = useGuests((s) => s.guests);
  const setGuests = useGuests((s) => s.setGuests);

  return (
    <StyledSidebar>
      <NameList dir="column">
        <div>
          {guests.length > 0 && (
            <ButtonA onClick={() => setGuests([])}>Delete all</ButtonA>
          )}
          {guests.map((guest) => (
            <GuestItem guest={guest} key={guest.name} />
          ))}
        </div>
      </NameList>
      <Footer>
        <ImportFromCsv />
        <AddGuest />
        <AddTableButton />
        <OptimizeButton />
        <ExportModal />
        {/* <Button
          variant="neutral"
          onClick={() => {
            const floor = document.getElementById('floor');
            if (!floor) return;
            exportPNG(floor);
          }}
        >
          Export PNG
        </Button> */}
      </Footer>
    </StyledSidebar>
  );
};

const ButtonA = styled(A)`
  display: flex;
  justify-content: end;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.primary};
`;
