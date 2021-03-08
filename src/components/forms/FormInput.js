import React from 'react'

const FormInput = ({handelChange, label, ...otherProps}) => {
    return (
        <div>
            {label &&(
                <label>
                    {label}
                </label>
            )}

            <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md mb-2 py-2" onChange={handelChange} {...otherProps}/>
        </div>
    );
}

export default FormInput
