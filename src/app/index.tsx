import {View, Text, FlatList} from 'react-native';

import {Header} from "@/components/header";
import {CategoryButton} from "@/components/category-button";
import {CATEGORIES} from "@/utils/data/products";
import {useState} from "react";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  return (
    <View className="flex-1 pt-8">
        <Header title="Faça seu pedido" />

        <FlatList
            data={CATEGORIES}
            keyExtractor={item => item}
            renderItem={({item}) => <CategoryButton title={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="max-h-10 mt-5"
            contentContainerStyle={{paddingHorizontal: 20, gap: 12}}
        />
    </View>
  );
}