import { TrashIcon } from "@heroicons/react/outline"

interface TrashProps {
    height?: number
    width?: number
    onClickHandler: () => void
}

function Trash({ height, width, onClickHandler }: TrashProps) {
    return (
        <TrashIcon
            width={width ?? 16}
            height={height ?? 16}
            className="opacity-30 hover:opacity-100 transition cursor-pointer"
            onClick={onClickHandler}
        />
    )
}

export default Trash
