import { Link, LinkProps } from 'expo-router';
import { Text, View } from 'react-native';
import clsx from 'clsx';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/button';

type LinkButtonProps = LinkProps<string> & {
    title: string;
    styleLess?: boolean;
};

export function LinkButton({
    title,
    styleLess = false,
    ...rest
}: LinkButtonProps) {
    return (
        <Link className={''} {...rest}>
            <View
                className={clsx(
                    'h-12 bg-green-800 rounded-md items-center justify-center flex-row w-96',
                    styleLess && 'bg-transparent',
                )}
            >
                {!styleLess && (
                    <Button.Icon>
                        <Feather
                            name="arrow-right-circle"
                            size={24}
                            color="white"
                        />
                    </Button.Icon>
                )}
                <Text
                    className={clsx(
                        'text-slate-100 font-body text-base text-center ml-2',
                        styleLess && 'text-slate-900',
                    )}
                >
                    {title}
                </Text>
            </View>
        </Link>
    );
}
