export interface Workout {
    id: number
    logs: Log[]
    name: string
    tag: TagType
}

export interface Log {
    date: Date
    sets: Sets[]
}

export interface Sets {
    id: number
    reps: number
    weight: number
    goalReps?: number
}

export type TagType =
    | "bg-red-500"
    | "bg-pink-500"
    | "bg-violet-500"
    | "bg-green-500"
    | "bg-blue-500"
    | "bg-stone-500"
    | "bg-orange-500"
    | "bg-emerald-500"
    | "bg-lime-500"
    | "bg-teal-500"
    | "bg-cyan-500"
    | "bg-sky-500"
    | "bg-rose-500"
