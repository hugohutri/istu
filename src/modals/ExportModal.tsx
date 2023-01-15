import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Body } from '../components/uikit/Body';
import { Button } from '../components/uikit/Button';
import { Modal } from '../components/uikit/Modal';
import { useGuests } from '../hooks/useGuests';
import { useTables } from '../hooks/useTables';
import { CANVAS_CONFIG } from '../pages/editor/components/config';
import { Table } from '../pages/editor/components/table/Table';
// import { scrollToCenter } from '../pages/editor/components/useScrollableCanvas';
import domtoimage from 'dom-to-image-more';
import format from 'date-fns/format';
import { Spacer } from '../components/uikit/Spacer';

export const ExportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Export as PNG
      </Button>

      <Modal
        title="Export as PNG"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContainer>
          <Body>Export as PNG</Body>

          <Preview style={{ position: 'relative' }}>
            <Canvas />
          </Preview>
          <Spacer amount="10px" />
          <Button
            onClick={() => {
              exportPNG();
            }}
          >
            Export
          </Button>
        </ModalContainer>
      </Modal>
    </>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Preview = styled.div`
  position: relative;
  height: 50vmin;
  aspect-ratio: 1/1;
`;

const Canvas = () => {
  const tables = useTables((s) => s.tables);
  const guests = useGuests((s) => s.guests);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //   scrollToCenterOf(ref.current);
    // scrollToCenter(ref.current);
  }, [ref.current]);

  //   const getMinimumCanvasSize = () => {
  //     const tablePositions = tables.map((table) => ({
  //       x: table.location.x,
  //       y: table.location.y,
  //       width: table.size.width,
  //       height: table.size.height,
  //     }));
  //     const minX = Math.min(...tablePositions.map((table) => table.x));
  //     const minY = Math.min(...tablePositions.map((table) => table.y));
  //     const maxX = Math.max(
  //       ...tablePositions.map((table) => table.x + table.width)
  //     );
  //     const maxY = Math.max(
  //       ...tablePositions.map((table) => table.y + table.height)
  //     );

  //     return {
  //       width: maxX - minX,
  //       height: maxY - minY,
  //       minX,
  //       minY,
  //     };
  //   };

  return (
    <CanvasContainer ref={ref}>
      <ExportContainer id="export">
        <NameList>
          {guests.map((guest) => (
            <Body key={guest.name}>{guest.name}</Body>
          ))}
        </NameList>

        <Floor>
          <div style={{ position: 'relative' }}>
            {tables.map((table) => (
              <Table key={table.id} {...table} />
            ))}
          </div>
        </Floor>
      </ExportContainer>
    </CanvasContainer>
  );
};

const ExportContainer = styled.div`
  position: relative;
  /* display: grid;
  grid-template-columns: auto 1fr; */
  display: flex;
  flex-direction: row;
`;

const NameList = styled.div`
  flex-direction: column;
  border: 1px solid black;
  gap: 0.2rem;
  padding: 1rem;
`;

// function scrollToCenterOf(ref: HTMLDivElement | null) {
//   if (!ref) return;

//   const rect = ref.getBoundingClientRect();
//   ref.scrollTo(rect.x + rect.width, rect.y + rect.height);
// }

/**
 * Floor component where the tables are placed
 */
export const Floor = styled.div`
  /* width: max-content;
  height: fit-content; */
  min-width: ${CANVAS_CONFIG.width}px;
  min-height: ${CANVAS_CONFIG.height}px;
  background-color: ${(props) => props.theme.color.background};

  /* outline: 3px solid red; */
  /* align-self: center; */

  // Dotted grid pattern
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #a2a2a2 1px, rgba(0, 0, 0, 0) 1px);

  /* transform: scale(0.2); */
  pointer-events: none;
`;

/**
 * This makes the floor scrollable
 */
export const CanvasContainer = styled.div`
  overflow: scroll;
  cursor: grab;
  height: 50vmin;
  aspect-ratio: 1/1;

  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */

  /* transform: translate(-50vmin, -50vmin) scale(0.5); */

  outline: 3px solid #41403e;
`;

function getFileName(fileType: string) {
  return `${format(new Date(), "'Seats-'dd.MM.yyyy")}.${fileType}`;
}

async function exportPNG() {
  const exportedCanvas = document.getElementById('export');
  if (!exportedCanvas) return;

  const url = await domtoimage.toPng(exportedCanvas, { bgcolor: 'white' });
  const link = document.createElement('a');
  link.download = getFileName('png');
  link.href = url;
  link.click();
}
