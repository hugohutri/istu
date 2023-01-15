import { useEffect, useState } from 'react';
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
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (!isOpen) {
      setImage(undefined);
    } else {
      getImage().then((image) => {
        setImage(image);
      });
    }
  }, [isOpen]);

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Export
      </Button>

      <Modal title="Export" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContainer>
          <Body>Export as a PNG file</Body>
          <Image src={image} />
          <Spacer amount="10px" />
          <Button onClick={() => exportPNG()}>Download</Button>
        </ModalContainer>
        <RenderedHiddenCanvas />
      </Modal>
    </>
  );
};

const Image = styled.img`
  height: 70vmin;
  border: 1px solid ${(props) => props.theme.color.border};
  width: auto;
  aspect-ratio: ${CANVAS_CONFIG.width} / ${CANVAS_CONFIG.height};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RenderedHiddenCanvas = () => {
  const tables = useTables((s) => s.tables);
  const guests = useGuests((s) => s.guests);

  return (
    <Hidden>
      <ExportedView id="export">
        <NameList>
          {guests.map((guest) => (
            <Body key={guest.name}>{guest.name}</Body>
          ))}
        </NameList>

        <FloorContainer>
          <Floor height={1000} width={1000} top={700} left={700}>
            <div style={{ position: 'relative' }}>
              {tables.map((table) => (
                <Table key={table.id} {...table} />
              ))}
            </div>
          </Floor>
        </FloorContainer>
      </ExportedView>
    </Hidden>
  );
};

const FloorContainer = styled.div``;

const ExportedView = styled.div`
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

type FittedFloorProps = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export const Floor = styled.div<FittedFloorProps>`
  /* width: max-content;
  height: fit-content; */
  /* margin-top: -500px; */
  /* margin-left: -500px; */
  /* margin-top: -${(props) => props.top}px;
  margin-left: -${(props) => props.left}px; */
  /* width: ${(props) => props.width}px;
  height: ${(props) => props.height}px; */

  // zoom children
  min-width: ${CANVAS_CONFIG.width}px;
  min-height: ${CANVAS_CONFIG.height}px;
  background-color: ${(props) => props.theme.color.background};
  transform: translateZ(0);
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
export const Hidden = styled.div`
  overflow: hidden;

  height: 0;
  width: 0;
  position: absolute;
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

async function getImage() {
  const exportedCanvas = document.getElementById('export');
  if (!exportedCanvas) return;

  const dataUrl = await domtoimage.toPng(exportedCanvas, { bgcolor: 'white' });
  return dataUrl;
}
