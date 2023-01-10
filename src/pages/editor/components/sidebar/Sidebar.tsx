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

const StyledSidebar = styled.div`
  /* padding: 0.5rem 0; */
  color: ${(props) => props.theme.color.onPrimary};
  background-color: ${(props) => props.theme.color.primary};
  display: flex;
  flex-direction: column;
  /* overflow-y: auto; */
  overflow-y: hidden;
`;

const NameList = styled(Stack)`
  flex-grow: 1;
  overflow-y: scroll;
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

  return (
    <StyledSidebar>
      <NameList dir="column">
        <div>
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
        <Button
          variant="neutral"
          onClick={() => {
            const floor = document.getElementById('floor');
            if (!floor) return;
            exportPNG(floor);
          }}
        >
          Export PNG
        </Button>
      </Footer>
    </StyledSidebar>
  );
};
