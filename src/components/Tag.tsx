import classnames from "classnames"
import { TagType } from "../Model"

function Tag({ type }: { type: TagType }) {
    return <div className={classnames("h-2 w-2 rounded-full", type)} />
}

export default Tag
