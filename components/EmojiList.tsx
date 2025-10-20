import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from "react-native";


type Props = {
    onSelect: (image: ImageSourcePropType) => void;
    onCloseModal: () => void;
}

export default function EmojiList({onSelect, onCloseModal}: Props) {
    const [emoji] = useState<ImageSourcePropType[]>([
        require("../assets/images/emoji1.png"),
        require("../assets/images/emoji2.png"),
        require("../assets/images/emoji3.png"),
        require("../assets/images/emoji4.png"),
        require("../assets/images/emoji5.png"),
        require("../assets/images/emoji6.png"),
    ]);

    {/* 
        - The <FlatList> component above renders all the emoji images using the Image component, wrapped by a <Pressable>. 
        Later, we will improve it so the user can tap an emoji on the screen to make it appear as a sticker on the image.
        - It also takes an array of items provided by the emoji array variable as the value of the data prop. The renderItem prop
        takes the item from the data and returns the item in the list. Finally, we added Image and the <Pressable> components to 
        display this item. 
        - The horizontal... prop renders the list horizontally instead of vertically. The showsHorizontalScrollIndicator uses React Native
        Platform module to check the value and display the horizontal scroll bar on web. 
        
    */}

    return (
        
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS == 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index}) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                        <Image source={item} key={index} style={styles.image}/>

                    </Pressable>
            )}
        >

        </FlatList>
    )
}


const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
