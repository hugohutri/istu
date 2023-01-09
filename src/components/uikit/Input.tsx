import styled from 'styled-components';

const Label = styled.label`
  display: table-cell;
  color: ${({ theme }) => theme.color.text};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.xsmall};
`;

const StyledInput = styled.input`
  display: table-cell;
  padding: 0.5rem;
  color: ${({ theme }) => theme.color.text};
  font-family: 'Comfortaa';
  font-size: ${({ theme }) => theme.fontSize.xsmall};

  border: 1px solid ${({ theme }) => theme.color.text};
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = ({ label, value, ...props }: InputProps) => {
  return (
    <Container>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <StyledInput value={value ?? ''} {...props} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
