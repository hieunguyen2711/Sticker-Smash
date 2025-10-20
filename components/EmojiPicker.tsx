import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';


type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;



// The EmojiPicker invokes the onClose prop when the user presses the close <Pressable>
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
    return (
        <View>
            {/* The Modal component displays a title and a close button 
                Its visible props takes the value of isVisible and controls whether the modal is open or closed
                Its transparent prop is a boolean value, which determines whether the modal fills the entire view. 
                Its animationType prop determines how it enters and leaves the screen. In this case, it is sliding from the bottom of the screen
            */ }
            <Modal animationType='slide' transparent={true} visible={isVisible}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Choose a Sticker</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name='close' color='#fff' size={22}/>
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 8,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
});