import classnames from "classnames"

interface NumberInputProps {
    value: number
    onChange: (event: any) => void
    selectOnFocus?: boolean
    className?: string
    onKeyDown?: (event: any) => void
    placeholder?: string
    name?: string
}

function NumberInput({
    value,
    onChange,
    selectOnFocus,
    className,
    onKeyDown,
    placeholder,
    name,
}: NumberInputProps) {
    function onFocusHandler(event: any) {
        if (selectOnFocus) event.target.select()
    }

    return (
        <input
            placeholder={placeholder}
            className={classnames("rounded-lg", className)}
            value={value}
            type="number"
            min={0}
            onKeyDown={onKeyDown}
            onFocus={onFocusHandler}
            onChange={onChange}
            name={name}
        />
    )
}
export default NumberInput
