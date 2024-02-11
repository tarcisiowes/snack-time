import {TouchableOpacity, TouchableOpacityProps} from "react-native";

type ProductDataProps =  {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps;
}

export function Product({data, ...rest}: ProductProps) {
  return (
      <TouchableOpacity>

      </TouchableOpacity>
  );
}