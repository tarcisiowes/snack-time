import {View, Text, FlatList, SectionList} from 'react-native';

import {Header} from "@/components/header";
import {CategoryButton} from "@/components/category-button";
import {CATEGORIES, MENU} from "@/utils/data/products";
import {useState} from "react";
import {Product} from "@/components/product";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

    function handleSelectCategory(category: string) {
        setSelectedCategory(category)
    }

  return (
    <View className="flex-1 pt-8">
        <Header title="Faça seu pedido" />

        <FlatList
            data={CATEGORIES}
            keyExtractor={item => item}
            renderItem={({item}) => <CategoryButton
                title={item}
                isSelected={item === selectedCategory}
                onPress={() => handleSelectCategory(item)}
            />}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="max-h-10 mt-5"
            contentContainerStyle={{paddingHorizontal: 20, gap: 12}}
        />

        <SectionList
            sections={MENU}
            keyExtractor={(item ) => item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => (
                <Product data={item} />)
            }
            className="flex-1 p-5"
            contentContainerStyle={{paddingBottom: 60}}
            />
    </View>
  );
}