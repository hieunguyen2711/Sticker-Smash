import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'OOps! Not Found' }}/>
            <View style={styles.container}>
                <Link href={{pathname: "/"}} style={styles.button}>
                    Go back to Home Screen!
                </Link>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignContent: 'center',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff', 
    },
})