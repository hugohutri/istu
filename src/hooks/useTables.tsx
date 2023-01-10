import create from 'zustand'
import { Seats, Table, TableSize } from './types'

/************************
 * HELPER FUCTIONS
 ************************/

export const createTable = (name: string, seats: Seats): Table => {
    const tableSize = calculateTableSize(seats)
    return {
        id: name,
        size: tableSize,
        seats,
    }
}

const DISTANCE_OF_SEATS = 65
const TABLE_DEPTH = 100

export const calculateTableSize = (seats: Seats): TableSize => {
    const maxWidth = Math.max(seats.top.length, seats.bottom.length)
    const maxHeight = Math.max(seats.left.length, seats.right.length)

    const width = maxWidth * DISTANCE_OF_SEATS
    const height = maxHeight * DISTANCE_OF_SEATS

    return {
        width: Math.max(width, TABLE_DEPTH),
        height: Math.max(height, TABLE_DEPTH),
    }
}

/************************
 * HOOKS
 ************************/
type TablesStore = {
    tables: Table[]
    setTables: (tables: Table[]) => void
    addTable: (newTable: Table) => void
}

export const useTables = create<TablesStore>((set) => ({
    tables: [],

    setTables: (tables) => set(() => ({ tables })),

    addTable: (newTable) =>
        set((state) => ({ tables: [...state.tables, newTable] })),
}))

export const getSeats = (tables: Table[]) => {
    return tables.flatMap((t) => t.seats.top).flat()
}
