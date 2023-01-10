import styled from 'styled-components'
import { useTables } from '../../../hooks/useTables'
import { CANVAS_CONFIG } from './config'
import { Jesse } from './Jesse'
import { Table } from './table/Table'
import { scrollToCenter, useScrollableCanvas } from './useScrollableCanvas'

export const Canvas = () => {
    const tables = useTables((s) => s.tables)

    const scrollContainer = useScrollableCanvas()

    const setRef = (div: HTMLDivElement | null) => {
        scrollContainer.ref(div)
        scrollToCenter(div)
    }

    return (
        <CanvasContainer ref={setRef} id="canvas">
            <Floor id="floor">
                <Jesse />
                {tables.map((table, index) => (
                    <Table key={index} {...table} />
                ))}
            </Floor>
        </CanvasContainer>
    )
}

/**
 * Floor component where the tables are placed
 */
export const Floor = styled.div`
    position: relative;
    flex: 1;
    min-width: ${CANVAS_CONFIG.width}px;
    min-height: ${CANVAS_CONFIG.height}px;
    background-color: ${(props) => props.theme.color.background};

    // Dotted grid pattern
    background-size: 40px 40px;
    background-image: radial-gradient(
        circle,
        #a2a2a2 1px,
        rgba(0, 0, 0, 0) 1px
    );
`

/**
 * This makes the floor scrollable
 */
export const CanvasContainer = styled.div`
    flex: 1;
    display: flex;
    overflow: scroll;
    cursor: grab;
    height: 100%;
    position: relative;

    &.dragging {
        cursor: grabbing;
    }

    outline: 3px solid #41403e;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
`
