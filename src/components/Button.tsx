import styles from './Button.module.css'

type ButtonProps = {
    label: string;
    onClick: () => void
    variant?: 'primary' | 'secondary'
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}>
                {label}
        </button>
    )
}

export default Button