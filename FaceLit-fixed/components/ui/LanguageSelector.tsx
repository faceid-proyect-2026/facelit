// ─────────────────────────────────────────────
//  components/ui/LanguageSelector.tsx
//  Selector de idioma — ícono globo + inicial
//  Web: DOM nativo. Móvil: Modal RN.
// ─────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import {
  Modal, Platform, Pressable, StyleSheet,
  Text, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Language, LANGUAGE_LABELS, useLanguage } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';

const LANGUAGES: Language[] = ['es', 'en', 'de', 'fr'];
const LANG_NAMES: Record<Language, string> = {
  es: 'Español', en: 'English', de: 'Deutsch', fr: 'Français',
};

interface LanguageSelectorProps { style?: ViewStyle; }

// ── Web ───────────────────────────────────────
function LanguageSelectorWeb({ style }: LanguageSelectorProps) {
  const { language, changeLanguage } = useLanguage();
  const { isDark, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    if (!open || !triggerRef.current || !dropdownRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    dropdownRef.current.style.top   = `${rect.bottom + 6}px`;
    dropdownRef.current.style.right = `${window.innerWidth - rect.right}px`;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: any) => {
      if (!triggerRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const bg      = isDark ? '#0D1F14' : '#FFFFFF';
  const border  = isDark ? 'rgba(101,179,97,0.4)' : '#CCCCCC';
  const textCol = isDark ? '#FFFFFF' : '#111111';
  const hoverBg = isDark ? 'rgba(101,179,97,0.15)' : 'rgba(101,179,97,0.10)';
  const activeB = isDark ? 'rgba(101,179,97,0.20)' : 'rgba(101,179,97,0.13)';

  // Estilos sin fontFamily para que tome la fuente del sistema (igual que RN)
  const base: any = { margin: 0, padding: 0, boxSizing: 'border-box' };

  return (
    // @ts-ignore
    <div style={{ position: 'relative', ...base }}>
      {/* @ts-ignore */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(v => !v)}
        style={{
          ...base,
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6,
          background: isDark ? 'rgba(255,255,255,0.05)' : '#F6F6F6',
          border: '1.5px solid #65B361',
          borderRadius: 20, height: 40,
          padding: '0 14px',
          cursor: 'pointer',
          fontWeight: 700, fontSize: 13, color: '#65B361',
        }}
      >
        {/* Globo SVG */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="#65B361" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span style={{ fontWeight: 700, fontSize: 13, color: '#65B361' }}>
          {LANGUAGE_LABELS[language]}
        </span>
        <span style={{ fontSize: 9, color: '#65B361', marginTop: 1 }}>▾</span>
      </button>

      {open && (
        // @ts-ignore
        <div
          ref={dropdownRef}
          style={{
            ...base,
            position: 'fixed',
            background: bg,
            border: `1px solid ${border}`,
            borderRadius: 12,
            minWidth: 160,
            zIndex: 99999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
            overflow: 'hidden',
          }}
        >
          {LANGUAGES.map((lang) => {
            const isActive = language === lang;
            return (
              // @ts-ignore
              <button
                key={lang}
                onClick={() => { changeLanguage(lang); setOpen(false); }}
                onMouseEnter={(e: any) => { if (!isActive) e.currentTarget.style.background = hoverBg; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.background = isActive ? activeB : 'transparent'; }}
                style={{
                  ...base,
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,
                  width: '100%', padding: '11px 16px',
                  cursor: 'pointer', border: 'none',
                  background: isActive ? activeB : 'transparent',
                }}
              >
                {/* Círculo con inicial */}
                <span style={{
                  width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isActive ? '#65B361' : (isDark ? 'rgba(101,179,97,0.18)' : 'rgba(101,179,97,0.14)'),
                  fontSize: 10, fontWeight: 800,
                  color: isActive ? '#FFFFFF' : '#65B361',
                }}>
                  {lang.toUpperCase()}
                </span>
                {/* Nombre del idioma — sin fontFamily para respetar la fuente del sistema */}
                <span style={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#65B361' : textCol,
                }}>
                  {LANG_NAMES[lang]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Móvil ─────────────────────────────────────
function LanguageSelectorMobile({ style }: LanguageSelectorProps) {
  const { language, changeLanguage } = useLanguage();
  const { theme, isDark } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <View style={[{ zIndex: 999 }, style]}>
      <TouchableOpacity
        onPress={() => setOpen(v => !v)}
        activeOpacity={0.75}
        style={[s.trigger, { backgroundColor: theme.inputBg, borderColor: theme.primary }]}
      >
        <Ionicons name="globe-outline" size={15} color={theme.primary} />
        <Text style={[s.triggerText, { color: theme.primary }]}>
          {LANGUAGE_LABELS[language]}
        </Text>
        <Ionicons name="chevron-down" size={12} color={theme.primary} />
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)}>
          <View style={[s.modal, {
            backgroundColor: isDark ? '#0D1F14' : '#FFFFFF',
            borderColor: isDark ? 'rgba(101,179,97,0.4)' : '#CCCCCC',
          }]}>
            {LANGUAGES.map((lang) => {
              const isActive = language === lang;
              return (
                <TouchableOpacity
                  key={lang}
                  onPress={() => { changeLanguage(lang); setOpen(false); }}
                  style={[s.option, isActive && { backgroundColor: theme.primaryFaint }]}
                >
                  <View style={[s.circle, { backgroundColor: isActive ? theme.primary : theme.primaryFaint }]}>
                    <Text style={[s.circleText, { color: isActive ? '#FFFFFF' : theme.primary }]}>
                      {lang.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[s.optionText, {
                    color: isActive ? theme.primary : (isDark ? '#FFFFFF' : '#111111'),
                    fontWeight: isActive ? '700' : '500',
                  }]}>
                    {LANG_NAMES[lang]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function LanguageSelector(props: LanguageSelectorProps) {
  if (Platform.OS === 'web') return <LanguageSelectorWeb {...props} />;
  return <LanguageSelectorMobile {...props} />;
}

const s = StyleSheet.create({
  trigger:     { flexDirection: 'row', alignItems: 'center', gap: 6, height: 40, borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 14 },
  triggerText: { fontSize: 13, fontWeight: '700' },
  backdrop:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  modal:       { borderRadius: 14, borderWidth: 1, overflow: 'hidden', minWidth: 200 },
  option:      { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14 },
  optionText:  { fontSize: 15 },
  circle:      { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  circleText:  { fontSize: 10, fontWeight: '800' },
});