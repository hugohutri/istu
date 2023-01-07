import { useScrollContainer } from 'react-indiana-drag-scroll';
import { CANVAS_CONFIG } from './config';
// import { useXarrow } from 'react-xarrows';

export const useScrollableCanvas = () => {
  // const updateXarrow = useXarrow();

  return useScrollContainer<HTMLDivElement>({
    mouseScroll: {
      ignoreElements: '.ignore-drag-scroll',
    },
    // onScroll: () => {
    //   updateXarrow();
    // },
  });
};
export const scrollToCenter = (canvas: HTMLDivElement | null) => {
  if (!canvas) return;
  canvas.scrollTo({
    top: CANVAS_CONFIG.height / 2 - canvas.clientHeight / 2,
    left: CANVAS_CONFIG.width / 2 - canvas.clientWidth / 2,
  });
};
