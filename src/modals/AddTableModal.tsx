import { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../components/uikit/Modal'
import { Seats, Side, Table } from '../hooks/types'
import { useTables } from '../hooks/useTables'
import { newTable } from '../utils/generateRandomTables'
import { Button } from '../components/uikit/Button'

const SeatForm = styled.form`
    display: form;
    margin: 10px 0 10px 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 15px;
`
const SeatFormTitle = styled.h1`
    display: table-row;
    font-size: 18px;
    color: ${(props) => props.theme.color.text};
`
const SeatFormRow = styled.form`
    display: table-row;
`

const SeatFormLabel = styled.label`
    display: table-cell;
    font-size: 16px;
    color: ${(props) => props.theme.color.text};
`
const SeatFormInput = styled.input`
    display: table-cell;
    margin: 0 0 0 15px;
    width: 60px;
`

const AcceptButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
`

const DeclineButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 110px;
`

export const AddTableButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [topSeats, setTopSeats] = useState(0)
    const [bottomSeats, setBottomSeats] = useState(0)
    const [leftSeats, setLeftSeats] = useState(0)
    const [rightSeats, setRightSeats] = useState(0)
    const [tableName, setTableName] = useState('')
    const addTable = useTables((store) => store.addTable)

    const tables: Table[] = []

    const seats: Seats = {
        top: [],
        right: [],
        bottom: [],
        left: [],
    }

    const resetTableValues = () => {
        setBottomSeats(0)
        setLeftSeats(0)
        setRightSeats(0)
        setTopSeats(0)
        setTableName('')
    }

    const onClickCreateTable = () => {
        const table = newTable({
            top: topSeats,
            bottom: bottomSeats,
            left: leftSeats,
            right: rightSeats,
            tableName: tableName,
        })
        addTable(table)
        setIsOpen(false)
        resetTableValues()
    }

    return (
        <>
            <Button variant="neutral" onClick={() => setIsOpen(true)}>
                Add table
            </Button>
            <Modal
                title="Add table"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <SeatForm>
                    <SeatFormLabel>Name of table: </SeatFormLabel>
                    <SeatFormRow>
                        <SeatFormInput
                            type="string"
                            name="tableName"
                            onChange={(e) => setTableName(e.target.value)}
                        />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormTitle>
                            Number of seats on each side of the table
                        </SeatFormTitle>
                    </SeatFormRow>

                    <SeatFormRow>
                        <SeatFormLabel>Left: </SeatFormLabel>
                        <SeatFormInput
                            type="number"
                            name="left"
                            onChange={(e) => setLeftSeats(+e.target.value)}
                        />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Right: </SeatFormLabel>
                        <SeatFormInput
                            type="number"
                            name="right"
                            onChange={(e) => setRightSeats(+e.target.value)}
                        />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Top: </SeatFormLabel>
                        <SeatFormInput
                            type="number"
                            name="top"
                            onChange={(e) => setTopSeats(+e.target.value)}
                        />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Bottom: </SeatFormLabel>
                        <SeatFormInput
                            type="number"
                            name="bottom"
                            onChange={(e) => setBottomSeats(+e.target.value)}
                        />
                    </SeatFormRow>
                </SeatForm>

                <SeatForm>
                    <SeatFormRow>
                        <SeatFormTitle>Number of tables</SeatFormTitle>
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Tables: </SeatFormLabel>
                        <SeatFormInput type="number" name="bottom" />
                    </SeatFormRow>
                </SeatForm>
                <DeclineButton onClick={() => setIsOpen(false)}>
                    Cancel
                </DeclineButton>
                <AcceptButton onClick={onClickCreateTable}>
                    Create Table
                </AcceptButton>
            </Modal>
        </>
    )
}
