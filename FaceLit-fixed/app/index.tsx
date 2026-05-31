// ─────────────────────────────────────────────
//  app/index.tsx — Landing Page FaceLit
//  Diseño basado en el Figma del proyecto
//  Tema claro/oscuro + i18n conservado en contacto/footer
// ─────────────────────────────────────────────
import {Image, Platform, ScrollView, StyleSheet, Text,TouchableOpacity, useWindowDimensions, View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function LandingScreen() {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 820;

  const cardBg     = isDark ? '#111827' : '#FFFFFF';
  const softCardBg = isDark ? '#1A1F2E' : '#F4FAF2';
  const heading    = isDark ? '#FFFFFF' : '#0D1F0A';
  const body       = isDark ? '#AEB6C2' : '#3D5C3A';
  const muted      = isDark ? '#8E96A3' : '#6B8068';
  const border     = isDark ? 'rgba(101,179,97,0.18)' : 'rgba(101,179,97,0.25)';

  return (
    <LinearGradient
      colors={isDark ? ['#050505', '#071810', '#0D2B1A'] : ['#FFFFFF', '#F2FFF0', '#E8F8E4']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={s.page}
    >
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* ── HEADER ── */}
          <View style={[s.header, { borderBottomColor: border }]}>
            <View style={s.brand}>
              <Image source={isDark ? require('@/assets/images/logo.png') : require('@/assets/images/logo2.png')} style={s.logo} resizeMode="contain" />

            </View>
            {isWide && (
              <View style={s.nav}>
                <Text style={[s.navText, { color: muted }]}>App</Text>
                <Text style={[s.navText, { color: muted }]}>Seguridad</Text>
                <Text style={[s.navText, { color: muted }]}>Contacto</Text>
              </View>
            )}
            <View style={s.headerActions}>
              <LanguageSelector />
              <ThemeToggle />
            </View>
          </View>

          {/* ── HERO ── */}
          <View style={[s.hero, isWide && s.heroWide]}>
            {/* Copia */}
            <View style={s.heroCopy}>
              <View style={[s.pill, { backgroundColor: theme.primaryFaint, borderColor: border }]}>
                <View style={[s.pillDot, { backgroundColor: theme.primary }]} />
                <Text style={[s.pillText, { color: theme.primary }]}>Sistema Inteligente</Text>
              </View>

              <Text style={[s.heroTitle, { color: heading }, isWide && s.heroTitleWide]}>
                Transformando el{'\n'}control de{' '}
                <Text style={{ color: theme.primary }}>asistencia{'\n'}académica</Text>
              </Text>

              {/* Línea decorativa */}
              <View style={[s.heroDivider, { backgroundColor: theme.primary }]} />

              <Text style={[s.heroText, { color: body }]}>
                FaceLit automatiza el registro de asistencia con reconocimiento facial e inteligencia biométrica, garantizando autenticidad, seguridad y eficiencia en cada ingreso.
              </Text>

              {/* Botones con íconos */}
              <View style={s.ctaRow}>
                <TouchableOpacity onPress={() => router.push('/auth/register')} activeOpacity={0.85} style={s.primaryBtnWrap}>
                  <LinearGradient colors={['#72C96D', '#65B361', '#4A9146']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.primaryBtn}>
                    <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
                    <Text style={s.primaryBtnText}>Crear cuenta</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/auth/login')} activeOpacity={0.85}
                  style={[s.secondaryBtn, { borderColor: theme.primary, backgroundColor: isDark ? 'rgba(101,179,97,0.06)' : 'rgba(101,179,97,0.04)' }]}>
                  <Ionicons name="person-outline" size={18} color={theme.primary} />
                  <Text style={[s.secondaryBtnText, { color: theme.primary }]}>Ya tengo cuenta</Text>
                </TouchableOpacity>
              </View>

              {/* Métricas */}
              <View style={s.metrics}>
                <Metric icon="time-outline"         value="24/7"  label="Disponibilidad inteligente" color={theme.primary} muted={muted} />
                <Metric icon="scan-outline"         value="IA"    label="Reconocimiento facial"       color={theme.primary} muted={muted} />
                <Metric icon="checkmark-circle-outline" value="100%" label="Control automatizado"    color={theme.primary} muted={muted} />
                <Metric icon="" value=""    label=""          color={theme.primary} muted={muted} />
              </View>
            </View>

            {/* Mockup teléfono */}
            <View style={[s.heroVisual, { backgroundColor: isDark ? 'rgba(101,179,97,0.04)' : 'rgba(101,179,97,0.06)', borderColor: border }]}>
              <View style={[s.mockPhone, { borderColor: theme.primary, backgroundColor: isDark ? '#080F0B' : '#FFFFFF' }]}>
                {/* Barra superior del teléfono */}
                <View style={s.phoneBrand}>
                                <Image source={isDark ? require('@/assets/images/logo.png') : require('@/assets/images/logo2.png')} style={s.logo} resizeMode="contain" />
                </View>

                <Text style={[s.phoneTitle, { color: heading }]}></Text>

                {/* Área de escaneo facial */}
                <View style={[s.faceArea, { borderColor: theme.primary }]}>
                  {/* Esquinas del scanner */}
                  <View style={[s.cornerTL, { borderColor: theme.primary }]} />
                  <View style={[s.cornerTR, { borderColor: theme.primary }]} />
                  <View style={[s.cornerBL, { borderColor: theme.primary }]} />
                  <View style={[s.cornerBR, { borderColor: theme.primary }]} />
                  {/* Ícono de cara */}
                  <Ionicons name="scan-circle-outline" size={90} color={theme.primary} style={{ opacity: 0.85 }} />
                  {/* Línea de escaneo */}
                  <View style={[s.scanLine, { backgroundColor: theme.primary }]} />
                </View>

                {/* Info inferior */}
                <View style={[s.phoneInfo, { borderTopColor: border }]}>
                  <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
                  <Text style={[s.phoneInfoText, { color: muted }]}>
                    Identificación biométrica en tiempo real para el entorno formativo del SENA
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── ¿POR QUÉ NACE FACELIT? ── */}
          <View style={[s.section, { borderTopColor: border, borderTopWidth: 1 }]}>
            <Text style={[s.sectionTitle, { color: heading }]}>¿Por qué nace FaceLit?</Text>
            <Text style={[s.sectionText, { color: body }]}>
              En muchos entornos educativos, el control manual de asistencia continúa generando problemas frecuentes. Estudios evidencian que los métodos tradicionales consumen entre 5 y 10 minutos por jornada, afectando directamente el tiempo efectivo de aprendizaje.
            </Text>
            <View style={[s.features, isWide && s.featuresWide]}>
              <ProblemCard icon="time-outline"   number="01" title="Pérdida de tiempo"         text="Los registros manuales al iniciar clases consumen minutos valiosos de cada jornada académica."                                              bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="alert-circle-outline" number="02" title="Errores e inconsistencias" text="Errores humanos en registros y dificultad para generar reportes y seguimiento disciplinario confiable."                              bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="person-remove-outline" number="03" title="Suplantación de identidad" text="Los métodos tradicionales no pueden verificar la identidad del aprendiz, permitiendo fraudes en la asistencia."                    bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
            </View>
          </View>

          {/* ── ¿QUÉ OFRECE FACELIT? ── */}
          <View style={s.section}>
            <Text style={[s.sectionTitle, { color: heading }]}>¿Qué ofrece FaceLit?</Text>
            <Text style={[s.sectionText, { color: body }]}>
              Una plataforma moderna, intuitiva y confiable que permite a instructores, administradores y aprendices vivir una experiencia ágil y segura dentro del entorno formativo del SENA.
            </Text>
            <View style={[s.features, isWide && s.featuresWide]}>
              <ProblemCard icon="scan-outline"            number="01" title="Registro inteligente y automatizado" text="El sistema identifica automáticamente a los aprendices mediante reconocimiento facial, registrando ingresos y salidas de forma inmediata."    bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="finger-print-outline"    number="02" title="Seguridad biométrica"               text="Cada asistencia queda vinculada al rostro único del usuario, evitando fraudes y suplantaciones de identidad de forma definitiva."              bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="speedometer-outline"     number="03" title="Optimización del tiempo académico"  text="Reduce significativamente el tiempo utilizado en listas manuales y procesos tradicionales de control de asistencia."                         bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="bar-chart-outline"       number="04" title="Monitoreo y reportes en tiempo real" text="Genera reportes automáticos de asistencia, inasistencias y comportamiento disciplinario para facilitar el seguimiento académico."         bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <ProblemCard icon="phone-portrait-outline"  number="05" title="Plataforma moderna y accesible"     text="Diseñada con interfaces intuitivas para dispositivos móviles, tablets y entornos web, garantizando facilidad de uso para todos los actores." bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
            </View>
          </View>

          {/* ── OBJETIVO + TECNOLOGÍAS ── */}
          <View style={[s.split, isWide && s.splitWide]}>
            <View style={s.splitCopy}>
              <Text style={[s.sectionTitle, { color: heading }]}>Objetivo del Proyecto</Text>
              <Text style={[s.sectionText, { color: body }]}>
                Desarrollar un sistema inteligente de registro y control de asistencia académica mediante reconocimiento facial, capaz de optimizar la gestión institucional, reducir inasistencias injustificadas y mejorar la eficiencia del proceso formativo en el SENA.
              </Text>
              <View style={s.checkList}>
                {[
                  'Registro de aprendices, instructores y administradores',
                  'Captura y almacenamiento de datos biométricos faciales',
                  'Detección e identificación en tiempo real',
                  'Registro automático de entradas y salidas',
                  'Validación de ambientes y horarios',
                  'Generación automática de reportes',
                  'Notificaciones inteligentes',
                  'Bitácoras y trazabilidad del sistema',
                  'Integración con dispositivos IoT',
                ].map((item) => (
                  <View key={item} style={s.checkRow}>
                    <Ionicons name="checkmark-circle" size={16} color={theme.primary} />
                    <Text style={[s.checkItem, { color: heading }]}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[s.techPanel, { backgroundColor: cardBg, borderColor: border }]}>
              <Text style={[s.techTitle, { color: heading }]}>Tecnologías Utilizadas</Text>
              <Text style={[s.techSubtitle, { color: muted }]}>
                FaceLit integra tecnologías modernas enfocadas en rendimiento, seguridad y escalabilidad.
              </Text>
              <View style={s.techGrid}>
                {[
                  { icon: 'scan-outline',          label: 'Reconocimiento Facial IA' },
                  { icon: 'color-palette-outline', label: 'Diseño UI/UX Figma' },
                  { icon: 'phone-portrait-outline',label: 'Web y Móvil' },
                  { icon: 'layers-outline',        label: 'Arquitectura escalable' },
                  { icon: 'server-outline',        label: 'Base de datos académica' },
                  { icon: 'document-text-outline', label: 'Automatización reportes' },
                  { icon: 'lock-closed-outline',   label: 'Autenticación biométrica' },
                ].map(({ icon, label }) => (
                  <View key={label} style={[s.techBadge, { backgroundColor: isDark ? 'rgba(101,179,97,0.10)' : 'rgba(101,179,97,0.08)', borderColor: border }]}>
                    <Ionicons name={icon as any} size={16} color={theme.primary} />
                    <Text style={[s.techBadgeText, { color: heading }]}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* ── INNOVACIÓN BANNER ── */}
          <View style={[s.innovationBanner, { backgroundColor: softCardBg, borderColor: border }]}>
            <Text style={[s.innovationTitle, { color: heading }]}>Innovación para el futuro educativo</Text>
            <Text style={[s.innovationText, { color: body }]}>
              FaceLit no solo automatiza la asistencia. Revoluciona la experiencia académica mediante tecnología inteligente, fortaleciendo la seguridad, la puntualidad y la eficiencia dentro del entorno educativo del SENA.
            </Text>
            <View style={s.innovationPills}>
              {[
                { icon: 'trending-up-outline', label: 'Más precisión' },
                { icon: 'shield-outline',      label: 'Más seguridad' },
                { icon: 'book-outline',        label: 'Más tiempo para aprender' },
              ].map(({ icon, label }) => (
                <View key={label} style={[s.innovationPill, { backgroundColor: theme.primaryFaint, borderColor: border }]}>
                  <Ionicons name={icon as any} size={16} color={theme.primary} />
                  <Text style={[s.innovationPillText, { color: theme.primary }]}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── CONTACTO ── */}
          <View style={[s.contact, { backgroundColor: softCardBg, borderColor: border }]}>
            <View style={s.contactCopy}>
              <Text style={[s.contactTitle, { color: heading }]}>{t('landing.contactTitle')}</Text>
              <Text style={[s.contactText, { color: body }]}>{t('landing.contactText')}</Text>
            </View>
            <View style={s.contactList}>
              <View style={s.contactRow}>
                <Ionicons name="mail-outline" size={15} color={theme.primary} />
                <Text style={[s.contactItem, { color: heading }]}>{t('landing.contactEmail')}</Text>
              </View>
              <View style={s.contactRow}>
                <Ionicons name="call-outline" size={15} color={theme.primary} />
                <Text style={[s.contactItem, { color: heading }]}>{t('landing.contactPhone')}</Text>
              </View>
              <View style={s.contactRow}>
                <Ionicons name="location-outline" size={15} color={theme.primary} />
                <Text style={[s.contactItem, { color: heading }]}>{t('landing.contactLocation')}</Text>
              </View>
            </View>
          </View>

          {/* ── FOOTER ── */}
          <View style={s.footer}>
            <Text style={[s.footerText, { color: muted }]}>FaceLit © 2026</Text>
            <View style={s.footerLinks}>
              <TouchableOpacity onPress={() => router.push('/auth/privacy-notice')}>
                <Text style={[s.footerLink, { color: theme.primary }]}>{t('landing.footerPrivacy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/auth/rights')}>
                <Text style={[s.footerLink, { color: theme.primary }]}>{t('landing.footerRights')}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ── Sub-componentes ───────────────────────────

function Metric({ icon, value, label, color, muted }: { icon: any; value: string; label: string; color: string; muted: string }) {
  return (
    <View style={s.metric}>
      <Ionicons name={icon} size={18} color={color} style={{ marginBottom: 4 }} />
      <Text style={[s.metricValue, { color }]}>{value}</Text>
      <Text style={[s.metricLabel, { color: muted }]}>{label}</Text>
    </View>
  );
}

function ProblemCard({ icon, number, title, text, bg, border, heading, body, accent }: {
  icon: any; number: string; title: string; text: string;
  bg: string; border: string; heading: string; body: string; accent: string;
}) {
  return (
    <View style={[s.feature, { backgroundColor: bg, borderColor: border }]}>
      <View style={[s.featureIconWrap, { backgroundColor: accent + '18' }]}>
        <Ionicons name={icon} size={22} color={accent} />
      </View>
      <Text style={[s.featureNumber, { color: accent }]}>{number}</Text>
      <Text style={[s.featureTitle, { color: heading }]}>{title}</Text>
      <Text style={[s.featureText, { color: body }]}>{text}</Text>
    </View>
  );
}

// ── Estilos ───────────────────────────────────
const s = StyleSheet.create({
  page:  { flex: 1 },
  safe:  { flex: 1, backgroundColor: 'transparent' },
  scroll: { width: '100%', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 34 },

  header: { width: '100%', maxWidth: 1120, minHeight: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14, borderBottomWidth: 1, paddingVertical: 14 },
  brand:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo:   { width: 140, height: 48 },
  brandName: { fontSize: 22, fontWeight: '900' },
  nav:    { flexDirection: 'row', alignItems: 'center', gap: 24 },
  navText: { fontSize: 14, fontWeight: '700' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  hero:     { width: '100%', maxWidth: 1120, alignItems: 'center', gap: 34, paddingTop: 46, paddingBottom: 56 },
  heroWide: { flexDirection: 'row', alignItems: 'center', gap: 52 },
  heroCopy: { flex: 1, width: '100%' },

  pill:     { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 18 },
  pillDot:  { width: 8, height: 8, borderRadius: 4 },
  pillText: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },

  heroTitle:     { fontSize: 38, lineHeight: 46, fontWeight: '900', maxWidth: 700 },
  heroTitleWide: { fontSize: 56, lineHeight: 66 },
  heroDivider:   { width: 56, height: 4, borderRadius: 2, marginVertical: 20 },
  heroText:      { fontSize: 16, lineHeight: 26, maxWidth: 620 },

  ctaRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 30 },
  primaryBtnWrap: { borderRadius: 10, overflow: 'hidden', minWidth: 170 },
  primaryBtn:     { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 22, paddingVertical: 15, justifyContent: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  secondaryBtn:   { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 22, paddingVertical: 14, minWidth: 170, justifyContent: 'center' },
  secondaryBtnText: { fontSize: 15, fontWeight: '900' },

  metrics:      { flexDirection: 'row', flexWrap: 'wrap', gap: 28, marginTop: 36 },
  metric:       { minWidth: 90, alignItems: 'center' },
  metricValue:  { fontSize: 22, fontWeight: '900' },
  metricLabel:  { fontSize: 11, marginTop: 2, fontWeight: '700', textAlign: 'center' },

  heroVisual:   { flex: 1, width: '100%', minHeight: 460, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  mockPhone:    { width: 280, maxWidth: '100%', borderRadius: 36, borderWidth: 2, alignItems: 'center', padding: 20, paddingTop: 24, paddingBottom: 20 },
  phoneBrand:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  phoneLogoSmall: { width: 36, height: 36 },
  phoneAppName: { fontSize: 17, fontWeight: '900' },
  phoneTitle:   { fontSize: 18, fontWeight: '900', marginBottom: 18 },

  faceArea:   { width: 190, height: 190, borderRadius: 16, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative' },
  cornerTL:   { position: 'absolute', top: -2, left: -2, width: 22, height: 22, borderTopWidth: 3, borderLeftWidth: 3, borderRadius: 4 },
  cornerTR:   { position: 'absolute', top: -2, right: -2, width: 22, height: 22, borderTopWidth: 3, borderRightWidth: 3, borderRadius: 4 },
  cornerBL:   { position: 'absolute', bottom: -2, left: -2, width: 22, height: 22, borderBottomWidth: 3, borderLeftWidth: 3, borderRadius: 4 },
  cornerBR:   { position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderBottomWidth: 3, borderRightWidth: 3, borderRadius: 4 },
  scanLine:   { position: 'absolute', height: 2, width: '80%', borderRadius: 1, opacity: 0.8 },

  phoneInfo:     { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderTopWidth: 1, paddingTop: 14, width: '100%' },
  phoneInfoText: { flex: 1, fontSize: 11, lineHeight: 16, textAlign: 'center' },

  section:      { width: '100%', maxWidth: 1120, paddingVertical: 46 },
  sectionTitle: { fontSize: 30, lineHeight: 38, fontWeight: '900', maxWidth: 720, marginBottom: 10 },
  sectionText:  { fontSize: 16, lineHeight: 25, maxWidth: 760 },

  features:     { gap: 16, marginTop: 28 },
  featuresWide: { flexDirection: 'row', flexWrap: 'wrap' },
  feature:      { flex: 1, minWidth: 220, borderRadius: 12, borderWidth: 1, padding: 22 },
  featureIconWrap: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  featureNumber:{ fontSize: 12, fontWeight: '900', marginBottom: 6 },
  featureTitle: { fontSize: 16, fontWeight: '900', marginBottom: 8 },
  featureText:  { fontSize: 13, lineHeight: 21 },

  split:      { width: '100%', maxWidth: 1120, gap: 28, paddingVertical: 46 },
  splitWide:  { flexDirection: 'row', alignItems: 'stretch' },
  splitCopy:  { flex: 1, justifyContent: 'center' },
  checkList:  { gap: 10, marginTop: 20 },
  checkRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkItem:  { flex: 1, fontSize: 14, fontWeight: '600', lineHeight: 22 },

  techPanel:    { flex: 1, minHeight: 285, borderRadius: 12, borderWidth: 1, padding: 24 },
  techTitle:    { fontSize: 20, fontWeight: '900', marginBottom: 8 },
  techSubtitle: { fontSize: 13, lineHeight: 20, marginBottom: 18 },
  techGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  techBadge:    { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, width: '48%' },
  techBadgeText:{ fontSize: 12, fontWeight: '700' },

  innovationBanner:  { width: '100%', maxWidth: 1120, borderRadius: 12, borderWidth: 1, padding: 36, marginBottom: 12, alignItems: 'center' },
  innovationTitle:   { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  innovationText:    { fontSize: 15, lineHeight: 24, textAlign: 'center', maxWidth: 720, marginBottom: 28 },
  innovationPills:   { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  innovationPill:    { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 999, borderWidth: 1, paddingHorizontal: 18, paddingVertical: 10 },
  innovationPillText:{ fontSize: 14, fontWeight: '900' },

  contact:      { width: '100%', maxWidth: 1120, borderRadius: 12, borderWidth: 1, padding: 24, gap: 22, marginVertical: 40, flexDirection: Platform.OS === 'web' ? 'row' : 'column', justifyContent: 'space-between' },
  contactCopy:  { flex: 1 },
  contactTitle: { fontSize: 22, fontWeight: '900' },
  contactText:  { fontSize: 14, lineHeight: 21, marginTop: 6 },
  contactList:  { gap: 10, justifyContent: 'center' },
  contactRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactItem:  { fontSize: 14, fontWeight: '700' },

  footer:      { width: '100%', maxWidth: 1120, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingVertical: 18 },
  footerText:  { fontSize: 13, fontWeight: '700' },
  footerLinks: { flexDirection: 'row', gap: 16 },
  footerLink:  { fontSize: 13, fontWeight: '800' },
});