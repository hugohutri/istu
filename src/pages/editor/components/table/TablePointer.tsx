import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from 'styled-components';

// WIP
// This element points to an element with id
export const ElementPointer = ({ id }: { id: string }) => {
  const [angle, setAngle] = useState(0);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(id);
    setElement(el);
  }, [id]);

  useEffect(() => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = rect.x + rect.width / 2;
      const y = rect.y + rect.height / 2;
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      setAngle(angle);
    }
  }, [element]);

  return <PointerIcon id="ARROW" angle={angle} />;
};

const PointerIcon = styled(FaArrowUp)<{ angle: number }>`
  position: absolute;
  z-index: 100000;
  top: 50%;
  left: 50%;
  color: ${({ theme }) => theme.color.pencil};
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(${({ angle }) => angle}deg);
`;
