import Sider from 'antd/es/layout/Sider';
import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';

const StyledSidebar = styled(Sider)`
  background-color: #fff !important;
  padding: 1rem;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Stack spacing={10}>sidebar</Stack>
    </StyledSidebar>
  );
};
