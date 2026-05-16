import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Language, LANGUAGE_LABELS, useLanguage } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';

const LANGUAGES: Language[] = ['es', 'en', 'de', 'fr'];

interface LanguageSelectorProps {
  style?: ViewStyle;
}

export default function LanguageSelector({ style }: LanguageSelectorProps) {
  const { language, changeLanguage } = useLanguage();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleSelect = (lang: Language) => {
    changeLanguage(lang);
    setOpen(false);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity
        onPress={() => setOpen((value) => !value)}
        activeOpacity={0.75}
        style={[
          styles.trigger,
          { backgroundColor: theme.inputBg, borderColor: theme.primary },
        ]}
      >
        <Text style={[styles.triggerText, { color: theme.primary }]}>
          {LANGUAGE_LABELS[language]} v
        </Text>
      </TouchableOpacity>

      {open && Platform.OS === 'web' ? (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.card,
              borderColor: theme.inputBorder,
              shadowColor: theme.cardShadow,
            },
          ]}
        >
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => handleSelect(lang)}
              style={[
                styles.option,
                language === lang && { backgroundColor: theme.primaryFaint },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: theme.text },
                  language === lang && { color: theme.primary, fontWeight: '700' },
                ]}
              >
                {LANGUAGE_LABELS[lang]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      {open && Platform.OS !== 'web' ? (
        <Modal transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
            <View
              style={[
                styles.modalBox,
                { backgroundColor: theme.card, borderColor: theme.inputBorder },
              ]}
            >
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => handleSelect(lang)}
                  style={[
                    styles.modalOption,
                    language === lang && { backgroundColor: theme.primaryFaint },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: theme.text },
                      language === lang && { color: theme.primary, fontWeight: '700' },
                    ]}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 200,
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    minWidth: 62,
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dropdown: {
    position: 'absolute',
    top: 46,
    left: 0,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    minWidth: 72,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  optionText: {
    fontSize: 13,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    minWidth: 160,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalOption: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});