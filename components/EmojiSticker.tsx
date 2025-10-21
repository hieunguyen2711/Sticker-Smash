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

    // The translateion values defined will move the sticker around the screen. 
    // Since the sticker moves along both axes , we need to track the X and Y values
    // Set the value inside the useSharedValue hook to be 0, representing initial position and a starting point. 
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

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

    const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

    const drag = Gesture.Pan().onChange(event => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  
    return (
        <GestureDetector gesture={drag}>

            <Animated.View style={[containerStyle, {top: -350}]}>
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
        </Animated.View>

        </GestureDetector>
        
        
    )
}