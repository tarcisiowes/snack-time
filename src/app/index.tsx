import{View, Text} from 'react-native';
import {Header} from "@/components/header";
import {CategoryButton} from "@/components/category-button";

export default function Home() {
  return (
    <View className="flex-1 pt-8">
        <Header title="Faça seu pedido" />

        <View className="flex-row gap-4 mx-1.5 mt-2">
            <CategoryButton title={'Lanche do dia'} isSelected/>
            <CategoryButton title={'Lanche do dia'} />
            <CategoryButton title={'Lanche do dia'} />
            <CategoryButton title={'Lanche do dia'} />
        </View>
    </View>
  );
}