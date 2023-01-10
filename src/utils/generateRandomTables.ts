import { Seats, Side, Table } from '../hooks/types'
import { createTable } from '../hooks/useTables'
import { CANVAS_CONFIG } from '../pages/editor/components/config'

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomPositionOnCanvas = () => {
    const { width, height } = CANVAS_CONFIG
    return {
        x: Math.floor(random(width * 0.3, width * 0.7)),
        y: Math.floor(random(height * 0.3, height * 0.7)),
    }
}

export const POSSIBLE_SIDE_GROUPS: Side[][] = [
    ['top', 'right', 'bottom', 'left'],
    ['top', 'bottom'],
    ['top', 'bottom'],
    ['top', 'bottom'],
    ['right', 'left'],
    ['right', 'left'],
    ['right', 'left'],
]

const randomSides = (): Side[] => {
    const random = Math.floor(Math.random() * POSSIBLE_SIDE_GROUPS.length)
    return POSSIBLE_SIDE_GROUPS[random]
}

export const generateRandomTables = (amount: number) => {
    const tables: Table[] = []

    for (let i = 0; i < amount; i++) {
        const seats: Seats = {
            top: [],
            right: [],
            bottom: [],
            left: [],
        }

        const sides = randomSides()
        const random = 2 + Math.floor(Math.random() * 3)

        const tableName = `Table ${i}`

        for (const side of sides) {
            for (let j = 0; j < random; j++) {
                seats[side].push({
                    id: `${tableName} Seat ${side}-${j}`,
                    tableId: tableName,
                    side,
                })
            }
        }

        tables.push(createTable(tableName, seats))
    }

    return tables
}

export const newTable = ({
    top,
    bottom,
    right,
    left,
    tableName,
}: {
    top: number
    bottom: number
    right: number
    left: number
    tableName: string
}) => {
    const seats: Seats = {
        top: [],
        right: [],
        bottom: [],
        left: [],
    }

    for (let i = 0; i < top; i++) {
        seats.top.push({
            id: `${tableName} Seat top-${i}`,
            tableId: tableName,
            side: 'top',
        })
    }
    for (let i = 0; i < bottom; i++) {
        seats.bottom.push({
            id: `${tableName} Seat bottom-${i}`,
            tableId: tableName,
            side: 'bottom',
        })
    }
    for (let i = 0; i < right; i++) {
        seats.right.push({
            id: `${tableName} Seat right-${i}`,
            tableId: tableName,
            side: 'right',
        })
    }
    for (let i = 0; i < left; i++) {
        seats.left.push({
            id: `${tableName} Seat left-${i}`,
            tableId: tableName,
            side: 'left',
        })
    }

    return createTable(tableName, seats)
}
