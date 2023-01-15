import styled from 'styled-components';

export const Friendlist = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.text};

  &:empty:after {
    content: '-';
  }
  :before {
    content: 'Friends: \n';
    font-weight: bold;
  }
`;
