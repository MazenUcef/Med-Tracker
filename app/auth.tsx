import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';


const { width } = Dimensions.get('window')


const AuthScreen = () => {
    const [hasBiometrics, setHasBiomtrics] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigation()


    const checkBiometrics = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setHasBiomtrics(hasHardware && isEnrolled);
    }


    useEffect(() => {
        checkBiometrics()
        navigate.setOptions({ headerShown: false })
    }, [])


    const authenticate = async () => {
        try {
            setIsAuthenticating(true)
            setError(null)
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

            // handle SupportedTypes

            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: hasHardware && isEnrolled ? 'Use face ID/TouchID' : 'Enter your PIN to access your medication',
                fallbackLabel: 'Use Pin',
                cancelLabel: 'Cancel',
                disableDeviceFallback: false
            })

            if (auth.success) {
                router.replace('/')
            } else {
                setError('Authentication failed: Please try again')
            }
        } catch (error) {

        }
    }
    return (
        <LinearGradient style={styles.container} colors={['#4CAF50', '#2E7D32']}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name='medical' size={80} color={'white'} />
                </View>
                <Text style={styles.title}>
                    Med track
                </Text>
                <Text style={styles.subtitle}>
                    Your Personal Medication Reminder
                </Text>
                <View style={styles.card}>
                    <Text style={styles.welcomeText}>
                        Welcome Back!
                    </Text>
                    <Text style={styles.instructionText}>
                        {hasBiometrics ? "Use face ID/TouchID Or PIN to access your medications" : "Enter your PIN to access your medication"}
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, isAuthenticating && styles.buttonDisabled]}
                        onPress={authenticate}
                        disabled={isAuthenticating}
                    >
                        <Ionicons
                            name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
                            size={24}
                            color={'white'}
                            style={styles.buttonIcon}
                        />
                        <Text
                            style={styles.buttonText}
                        >
                            {isAuthenticating ? "Verifying..." : hasBiometrics ? 'Authenticate' : 'Enter PIN'}
                        </Text>
                    </TouchableOpacity>
                    {error &&
                        <View style={styles.errorContainer}>
                            <Ionicons name='alert-circle' size={20} color={'#f44336'} />
                            <Text>{error}</Text>
                        </View>}
                </View>
            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 40,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: width - 40,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10
    },
    instructionText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonDisabled: {
        opacity: 0.7
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600'
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ffebee",
        borderRadius: 8,
    },
    errorText: {
        color: "f44336",
        fontSize: 14,
        marginLeft: 8,
        fontWeight: "600",
    },
    buttonIcon: {
        marginRight: 10
    }
})

export default AuthScreen