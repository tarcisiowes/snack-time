import { TextInput, TextInputProps } from 'react-native';
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

type InputProps = TextInputProps & {
    placeholder: string;
    smallWidth?: boolean;
    mediumWidth?: boolean;
};

export function Input({
    placeholder,
    smallWidth = false,
    mediumWidth = false,
    ...rest
}: InputProps) {
    return (
        <TextInput
            placeholder={placeholder}
            className={clsx(
                `h-16 px-4 py-3 mb-5 bg-white border-2 border-orange-600 rounded-md text-amber-950 text-base font-body ${rest.className}`,
                smallWidth && 'w-1/4',
                mediumWidth && 'w-2/3 ml-4',
            )}
            autoCorrect={false}
            {...rest}
        />
    );
}
