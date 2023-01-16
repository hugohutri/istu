import { useState } from 'react'
import styled from 'styled-components'
import { Body } from '../../../../components/uikit/Body'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Table } from '../../../../hooks/types'
import { useTables } from '../../../../hooks/useTables'
import { useGuests } from '../../../../hooks/useGuests'

export const TableMenu = ({ table }: { table: Table }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setIsOpen(false))
    const deleteTable = useTables((s) => s.deleteTable)
    const setGuests = useGuests((s) => s.setGuests)
    const guests = useGuests((s) => s.guests)

    const onClickDelete = () => {
        deleteTable(table)
        clearTable()
    }

    const clearTable = () => {
        const newGuests = guests.map((guest) => {
            if (guest.seat?.tableId === table.id) {
                guest.seat = undefined
            }
            return guest
        })
        setGuests(newGuests)
    }
    return (
        <>
            <MenuButton
                className={`table-menu ${isOpen ? 'table-menu-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                ···
            </MenuButton>
            {isOpen && (
                <ContextMenu ref={ref}>
                    {/* <ContextMenuButton>Duplicate</ContextMenuButton> */}
                    <ContextMenuButton onClick={clearTable}>
                        Clear table
                    </ContextMenuButton>
                    <ContextMenuButton onClick={onClickDelete}>
                        Delete
                    </ContextMenuButton>
                </ContextMenu>
            )}
        </>
    )
}

const MenuButton = styled.div`
    height: 14px;
    width: 28px;
    position: absolute;
    top: 5px;
    right: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 2px;
    color: white;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.border};
    font-size: 26px;
    letter-spacing: 0px;

    display: none;
    :hover {
        cursor: pointer;
        scale: 1.1;
    }
`
const ContextMenu = styled.div`
    background-color: white;
    position: absolute;
    top: 5px;
    right: -10px;
    transform: translateX(100%);
`
const ContextMenuButton = styled(Body)`
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.border};
    white-space: nowrap;
    &:hover {
        background-color: ${(props) => props.theme.color.primaryElevated};
        color: ${(props) => props.theme.color.onPrimary};
        cursor: pointer;
    }
`
