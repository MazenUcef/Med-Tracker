import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter();
    const navigation = useNavigation();


    
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace('/auth')
        }, 2000)
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                <Ionicons name='medical' size={100} color='white' />
                <Text style={styles.appName}>Med Track</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50'
    },
    iconContainer: {
        alignItems: 'center',
    },
    appName: {
        color: "white",
        marginTop: 20,
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 1,
    }
});

export default SplashScreen;
