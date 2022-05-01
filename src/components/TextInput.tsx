import classnames from "classnames"

interface TextInputProps {
    value: string
    onChange: (event: any) => void
    selectOnFocus?: boolean
    className?: string
    onKeyDown?: (event: any) => void
    placeholder?: string
    name?: string
}

function TextInput({
    value,
    onChange,
    selectOnFocus,
    className,
    onKeyDown,
    placeholder,
    name,
}: TextInputProps) {
    function onFocusHandler(event: any) {
        if (selectOnFocus) event.target.select()
    }

    return (
        <input
            placeholder={placeholder}
            className={classnames("rounded-lg", className)}
            value={value}
            onKeyDown={onKeyDown}
            onFocus={onFocusHandler}
            onChange={onChange}
            name={name}
        />
    )
}

export default TextInput
