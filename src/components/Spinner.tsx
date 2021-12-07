import { FC } from 'react'

interface SpinnerProps {
    text?: string
    size?: string
}
export const Spinner: FC<SpinnerProps> = ({ text, size = '5em' }) => {
    const header = text ? <h4>{text}</h4> : null
    return (
        <div className="spinner">
            {header}
            <div className="loader" style={{ height: size, width: size }} />
        </div>
    )
}
