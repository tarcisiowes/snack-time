import {Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";

type ProductDataProps =  {
    title: string;
    description: string;
    price: number;
    thumbnail: ImageProps;
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps;
}

export function Product({data, ...rest}: ProductProps) {
  return (
      <TouchableOpacity className="w-full flex-row items-center pb-4" {...rest}>
        <Image source={data.thumbnail} className="w-35 h-35 rounded-md" />
            <View className="flex-1 ml-3" >
            <Text className="text-slate-900 font-subTitle text-base flex-1">{data.title}</Text>
            <Text className="text-slate-800 text-sm leading-5 mt-0.5">{data.description}</Text>
        </View>
      </TouchableOpacity>
  );
}