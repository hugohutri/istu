import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding: 0.5rem;
  margin: 0.3rem;

  background-color: rgba(255, 255, 255, 0.666);
  outline: 1px solid ${(props) => props.theme.color.border};
  pointer-events: none;
  user-select: none;
`;
