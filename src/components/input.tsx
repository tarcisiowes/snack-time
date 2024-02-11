import {TextInput, TextInputProps} from "react-native";
import colors from "tailwindcss/colors";

export function Input({ ...rest}: TextInputProps) {
    return (
        <TextInput
            multiline
            textAlignVertical="top"
            placeholder=" CEP,
            Bairro,
            Rua,
            Número e complemento"
            placeholderTextColor={colors.slate[500]}
            className="h-32 px-4 py-3 bg-white border-2 border-amber-600 rounded-md text-amber-950 text-sm font-body"
            {...rest}
        />
    );
}