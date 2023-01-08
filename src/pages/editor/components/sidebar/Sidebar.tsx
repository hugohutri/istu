import styled from 'styled-components';
import { Stack } from '../../../../components/uikit/Stack';
import { useGuests } from '../../../../hooks/useGuests';
import { AddPersonModal } from '../../../../modals/AddPersonModal';
import { GuestItem } from './GuestItem';

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
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
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
        <AddPersonModal />
      </Footer>
    </StyledSidebar>
  );
};
