import { useState } from "react"
import classnames from "classnames"
import { Workout, Sets, Log } from "./Model"
import useLocalStorage from "./hooks/useLocalStorage"
import TextInput from "./components/TextInput"
import Tag from "./components/Tag"
import { compareDate, nowDate } from "./helpers/date"
import SetForm from "./components/SetForm"
import Trash from "./components/Trash"

function App() {
    const [workouts, setWorkouts] = useLocalStorage<Workout[]>("workouts", [])
    const [selectedWorkout, setSelectedWorkout] = useState(workouts[0])
    const [newWorkoutName, setNewWorkoutName] = useState("")

    const onKeyPress = (event: any) => {
        if (event.key === "Enter" && event.target.value !== "") {
            let newWorkout: Workout = {
                id: workouts.length,
                logs: [],
                name: event.target.value,
                tag: "bg-stone-500",
            }

            setWorkouts([...workouts, newWorkout])
            setSelectedWorkout(newWorkout)
            setNewWorkoutName("")
        }
    }

    const onSetFormSubmitHandler = (weight: number, reps: number) => {
        let entryDate = nowDate()
        let workout = selectedWorkout

        let log = selectedWorkout.logs.find(
            x =>
                new Date(x.date).toLocaleDateString() ===
                new Date(entryDate).toLocaleDateString()
        )
        if (log) {
            let newSet: Sets = {
                id: log.sets.length,
                reps: reps,
                weight: weight,
            }

            log.sets.push(newSet)
            workout.logs = workout.logs.map(x => {
                if (x.date === log?.date) return log
                return x
            })

            let updateWorkouts = workouts.map(x => {
                if (x.id === workout.id) return workout
                return x
            })

            setWorkouts(updateWorkouts)
        } else {
            let newSet: Sets = {
                id: 0,
                reps: reps,
                weight: weight,
            }

            workout.logs.push({
                date: entryDate,
                sets: [newSet],
            })

            updateWorkout("logs", workout.logs, workout)
        }
    }

    const updateWorkout = (
        key: keyof Workout,
        value: any,
        workout: Workout
    ) => {
        let newWorkout = { ...workout, [key]: value }
        let newWorkouts = workouts.map(x => {
            if (x.id === workout.id) return newWorkout
            return x
        })
        setWorkouts(newWorkouts)
    }

    const onDeleteSetHandler = (log: Log, set: Sets) => {
        let newWorkout = selectedWorkout
        let newSets = log.sets.filter(x => x.id !== set.id)
        log.sets = newSets

        newWorkout.logs = selectedWorkout.logs.map(x => {
            if (compareDate(x.date, log.date)) return log
            return x
        })

        let newWorkouts = workouts.map(x => {
            if (x.id === newWorkout.id) return newWorkout
            return x
        })

        setWorkouts(newWorkouts)
    }
    return (
        <div className="h-screen w-screen py-2">
            <h1 className="text-center font-medium text-xl p-4">
                Workout Tracker
            </h1>
            <div className="mx-auto max-w-3xl flex">
                {workouts.length > 0 ? (
                    <>
                        <div className="w-72 border-r p-2">
                            <h2 className="font-medium text-center mb-4">
                                Workouts
                            </h2>
                            <div className="space-y-1">
                                <TextInput
                                    className="w-full p-2 rounded-lg border"
                                    placeholder="new workout"
                                    onKeyDown={onKeyPress}
                                    value={newWorkoutName}
                                    onChange={event =>
                                        setNewWorkoutName(event.target.value)
                                    }
                                />
                                {workouts.map(x => (
                                    <div
                                        key={x.id}
                                        className={classnames(
                                            "px-2.5 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition flex items-center space-x-2",
                                            {
                                                "bg-gray-200 hover:bg-gray-200":
                                                    x.id === selectedWorkout.id,
                                            }
                                        )}
                                        onClick={() => setSelectedWorkout(x)}
                                    >
                                        <Tag type={x.tag} />
                                        <div>{x.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-2 flex-grow">
                            <div className="flex items-center space-x-2 mb-4 justify-center">
                                <Tag type={selectedWorkout.tag} />
                                <h2 className="font-medium text-center">
                                    {selectedWorkout.name}
                                </h2>
                                <Trash
                                    width={16}
                                    height={16}
                                    onClickHandler={() => {
                                        setWorkouts(
                                            workouts.filter(
                                                x => x.id !== selectedWorkout.id
                                            )
                                        )
                                        if (workouts.length > 0)
                                            setSelectedWorkout(workouts[0])
                                    }}
                                />
                            </div>

                            <div className="w-full border-lg">
                                <SetForm onSubmit={onSetFormSubmitHandler} />
                                <div className="space-y-2">
                                    {selectedWorkout.logs
                                        .filter(x => x.sets.length > 0)
                                        .map(log => (
                                            <div
                                                key={new Date(
                                                    log.date
                                                ).toLocaleDateString()}
                                            >
                                                <h1 className="font-medium text-gray-500 mb-2">
                                                    {new Date(
                                                        log.date
                                                    ).toLocaleDateString()}
                                                </h1>
                                                <div className="space-y-1.5">
                                                    {log.sets.map(set => (
                                                        <div
                                                            key={set.id}
                                                            className="bg-gray-100 p-1 rounded-lg px-2.5 flex items-center justify-between"
                                                        >
                                                            <div>
                                                                {set.weight} kg
                                                                x {set.reps}{" "}
                                                                reps
                                                            </div>

                                                            <div>
                                                                <Trash
                                                                    width={18}
                                                                    height={18}
                                                                    onClickHandler={() =>
                                                                        onDeleteSetHandler(
                                                                            log,
                                                                            set
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mx-auto space-y-4">
                        <h2 className="font-medium text-gray-500 text-center">
                            Type in a workout name below and press enter to get
                            started.
                        </h2>

                        <TextInput
                            className="w-full p-2 rounded-lg border"
                            placeholder="e.g. Bench press, Shoulder press, Squats"
                            onKeyDown={onKeyPress}
                            value={newWorkoutName}
                            onChange={event =>
                                setNewWorkoutName(event.target.value)
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
