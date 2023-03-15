// InputBox.tsx
import React, { forwardRef } from "react";

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

const InputBox = forwardRef<HTMLInputElement, Props>(
    ({ value, onChange, disabled }, ref) => {
        return (
            <input
                ref={ref}
                className='input-box'
                type='text'
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        );
    }
);

export default InputBox;
