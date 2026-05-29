import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function TokenSentScreen() {
  const { isDark } = useTheme();

  const text = isDark ? '#FFFFFF' : '#000000';
  const muted = isDark ? '#CAD6C8' : '#1E1E1E';
  const cardBg = isDark ? '#07120D' : '#FFFFFF';

  return (
    <LinearGradient
      colors={
        isDark
          ? ['#000000', '#06170F', '#0B2D17']
          : ['#F7FFF4', '#E5F7DF', '#1E4C28']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View
        style={[
          styles.backgroundArcTop,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.08)'
              : 'rgba(20,70,28,0.18)',
          },
        ]}
      />

      <View
        style={[
          styles.backgroundArcBottom,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.22)'
              : 'rgba(101,179,97,0.28)',
          },
        ]}
      />

      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: cardBg,
              shadowColor: isDark ? '#000000' : '#1C3A1D',
            },
          ]}
        >
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/token.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.body}>
            <Text style={[styles.title, { color: text }]}>
              Código enviado
            </Text>

            <Text style={[styles.subtitle, { color: muted }]}>
              Te enviamos un código de verificación a tu correo.
              Revísalo para continuar.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/auth/verify-identity')}
            >
              <LinearGradient
                colors={['#72C96D', '#65B361', '#4FA14B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  Entendido
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  backgroundArcTop: {
    position: 'absolute',
    width: 300,
    height: 420,
    right: -120,
    top: -90,
    borderRadius: 200,
  },

  backgroundArcBottom: {
    position: 'absolute',
    width: 420,
    height: 220,
    left: -120,
    bottom: -30,
    borderRadius: 180,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 26,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  header: {
    backgroundColor: '#65B361',
    paddingVertical: 32,
    alignItems: 'center',
  },

  image: {
    width: 95,
    height: 95,
  },

  body: {
    paddingHorizontal: 28,
    paddingVertical: 30,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 26,
  },

  button: {
    width: '70%',
    borderRadius: 16,
    overflow: 'hidden',
  },

  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});