import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Guest } from '../../../../hooks/types';
import { useJesse } from '../Jesse';

export const JessePlaceholder = ({
  isHover,
  guest,
}: {
  isHover: boolean;
  guest: Guest;
}) => {
  const placeRef = useRef<HTMLDivElement>(null);
  const setPos = useJesse((s) => s.setPos);
  const setGuest = useJesse((s) => s.setGuest);
  const setIsHovering = useJesse((s) => s.setIsHovering);

  useEffect(() => {
    if (isHover) onHover();
    else afterHover();
  }, [isHover]);

  const onHover = () => {
    if (!placeRef.current) return;

    const to = setTimeout(() => {
      if (!placeRef.current) return;
      const pos = getPosition(placeRef.current);
      setPos(pos);
      setGuest(guest);
      setIsHovering(true);
    }, 20);
    return () => clearTimeout(to);
  };

  const afterHover = () => {
    setIsHovering(false);
  };

  return <PlaceHolder ref={placeRef} />;
};

const PlaceHolder = styled.div`
  position: absolute;
  top: 0;
  z-index: 1000;
  left: -2rem;
  width: 3px;
  height: 3px;
  background-color: red;
`;

function getPosition(element: HTMLDivElement) {
  // get element position relative to #canvas
  const rect = element.getBoundingClientRect();
  const canvas = document.getElementById('canvas');
  if (!canvas) return { x: 0, y: 0 };
  const canvasRect = canvas.getBoundingClientRect();

  return {
    x: rect.left - canvasRect.left,
    y: rect.top - canvasRect.top,
  };
  //   const navBarHeight = document.getElementById('nav')?.clientHeight ?? 0;
  //   const pos = element.getBoundingClientRect();

  //   return {
  //     x: pos.x,
  //     y: pos.y - navBarHeight,
  //   };
}
