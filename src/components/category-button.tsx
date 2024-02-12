import { Text, Pressable, PressableProps } from 'react-native';
import clsx from 'clsx';

type CategoryButtonProps = PressableProps & {
    title: string;
    isSelected?: boolean;
};

export function CategoryButton({
    title,
    isSelected,
    ...rest
}: CategoryButtonProps) {
    return (
        <Pressable
            className={clsx(
                'bg-transparent px-4 h-12 justify-center rounded-md border-b-transparent',
                isSelected && 'border-b-2 border-slate-950 bg-orange-600',
            )}
            {...rest}
        >
            <Text
                className={clsx(
                    'text-amber-950 font-subTitle text-sm',
                    isSelected && 'text-amber-50 text-base',
                )}
            >
                {title}
            </Text>
        </Pressable>
    );
}
