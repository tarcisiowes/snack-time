import { TextInput, TextInputProps } from 'react-native';
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

type InputProps = TextInputProps & {
    placeholderText: string;
    smallWidth?: boolean;
    mediumWidth?: boolean;
};

export function Input({
    placeholderText,
    smallWidth = false,
    mediumWidth = false,
    ...rest
}: InputProps) {
    return (
        <TextInput
            placeholder={placeholderText}
            placeholderTextColor={colors.slate[500]}
            className={clsx(
                'h-16 px-4 py-3 bg-white border-2 border-orange-600 rounded-md text-amber-950 text-base font-body',
                smallWidth && 'w-1/4',
                mediumWidth && 'w-2/3 ml-4',
            )}
            {...rest}
        />
    );
}
