import { useState, useRef } from "react"
import NumberInput from "./NumberInput"

interface SetFormProps {
    onSubmit: (weight: number, reps: number) => void
}

function SetForm({ onSubmit }: SetFormProps) {
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const weightRef = useRef<HTMLInputElement>()
    function onSubmitHandler(event: any) {
        event.preventDefault()
        if (weight >= 0 && reps >= 0) {
            onSubmit(weight, reps)
            setReps(0)
            setWeight(0)
            if (weightRef.current) weightRef.current.focus()
        }
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-3 space-x-2 border p-1 rounded-lg mb-2">
                <label className="flex flex-col">
                    <span className="text-sm text-gray-500">Weight</span>
                    <NumberInput
                        placeholder="weight"
                        className="px-2 py-1 rounded-lg bg-gray-50"
                        value={weight}
                        selectOnFocus
                        name="weight"
                        onChange={event =>
                            setWeight(parseInt(event.target.value))
                        }
                    />
                </label>

                <label className="flex flex-col">
                    <span className="text-sm text-gray-500">Reps</span>
                    <NumberInput
                        placeholder="reps"
                        className="px-2 py-1 rounded-lg bg-gray-50"
                        value={reps}
                        selectOnFocus
                        name="reps"
                        onChange={event =>
                            setReps(parseInt(event.target.value))
                        }
                    />
                </label>
                <input
                    type={"submit"}
                    value="Add"
                    className="cursor-pointer hover:bg-gray-100 rounded-md transition border bg-gray-50"
                />
            </div>
        </form>
    )
}

export default SetForm
