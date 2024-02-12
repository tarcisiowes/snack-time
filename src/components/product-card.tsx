import {
    Image,
    ImageProps,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { forwardRef } from 'react';

type ProductDataProps = {
    title: string;
    description: string;
    price: number;
    thumbnail: ImageProps;
    quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps;
};

export const ProductCard = forwardRef<TouchableOpacity, ProductProps>(
    ({ data, ...rest }, ref) => {
        return (
            <TouchableOpacity
                ref={ref}
                className="w-full flex-row items-center pb-4"
                {...rest}
            >
                <Image
                    source={data.thumbnail}
                    className="w-36 h-36 rounded-md"
                />
                <View className="flex-1 ml-3 ">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-slate-900 font-subTitle text-base">
                            {data.title}
                        </Text>
                        {data.quantity && (
                            <Text className="text-slate-900 font-subTitle text-base">
                                x {data.quantity}
                            </Text>
                        )}
                    </View>
                    <Text className="text-slate-800 text-md leading-5 mt-3">
                        {data.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },
);