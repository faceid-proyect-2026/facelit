import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
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

  const pageBg = isDark ? '#050505' : '#F7FFF4';
  const cardBg = isDark ? '#111827' : '#FFFFFF';
  const softCardBg = isDark ? '#1A1F2E' : '#F4FAF2';
  const heading = isDark ? '#FFFFFF' : '#0D1F0A';
  const body = isDark ? '#AEB6C2' : '#3D5C3A';
  const muted = isDark ? '#8E96A3' : '#6B8068';
  const border = isDark ? 'rgba(101,179,97,0.18)' : 'rgba(101,179,97,0.25)';

  return (
    <LinearGradient
      colors={isDark ? ['#050505', '#071810', '#0D2B1A'] : ['#FFFFFF', '#F2FFF0', '#E8F8E4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.page, { backgroundColor: pageBg }]}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={[styles.header, { borderBottomColor: border }]}>
            <View style={styles.brand}>
              <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={[styles.brandName, { color: heading }]}>FaceLit</Text>
            </View>

            {isWide ? (
              <View style={styles.nav}>
                <Text style={[styles.navText, { color: muted }]}>{t('landing.navApp')}</Text>
                <Text style={[styles.navText, { color: muted }]}>{t('landing.navSecurity')}</Text>
                <Text style={[styles.navText, { color: muted }]}>{t('landing.navContact')}</Text>
              </View>
            ) : null}

            <View style={styles.headerActions}>
              <LanguageSelector />
              <ThemeToggle />
            </View>
          </View>

          <View style={[styles.hero, isWide && styles.heroWide]}>
            <View style={styles.heroCopy}>
              <View style={[styles.pill, { backgroundColor: theme.primaryFaint, borderColor: border }]}>
                <View style={[styles.pillDot, { backgroundColor: theme.primary }]} />
                <Text style={[styles.pillText, { color: theme.primary }]}>{t('landing.pill')}</Text>
              </View>

              <Text style={[styles.heroTitle, { color: heading }, isWide && styles.heroTitleWide]}>
                {t('landing.heroTitle')}{' '}
                <Text style={{ color: theme.primary }}>{t('landing.heroAccent')}</Text>
              </Text>

              <Text style={[styles.heroText, { color: body }]}>{t('landing.description')}</Text>

              <View style={styles.ctaRow}>
                <TouchableOpacity onPress={() => router.push('/auth/register')} activeOpacity={0.85} style={styles.primaryBtnWrap}>
                  <LinearGradient
                    colors={['#72C96D', '#65B361', '#4A9146']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryBtn}
                  >
                    <Text style={styles.primaryBtnText}>{t('landing.createAccount')}</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/auth/login')}
                  activeOpacity={0.85}
                  style={[styles.secondaryBtn, { borderColor: border, backgroundColor: isDark ? 'rgba(101,179,97,0.06)' : '#FFFFFF' }]}
                >
                  <Text style={[styles.secondaryBtnText, { color: theme.primary }]}>{t('landing.existingAccount')}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.metrics}>
                <Metric value="24/7" label={t('landing.metricSecure')} color={theme.primary} muted={muted} />
                <Metric value="AI" label={t('landing.metricAi')} color={theme.primary} muted={muted} />
                <Metric value="4" label={t('landing.metricLanguages')} color={theme.primary} muted={muted} />
              </View>
            </View>

            <View style={[styles.heroVisual, { backgroundColor: cardBg, borderColor: border }]}>
              {/* Image slot:
                  Add your file at assets/images/landing-hero.png.
                  Then replace the placeholder below with:
                  <Image source={require('@/assets/images/landing-hero.png')} style={styles.heroImage} resizeMode="cover" />
              */}
              <View style={[styles.mockPhone, { borderColor: border, backgroundColor: isDark ? '#0B0F14' : '#FFFFFF' }]}>
                <Image source={require('@/assets/images/logo.png')} style={styles.phoneLogo} resizeMode="contain" />
                <Text style={[styles.phoneTitle, { color: heading }]}>FaceLit ID</Text>
                <View style={[styles.scanBox, { borderColor: theme.primary }]}>
                  <View style={[styles.scanLine, { backgroundColor: theme.primary }]} />
                </View>
                <Text style={[styles.phoneText, { color: muted }]}>{t('landing.heroImageText')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: heading }]}>{t('landing.sectionTitle')}</Text>
            <Text style={[styles.sectionText, { color: body }]}>{t('landing.sectionText')}</Text>

            <View style={[styles.features, isWide && styles.featuresWide]}>
              <Feature number="01" title={t('landing.feat1Title')} text={t('landing.feat1Desc')} bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <Feature number="02" title={t('landing.feat2Title')} text={t('landing.feat2Desc')} bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
              <Feature number="03" title={t('landing.feat3Title')} text={t('landing.feat3Desc')} bg={softCardBg} border={border} heading={heading} body={body} accent={theme.primary} />
            </View>
          </View>

          <View style={[styles.split, isWide && styles.splitWide]}>
            <View style={styles.splitCopy}>
              <Text style={[styles.sectionTitle, { color: heading }]}>{t('landing.securityTitle')}</Text>
              <Text style={[styles.sectionText, { color: body }]}>{t('landing.securityText')}</Text>

              <View style={styles.checkList}>
                               <Text style={[styles.checkItem, { color: heading }]}>- {t('landing.securityPoint1')}</Text>
                <Text style={[styles.checkItem, { color: heading }]}>- {t('landing.securityPoint2')}</Text>
                <Text style={[styles.checkItem, { color: heading }]}>- {t('landing.securityPoint3')}</Text>
              </View>
            </View>

            <View style={[styles.imagePanel, { backgroundColor: cardBg, borderColor: border }]}>
              {/* Image slot:
                  Add your file at assets/images/security-panel.png.
                  Then replace this placeholder with:
                  <Image source={require('@/assets/images/security-panel.png')} style={styles.panelImage} resizeMode="cover" />
              */}
              <Text style={[styles.imageTitle, { color: heading }]}>{t('landing.panelImageTitle')}</Text>
              <Text style={[styles.imageText, { color: muted }]}>{t('landing.panelImageText')}</Text>
            </View>
          </View>

          <View style={[styles.contact, { backgroundColor: softCardBg, borderColor: border }]}>
            <View style={styles.contactCopy}>
              <Text style={[styles.contactTitle, { color: heading }]}>{t('landing.contactTitle')}</Text>
              <Text style={[styles.contactText, { color: body }]}>{t('landing.contactText')}</Text>
            </View>

            <View style={styles.contactList}>
              <Text style={[styles.contactItem, { color: heading }]}>{t('landing.contactEmail')}</Text>
              <Text style={[styles.contactItem, { color: heading }]}>{t('landing.contactPhone')}</Text>
              <Text style={[styles.contactItem, { color: heading }]}>{t('landing.contactLocation')}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: muted }]}>FaceLit (c) 2026</Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => router.push('/auth/privacy-notice')}>
                <Text style={[styles.footerLink, { color: theme.primary }]}>{t('landing.footerPrivacy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/auth/rights')}>
                <Text style={[styles.footerLink, { color: theme.primary }]}>{t('landing.footerRights')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Metric({ value, label, color, muted }: { value: string; label: string; color: string; muted: string }) {
  return (
    <View style={styles.metric}>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: muted }]}>{label}</Text>
    </View>
  );
}

