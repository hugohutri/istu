import { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../components/uikit/Modal'
import { Seats, Side, Table } from '../hooks/types'
import { createTable } from '../hooks/useTables'
import { CANVAS_CONFIG } from '../pages/editor/components/config'

const OpenModalButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
`
const ModalTitle = styled.h1`
    font-size: 24px;
    margin: 0 0 15px 0;
`

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
`
const SeatFormRow = styled.form`
    display: table-row;
`

const SeatFormLabel = styled.label`
    display: table-cell;
    font-size: 16px;
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
    const [tableValues, setTableValues] = useState([])

    return (
        <>
            <OpenModalButton onClick={() => setIsOpen(true)}>
                Add table
            </OpenModalButton>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalTitle>Add table</ModalTitle>

                <SeatForm>
                    <SeatFormRow>
                        <SeatFormTitle>
                            Number of seats on each side of the table
                        </SeatFormTitle>
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Left: </SeatFormLabel>
                        <SeatFormInput type="number" name="left" />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Right: </SeatFormLabel>
                        <SeatFormInput type="number" name="right" />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Top: </SeatFormLabel>
                        <SeatFormInput type="number" name="top" />
                    </SeatFormRow>
                    <SeatFormRow>
                        <SeatFormLabel>Bottom: </SeatFormLabel>
                        <SeatFormInput type="number" name="bottom" />
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
                <AcceptButton>Create Table</AcceptButton>
            </Modal>
        </>
    )
}
