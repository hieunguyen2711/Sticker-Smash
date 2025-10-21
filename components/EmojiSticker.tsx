import { ImageSourcePropType, View } from "react-native";
// the {useAnimatedStyle, useSharedValue, withSpring} hooks will recognize the tap on the sticker
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({imageSize, stickerSource}: Props) {
    // the reference to scaleImage will take the value of imageSize as its initial value. 
    // It helps to mutate data and runs animation based on the current value. 
    // We can also access and modify the shared value using the .value property
    
    
    const scaleImage = useSharedValue(imageSize);

    // We will create a doubleTap Object to scale the initial value and use Gesture.tap() to animate the transition while scaling the sticker image.
    // To determine the number of taps required, we'll add numberOfTaps()
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        })
    
        //use the useAnimatedStyle hook to create a style object.
        // This will help us to update the styles using shared values when the animations happens
        // We will also scale the size of the image by manipulating the width and height properties.
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
        
    });
    return (
        <View style={{ position: "relative", width: imageSize, height: imageSize }}>
            {/* the gesture prop takes the value of the doubleTap to trigger a gesture when a user double-taps the sticker image */}
            <GestureDetector gesture={doubleTap}>

                <Animated.Image
                source={stickerSource}
                resizeMode="contain"
                style={[imageStyle, {width: imageSize, height: imageSize}]}
                />

            </GestureDetector>
        </View>
    )
}