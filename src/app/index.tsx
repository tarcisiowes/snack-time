import {useRef, useState} from "react";
import {View, Text, FlatList, SectionList} from 'react-native';
import {Link} from "expo-router";

import {Header} from "@/components/header";
import {CategoryButton} from "@/components/category-button";
import {Product} from "@/components/product";
import {useCartStore} from "@/data-store/cart-store";
import {CATEGORIES, MENU} from "@/utils/data/products";

export default function Home() {
    const cartStore = useCartStore()
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
    const sectionListRef = useRef<SectionList>(null)
    const cartQuantityItems = cartStore.products.reduce(
        (total, product) =>
            total + product.quantity, 0)

    function handleSelectCategory(category: string) {
        setSelectedCategory(category)

        setSelectedCategory((prevSelectedCategory) => {
            const sectionIndex = CATEGORIES.findIndex(
                (category) => category === prevSelectedCategory
            );

            if (sectionListRef.current) {
                sectionListRef.current.scrollToLocation({
                    sectionIndex,
                    itemIndex: 0,
                    animated: true,
                });
            }

            return category;
        });
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
                <Link href={`/product/${item.id}`} asChild>
                    <Product data={item} />
                </Link>
            )}
            renderSectionHeader={({section: {title}}) => (
                <Text className="text-xl text-slate-900 font-heading mt-8 mb-3">{title}</Text>
            )}
            className="flex-1 p-5"
            contentContainerStyle={{paddingBottom: 60}}
            />
    </View>
  );
}