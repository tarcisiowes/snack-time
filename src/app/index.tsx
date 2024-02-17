import { useRef, useState } from 'react';
import { View, Text, FlatList, SectionList } from 'react-native';
import { Link } from 'expo-router';

import { Header } from '@/components/header';
import { CategoryButton } from '@/components/category-button';
import { ProductCard } from '@/components/product-card';
import { useCartStore } from '@/data-store/cart-store';
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products';

export default function Home() {
    const cartStore = useCartStore();
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const sectionListRef = useRef<SectionList<ProductProps>>(null);
    const cartQuantityItems = cartStore.products.reduce(
        (total, product) => total + product.quantity!,
        0,
    );

    function handleSelectCategory(category: string) {
        setSelectedCategory(category);

        setSelectedCategory((prevSelectedCategory) => {
            const sectionIndex = CATEGORIES.findIndex(
                (category) => category === prevSelectedCategory,
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
            <Header
                title="Faça seu pedido"
                cartQuantityItems={cartQuantityItems}
            />

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <CategoryButton
                        title={item}
                        isSelected={item === selectedCategory}
                        onPress={() => handleSelectCategory(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="max-h-14 mt-5"
                contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            />

            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <ProductCard data={item} />
                    </Link>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-xl text-slate-900 font-heading mt-4 mb-3">
                        {title}
                    </Text>
                )}
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 60 }}
            />
        </View>
    );
}
