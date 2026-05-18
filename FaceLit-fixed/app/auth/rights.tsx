import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function RightsScreen() {
  const back = () => router.back();

  const rightsContent = [
    {
      title: 'Derecho de Acceso',
      description: 'Tienes derecho a conocer, actualizar, rectificar y suprimir la información que nos hayas proporcionado, conforme a lo previsto en la Ley 1581 de 2012.'
    },
    {
      title: 'Derecho de Rectificación',
      description: 'Puedes rectificar los datos personales que sean inexactos o incompletos.'
    },
    {
      title: 'Derecho de Actualización',
      description: 'Tienes derecho a que tus datos sean actualizados cuando sea necesario.'
    },
    {
      title: 'Derecho de Supresión',
      description: 'En ciertos casos, puedes solicitar la supresión de tu información personal.'
    },
    {
      title: 'Derecho de Restricción',
      description: 'Puedes solicitar restricciones sobre el uso de tu información personal.'
    },
    {
      title: 'Derecho de Oposición',
      description: 'Tienes derecho a oponerte al procesamiento de tu información personal en ciertos casos.'
    },
    {
      title: 'Derecho a la Portabilidad de Datos',
      description: 'Puedes solicitar recibir tu información en un formato estructurado y de uso común.'
    }
  ];

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TouchableOpacity onPress={back} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Atrás</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Tus Derechos de Protección{' \n'}de Datos</Text>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {rightsContent.map((item, index) => (
              <View key={index} style={styles.rightItem}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <View style={styles.rightContent}>
                  <Text style={styles.rightTitle}>{item.title}</Text>
                  <Text style={styles.rightDescription}>{item.description}</Text>
                </View>
              </View>
            ))}

            <View style={styles.footer}>
              <Text style={styles.footerTitle}>Más información</Text>
              <Text style={styles.footerText}>
                Para más información sobre tus derechos de protección de datos, por favor revisa nuestras políticas de privacidad o ponte en contacto con nosotros.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </GradientBackground>
  );
}