function Feature({
  number,
  title,
  text,
  bg,
  border,
  heading,
  body,
  accent,
}: {
  number: string;
  title: string;
  text: string;
  bg: string;
  border: string;
  heading: string;
  body: string;
  accent: string;
}) {
  return (
    <View style={[styles.feature, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[styles.featureNumber, { color: accent }]}>{number}</Text>
      <Text style={[styles.featureTitle, { color: heading }]}>{title}</Text>
      <Text style={[styles.featureText, { color: body }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  safe: { flex: 1, backgroundColor: 'transparent' },
  scroll: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  header: {
    width: '100%',
    maxWidth: 1120,
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 46, height: 46 },
  brandName: { fontSize: 21, fontWeight: '900' },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  navText: { fontSize: 14, fontWeight: '700' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hero: {
    width: '100%',
    maxWidth: 1120,
    alignItems: 'center',
    gap: 34,
    paddingTop: 46,
    paddingBottom: 56,
  },
  heroWide: { flexDirection: 'row', alignItems: 'center', gap: 52 },
  heroCopy: { flex: 1, width: '100%' },
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 18,
  },
  pillDot: { width: 8, height: 8, borderRadius: 4 },
  pillText: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
    maxWidth: 700,
  },
  heroTitleWide: {
    fontSize: 54,
    lineHeight: 62,
  },
  heroText: {
    fontSize: 17,
    lineHeight: 27,
    marginTop: 18,
    maxWidth: 650,
  },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 30 },
  primaryBtnWrap: {
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 164,
    shadowColor: '#65B361',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtn: { paddingHorizontal: 22, paddingVertical: 15, alignItems: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  secondaryBtn: {
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 22,
    paddingVertical: 14,
    minWidth: 164,
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '900' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginTop: 34 },
  metric: { minWidth: 96 },
  metricValue: { fontSize: 25, fontWeight: '900' },
  metricLabel: { fontSize: 12, marginTop: 4, fontWeight: '700' },
  heroVisual: {
    flex: 1,
    width: '100%',
    minHeight: 420,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heroImage: {
    width: '100%',
    maxWidth: 430,
    aspectRatio: 0.78,
    borderRadius: 8,
  },
  mockPhone: {
    width: 285,
    maxWidth: '100%',
    aspectRatio: 0.6,
    borderRadius: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  phoneLogo: { width: 120, height: 72, marginBottom: 10 },
  phoneTitle: { fontSize: 20, fontWeight: '900', marginBottom: 22 },
  scanBox: {
    width: 150,
    height: 150,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: 'center',
    marginBottom: 22,
  },
  scanLine: { height: 2 },
  phoneText: { fontSize: 12, lineHeight: 18, textAlign: 'center' },
  section: { width: '100%', maxWidth: 1120, paddingVertical: 46 },
  sectionTitle: { fontSize: 30, lineHeight: 38, fontWeight: '900', maxWidth: 720 },
  sectionText: { fontSize: 16, lineHeight: 25, marginTop: 12, maxWidth: 760 },
  features: { gap: 16, marginTop: 28 },
  featuresWide: { flexDirection: 'row' },
  feature: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    padding: 22,
  },
  featureNumber: { fontSize: 13, fontWeight: '900', marginBottom: 14 },
  featureTitle: { fontSize: 18, fontWeight: '900', marginBottom: 10 },
  featureText: { fontSize: 14, lineHeight: 22 },
  split: { width: '100%', maxWidth: 1120, gap: 28, paddingVertical: 46 },
  splitWide: { flexDirection: 'row', alignItems: 'stretch' },
  splitCopy: { flex: 1, justifyContent: 'center' },
  checkList: { gap: 12, marginTop: 24 },
  checkItem: { fontSize: 15, fontWeight: '800' },
  imagePanel: {
    flex: 1,
    minHeight: 285,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imageTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  imageText: { fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 330 },
  panelImage: { width: '100%', height: '100%', borderRadius: 8 },
  contact: {
    width: '100%',
    maxWidth: 1120,
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    gap: 22,
    marginVertical: 40,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
  },
  contactCopy: { flex: 1 },
  contactTitle: { fontSize: 22, fontWeight: '900' },
  contactText: { fontSize: 14, lineHeight: 21, marginTop: 6 },
  contactList: { gap: 8, justifyContent: 'center' },
  contactItem: { fontSize: 14, fontWeight: '800' },
  footer: {
    width: '100%',
    maxWidth: 1120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 18,
  },
  footerText: { fontSize: 13, fontWeight: '700' },
  footerLinks: { flexDirection: 'row', gap: 16 },
  footerLink: { fontSize: 13, fontWeight: '800' },
});