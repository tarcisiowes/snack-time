import { Link, LinkProps } from 'expo-router';

type LinkButtonProps = LinkProps<string> & {
    title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
    return (
        <Link
            className={'text-slate-900 font-body text-base text-center'}
            {...rest}
        >
            {title}
        </Link>
    );
}
