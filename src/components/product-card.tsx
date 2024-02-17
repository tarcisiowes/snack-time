import {
    Image,
    ImageProps,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { forwardRef } from 'react';

import { QuantityField } from '@/components/quantity-field';
import { formatCurrency } from '@/utils/string-helper/format-currency';

type ProductDataProps = {
    title: string;
    description: string;
    price: number;
    thumbnail: ImageProps;
    quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps;
    handleRemoveProduct?: (product: ProductDataProps) => void;
    handleAddProduct?: (product: ProductDataProps) => void;
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
                        <Text className="text-slate-900 font-subTitle text-base">
                            {formatCurrency(data.price)}
                        </Text>
                    </View>
                    <Text className="text-slate-800 text-md leading-5 mt-3">
                        {data.description}
                    </Text>
                    {data.quantity && (
                        <QuantityField
                            quantity={data.quantity}
                            handleQuantityDecrease={rest.handleRemoveProduct}
                            handleQuantityIncrease={rest.handleAddProduct}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    },
);
