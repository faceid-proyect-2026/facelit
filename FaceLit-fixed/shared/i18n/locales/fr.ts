const fr = {
// ─────────────────────────────────────────────
//  Module 1 - Authentification
// ─────────────────────────────────────────────

  //Login Page
  common: {
    cancel:  'Annuler',
    accept:  'Accepter',
    save:    'Enregistrer',
    back:    'Retour',
    loading: 'Chargement...',
    error:   'Erreur',
    yes:     'Oui',
    no:      'Non',
  },
  theme: {
    toggle: 'Thème',
    light:  'Clair',
    dark:   'Sombre',
  },
  landing: {
    contactTitle:    'Contact',
    contactText:     'Assistance, informations sur le projet ou aide avec votre compte.',
    contactEmail:    'support@facelit.com',
    contactPhone:    '+57 300 000 0000',
    contactLocation: 'SENA — Colombie',
    footerPrivacy:   'Confidentialité',
    footerRights:    'Droits',
  },

  nav: {
    app:      'App',
    security: 'Sécurité',
    contact:  'Contact',
  },
  hero: {
    pill:        'Système Intelligent · SENA',
    title1:      'Transformer le',
    title2:      'contrôle de',
    titleAccent: 'présence\nacadémique',
    description: 'FaceLit automatise l\'enregistrement des présences grâce à la reconnaissance faciale et à l\'intelligence biométrique, garantissant authenticité, sécurité et efficacité à chaque entrée.',
    createAccount: 'Créer un compte',
    login:         'J\'ai déjà un compte',
    metric1: 'Disponibilité',
    metric2: 'Reconnaissance',
    metric3: 'Automatisé',
    metric4: 'Usurpations',
    phoneInfo: 'Identification biométrique en temps réel pour le SENA',
  },
  problems: {
    sectionTitle: 'Pourquoi FaceLit a-t-il été créé ?',
    sectionText:  'Dans de nombreux environnements éducatifs, le contrôle manuel des présences génère des problèmes fréquents. Les méthodes traditionnelles consomment entre 5 et 10 minutes par journée scolaire.',
    item1Title: 'Perte de temps',
    item1Text:  'Les enregistrements manuels en début de cours consomment de précieuses minutes de chaque journée académique.',
    item2Title: 'Erreurs et incohérences',
    item2Text:  'Erreurs humaines dans les enregistrements et difficulté à générer des rapports et un suivi disciplinaire.',
    item3Title: 'Usurpation d\'identité',
    item3Text:  'Les méthodes traditionnelles ne peuvent pas vérifier l\'identité de l\'apprenant.',
  },
  offers: {
    sectionTitle: 'Que propose FaceLit ?',
    item1Title: 'Enregistrement intelligent',
    item1Text:  'Identifie automatiquement les apprenants par reconnaissance faciale.',
    item2Title: 'Sécurité biométrique',
    item2Text:  'Chaque présence est liée au visage unique de l\'utilisateur.',
    item3Title: 'Optimisation du temps',
    item3Text:  'Réduit le temps consacré aux listes manuelles et aux processus traditionnels.',
    item4Title: 'Rapports en temps réel',
    item4Text:  'Génère automatiquement des rapports de présences et d\'absences.',
    item5Title: 'Plateforme moderne et accessible',
    item5Text:  'Interfaces intuitives pour smartphones, tablettes et environnements web.',
  },
  objective: {
    title:       'Objectif du projet',
    description: 'Développer un système intelligent d\'enregistrement et de contrôle des présences académiques par reconnaissance faciale pour le SENA.',
    char1: 'Enregistrement des apprenants, formateurs et administrateurs',
    char2: 'Capture et stockage des données biométriques faciales',
    char3: 'Détection et identification en temps réel',
    char4: 'Enregistrement automatique des entrées et sorties',
    char5: 'Validation des espaces et des horaires',
    char6: 'Génération automatique de rapports',
    char7: 'Notifications intelligentes',
    char8: 'Journaux et traçabilité du système',
    char9: 'Intégration avec des appareils IoT',
  },
  tech: {
    title:    'Technologies utilisées',
    subtitle: 'FaceLit intègre des technologies modernes axées sur la performance et la sécurité.',
    label1: 'Reconnaissance faciale IA',
    label2: 'Design UI/UX Figma',
    label3: 'Web et mobile',
    label4: 'Architecture évolutive',
    label5: 'Base de données académique',
    label6: 'Automatisation des rapports',
    label7: 'Authentification biométrique',
  },
  innovation: {
    title:   'Innovation pour l\'avenir éducatif',
    text:    'FaceLit transforme l\'expérience académique grâce à une technologie intelligente, renforçant la sécurité et l\'efficacité du SENA.',
    pill1: 'Plus de précision',
    pill2: 'Plus de sécurité',
    pill3: 'Plus de temps pour apprendre',
  },

  //Login
  login: {
    title:          'Se connecter',
    subtitle:       'Entrez vos identifiants',
    email:          'Adresse e-mail',
    emailPlaceholder: 'email@exemple.com',
    password:       'Mot de passe',
    passwordPlaceholder: '********',
    policyPrefix:   'J\'ai lu et j\'accepte la',
    policyLink:     'politique de confidentialité',
    policySuffix:   '',
    policyError:    'Vous devez accepter la politique de confidentialité',
    loginBtn:       'Se connecter',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount:      'Vous n\'avez pas de compte ?',
    registerLink:   'Inscrivez-vous ici',
    errors: {
      emailNotFound:  'Adresse e-mail non enregistrée',
      wrongPassword:  'Mot de passe incorrect',
    },
  },

  //Privacy Notice
  privacyNotice: {
    title:       'Politique de confidentialité',
    subtitle:    'Informations sur le traitement de vos données personnelles',
    body1:       'Conformément à la Loi 1581 de 2012, vos données personnelles seront traitées aux fins suivantes :',
    item1:       'Identification et authentification dans le système de présence',
    item2:       'Enregistrement et contrôle des présences via des données biométriques',
    item3:       'Génération de rapports et de statistiques de ponctualité',
    item4:       'Communication de notifications importantes',
    warning:     'Vos identifiants sont personnels et non transférables. Ne les partagez pas avec des tiers.',
    body2:       'Vous avez le droit de consulter, mettre à jour et rectifier vos données personnelles à tout moment.',
    moreInfo:    'Plus d\'informations : ',
  },

  //Password Recovery
  passwordRecovery: {
    title:       'Récupérer le mot de passe',
    subtitle:    'Entrez votre adresse e-mail pour recevoir les instructions de récupération',
    emailLabel:  'Adresse e-mail',
    emailPlaceholder: 'email@exemple.com',
    sendBtn:     'Envoyer le code',
    cancelBtn:   'Annuler',
    errors: {
      invalidEmail:    'Adresse e-mail invalide',
      emailNotFound:   'Cette adresse e-mail n\'est pas enregistrée',
    },
  },

  //Token Sent
  tokenSent: {
    title:    'Code envoyé',
    subtitle: 'Nous vous avons envoyé un code de vérification par e-mail. Vérifiez votre boîte de réception pour continuer.',
    btn:      'Compris',
  },

  //Verify Identity
  verifyIdentity: {
    backBtn:       '← Demander un nouveau code',
    title:         'Vérifiez votre identité',
    subtitle:      'Un code à 6 chiffres a été envoyé à',
    timerLabel:    '⏰ Temps restant ',
    resendBtn:     'Renvoyer le code',
    inputLabel:    'Code de vérification',
    placeholder:   'XXXXXX',
    hint:          'Entrez le code à 6 chiffres',
    verifyBtn:     'Vérifier le code',
    errors: {
      length:      'Vous devez entrer 6 chiffres',
      invalid:     'Jeton invalide',
    },
  },

  //New Password
  newPassword: {
    backBtn:      '← Demander un nouveau code',
    title:        'Nouveau mot de passe',
    subtitle:     'Créez un mot de passe sécurisé conforme aux politiques du système.',
    reqTitle:     'Exigences du mot de passe :',
    req: {
      length:  'Entre 8 et 15 caractères',
      upper:   'Au moins une lettre majuscule',
      lower:   'Au moins une lettre minuscule',
      number:  'Au moins un chiffre',
      symbol:  'Au moins un symbole spécial',
    },
    passwordLabel:        'Nouveau mot de passe',
    passwordPlaceholder:  'Créez votre nouveau mot de passe',
    confirmLabel:         'Confirmer le mot de passe',
    confirmPlaceholder:   'Répétez votre nouveau mot de passe',
    submitBtn:            'Réinitialiser le mot de passe',
    errors: {
      passwordRequired:  'Le mot de passe est obligatoire',
      passwordInvalid:   'Ne satisfait pas aux exigences de sécurité',
      confirmRequired:   'Vous devez confirmer votre mot de passe',
      confirmMismatch:   'Les mots de passe ne correspondent pas',
    },
  },

  //Password Reset Done
  passwordResetDone: {
    title:          'Mot de passe réinitialisé',
    subtitle1:      'Votre mot de passe a été mis à jour avec succès.',
    subtitle2:      'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
    securityTitle:  'Journal de sécurité :',
    security: {
      item1: '✓ Mot de passe chiffré et stocké en toute sécurité',
      item2: '✓ Code de récupération invalidé',
      item3: '✓ Événement enregistré dans les journaux d\'audit',
      item4: '✓ Conformité avec la Loi 1581 de 2012',
    },
    loginBtn: 'Aller à la connexion',
  },

  //Rights
  rights: {
    title1:    'Vos droits sur vos',
    title2:    'données personnelles',
    subtitle:  'Découvrez comment vos droits sont protégés conformément à la',
    lawLabel:  'Loi 1581 de 2012',
    items: {
      access: {
        title: 'Droit d\'accès',
        desc:  'Vous avez le droit de savoir quelles données personnelles nous avons enregistrées à votre sujet dans notre système.',
      },
      update: {
        title: 'Droit de mise à jour',
        desc:  'Vous pouvez mettre à jour vos données personnelles lorsqu\'elles sont incorrectes ou incomplètes.',
      },
      rectification: {
        title: 'Droit de rectification',
        desc:  'Vous avez le droit de demander la correction des données incorrectes que nous détenons à votre sujet.',
      },
      deletion: {
        title: 'Droit à l\'effacement',
        desc:  'Vous pouvez demander la suppression de vos données lorsqu\'elles ne sont plus nécessaires aux fins du traitement.',
      },
      revocation: {
        title: 'Droit de révocation',
        desc:  'Vous pouvez révoquer à tout moment le consentement donné pour le traitement de vos données.',
      },
    },
    importantLabel: 'Important : ',
    importantText:  'en lisant et en acceptant ces droits, toute décision concernant vos données personnelles relèvera de votre seule responsabilité conformément à la réglementation en vigueur.',
  },

  //Registration Success
  registrationSuccess: {
    title:    'Inscription réussie',
    subtitle: 'Votre compte a été créé avec succès. Vous pouvez maintenant accéder au système.',
    btn:      'Aller à l\'accueil',
  },

  //Minor Consent
  minorConsent: {
    title:    'Consentement requis',
    subtitle1: 'Nous avons détecté que vous êtes ',
    minorLabel: 'mineur',
    subtitle2: '.\nNous avons besoin de l\'autorisation d\'un adulte responsable pour continuer.',
    legalText:  'Conformément à la ',
    lawLabel:   'Loi 1581 de 2012',
    legalText2: ', le consentement exprès de l\'adulte responsable est requis pour le traitement des données personnelles des mineurs.',

    sectionGuardian:     'Informations du tuteur',
    sectionAuthorization: 'Autorisation',

    nameLabel:       'Nom complet du tuteur',
    namePlaceholder: 'Prénom et nom de famille',
    docLabel:        'Document d\'identité du tuteur (10 chiffres)',
    docPlaceholder:  '0000000000',
    emailLabel:      'Adresse e-mail du tuteur',
    emailPlaceholder: 'email@exemple.com',
    emailWarning:    'Doit être différente de l\'e-mail du mineur : ',

    validateBtn:         'Valider l\'e-mail',
    validateBtnDone:     'E-mail du tuteur validé ✓',

    consentText:  'Je confirme que j\'autorise l\'enregistrement et le traitement des données du mineur, conformément à la ',
    consentText2: ' et à ses textes réglementaires.',
    moreInfo:     'Plus d\'informations sur la Loi 1581 de 2012',

    confirmBtn: 'Confirmer l\'autorisation',
    backBtn:    'Retour à l\'inscription',

    errors: {
      nameRequired:    'Le nom du tuteur est obligatoire',
      nameIncomplete:  'Entrez le prénom et le nom de famille complets',
      nameLettersOnly: 'Seules les lettres sont autorisées',
      docRequired:     'Le document d\'identité est obligatoire',
      docLength:       'Le document doit comporter exactement 10 chiffres',
      emailRequired:   'L\'adresse e-mail est obligatoire',
      emailInvalid:    'Format d\'e-mail invalide',
      emailSameMinor:  'L\'e-mail du tuteur doit être différent de celui du mineur',
      emailNotValidated: 'Vous devez valider l\'e-mail avant de continuer',
      consentRequired: 'Vous devez confirmer l\'autorisation',
      emailEmpty:      'Entrez d\'abord l\'adresse e-mail',
    },
  },

  //Register
  register: {
    title:    'Inscription',
    subtitle: 'Complétez vos informations pour créer votre compte FaceLit',
    sections: {
      personal: 'Données personnelles',
      contact:  'Contact',
      security: 'Sécurité',
      other:    'Autres informations',
      acceptances: 'Acceptations',
    },
    name:               'Prénom',
    namePlaceholder:    'Prénom complet',
    lastname:           'Nom de famille',
    lastnamePlaceholder:'Nom de famille complet',
    identityType:       'Type de document',
    identitySelect:     'Sélectionnez une option',
    identityTI: 'TI — Carte d\'identité (mineur)',
    identityCC: 'CC — Carte nationale d\'identité (adulte)',
    identityCE: 'CE — Carte de résident étranger',
    identityPA: 'PA — Passeport',
    infoTI: 'TI est pour les mineurs de moins de 18 ans',
    infoCC: 'CC est pour les adultes de 18 ans ou plus',
    document:            'Numéro de document (10 chiffres)',
    documentPlaceholder: '0000000000',
    email:              'Adresse e-mail',
    emailPlaceholder:   'email@exemple.com',
    validateEmail:      'Valider l\'e-mail — obligatoire pour continuer',
    emailValidated:     '✓ E-mail vérifié',
    password:           'Mot de passe',
    passwordHint:        '8–15 caractères · 1 majuscule · 1 chiffre · 1 symbole',
    confirmPassword:     'Confirmer le mot de passe',
    birthdate:           'Date de naissance (8–100 ans)',
    birthdateSelect:     'Sélectionner une date',
    policyText:  'Je déclare que les informations fournies sont véridiques conformément à la',
    policyLaw:   'Loi 1581 de 2012',
    rightsQuestion: 'Avez-vous lu et accepté vos droits d\'accès, de mise à jour et de rectification de vos données ?',
    rightsYes:   'Oui',
    rightsNo:    'Non',
    rightsRead:  'Lire mes droits',
    registerBtn: 'S\'inscrire',
    cancelBtn:   'Annuler',
    hasAccount:  'Vous avez déjà un compte ?',
    loginLink:   'Se connecter',
    errors: {
      nameRequired:       'Le prénom est obligatoire',
      onlyLetters:        'Seules les lettres sont autorisées',
      lastnameRequired:   'Le nom de famille est obligatoire',
      identityRequired:   'Sélectionnez un type de document',
      documentRequired:   'Le numéro de document est obligatoire',
      documentLength:     'Doit comporter exactement 10 chiffres',
      emailRequired:      'L\'e-mail est obligatoire',
      emailInvalid:       'Format d\'e-mail invalide',
      emailNotValidated:  'Vous devez valider votre e-mail avant de continuer',
      emailEmpty:         'Entrez d\'abord votre adresse e-mail',
      emailInvalidShort:  'E-mail invalide',
      passwordRequired:   'Le mot de passe est obligatoire',
      passwordWeak:       'Minimum 8 et maximum 15 caractères, une majuscule, un chiffre et un symbole',
      confirmRequired:    'Confirmez votre mot de passe',
      passwordMismatch:   'Les mots de passe ne correspondent pas',
      birthdateRequired:  'Sélectionnez une date de naissance',
      ageMin:             'L\'âge minimum est de 8 ans',
      ageMax:             'L\'âge maximum est de 100 ans',
      tiAdult:            'TI est uniquement pour les personnes de moins de 18 ans',
      ccMinor:            'CC est uniquement pour les personnes de 18 ans ou plus',
      policyRequired:     'Vous devez lire et accepter les politiques',
      rightsRequired:     'Vous devez répondre à cette question',
    },
  },

  //Facial Registration
  facialReg: {
    title:    'Enregistrer le visage',
    subtitle: 'Positionnez votre visage devant la caméra',
    captureBtn: 'Démarrer la capture',
    instructions: 'Instructions pour l\'enregistrement :',
    instr1: 'Placez-vous face à la caméra',
    instr2: 'Assurez-vous d\'un éclairage adéquat',
    instr3: 'Regardez directement la caméra',
    instr4: 'Évitez les lunettes de soleil ou les chapeaux',
    instr5: 'Le système capturera une image frontale de votre visage',
    tapToCapture:    'Appuyez sur le bouton pour activer la caméra',
    requestingPermission: 'Demande d\'accès à la caméra…',
    permissionDenied:     'Vous devez autoriser l\'accès à la caméra pour continuer.',
    moveCloser:   'Rapprochez-vous un peu de la caméra',
    goodPosition: 'Bonne position, vous pouvez capturer',
    captured:     'Visage capturé',
    captureError: 'Une erreur s\'est produite lors de la prise de photo. Veuillez réessayer.',
    lowLight:        'L\'image est trop sombre. Améliorez l\'éclairage et réessayez.',
    captureSuccess:  'Bonne capture ! Le visage est clairement visible.',
    retake: 'Reprendre la photo',
    finish: 'Terminer l\'enregistrement',
  },

  //Email Validation
  emailValidation: {
    backBtn:      'Retour à l\'inscription',
    title:        'Vérifiez votre e-mail',
    subtitle:     'Un code à 6 chiffres a été envoyé à',
    timerLabel:   'Temps restant ',
    resendBtn:    'Renvoyer le code',
    inputLabel:   'Code de vérification',
    placeholder:  'X X X X X X',
    hint:         'Entrez le code à 6 chiffres envoyé à votre adresse e-mail',
    verifyBtn:    'Vérifier le code',
    demoText:     'Démo : le code est',
    errors: {
      expired:    'Le code a expiré. Demandez-en un nouveau.',
      length:     'Vous devez entrer les 6 chiffres du code.',
      invalid:    'Code incorrect. Veuillez réessayer.',
    },
  },

  //Email Validated Success
  emailValidatedSuccess: {
    title:    'E-mail vérifié !',
    subtitle: 'Votre adresse e-mail a été vérifiée avec succès.\nVous pouvez continuer l\'inscription.',
    btn:      'Continuer l\'inscription',
  },

} as const;

export default fr;