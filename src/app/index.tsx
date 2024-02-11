import {View, Text, FlatList, SectionList} from 'react-native';

import {Header} from "@/components/header";
import {CategoryButton} from "@/components/category-button";
import {CATEGORIES, MENU} from "@/utils/data/products";
import {useRef, useState} from "react";
import {Product} from "@/components/product";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
    const sectionListRef = useRef<SectionList>(null)

    function handleSelectCategory(category: string) {
        setSelectedCategory(category)

        const sectionIndex = CATEGORIES.findIndex(
            (category) => category === selectedCategory
        )

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                animated: true,
            })
        }
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
            ref={sectionListRef}
            sections={MENU}
            keyExtractor={(item ) => item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => (
                <Product data={item} />)
            }
            renderSectionHeader={({section: {title}}) => (
                <Text className="text-xl text-slate-900 font-heading mt-8 mb-3">{title}</Text>
            )}
            className="flex-1 p-5"
            contentContainerStyle={{paddingBottom: 60}}
            />
    </View>
  );
}