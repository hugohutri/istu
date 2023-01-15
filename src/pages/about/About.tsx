import styled from 'styled-components';
import { A } from '../../components/uikit/A';
import { Body } from '../../components/uikit/Body';
import { Spacer } from '../../components/uikit/Spacer';

export const About = () => {
  return (
    <Container>
      <Body size="large">About</Body>
      <Spacer amount="1rem" />
      <Body>
        This page is under development. Please check back later for more.
      </Body>
      <Spacer amount="1rem" />
      <A>https://github.com/hugohutri/istu</A>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
