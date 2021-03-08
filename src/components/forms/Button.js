import React from 'react'

const Button = ({children, ...otherProps}) => {
    return (
        <button className="w-full rounded-sm py-2 bg-black text-white" {...otherProps}>
            {children}
        </button>
    )
}

export default Button
