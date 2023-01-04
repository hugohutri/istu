import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-decoration: underline;
`;

export const Sandbox = () => {
  const [title, setTitle] = useState('Hello');

  useEffect(() => {
    console.log('RENDER');

    return () => {
      console.log('UNMOUNT');
    };
  }, []);

  return (
    <>
      <Title color="red">{title}</Title>
      <Button label="Moro" onClick={() => setTitle('button')} />
      <DeletButton />
    </>
  );
};

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

const Button = ({ onClick, label }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

const DeletButton = () => {
  return <button>Delete</button>;
};
