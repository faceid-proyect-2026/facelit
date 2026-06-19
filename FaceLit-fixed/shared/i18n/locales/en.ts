const en = {
// ─────────────────────────────────────────────
//  Module 1 - Authentication
// ─────────────────────────────────────────────

  //Login Page
  common: {
    cancel:  'Cancel',
    accept:  'Accept',
    save:    'Save',
    back:    'Back',
    loading: 'Loading...',
    error:   'Error',
    yes:     'Yes',
    no:      'No',
  },
  theme: {
    toggle: 'Theme',
    light:  'Light',
    dark:   'Dark',
  },
  landing: {
    contactTitle:    'Contact',
    contactText:     'Support, project information, or help with your account.',
    contactEmail:    'support@facelit.com',
    contactPhone:    '+57 300 000 0000',
    contactLocation: 'SENA — Colombia',
    footerPrivacy:   'Privacy',
    footerRights:    'Rights',
  },

  nav: {
    app:      'App',
    security: 'Security',
    contact:  'Contact',
  },
  hero: {
    pill:        'Intelligent System · SENA',
    title1:      'Transforming',
    title2:      'academic',
    titleAccent: 'attendance\ncontrol',
    description: 'FaceLit automates attendance tracking with facial recognition and biometric intelligence, ensuring authenticity, security, and efficiency at every entry.',
    createAccount: 'Create account',
    login:         'I already have an account',
    metric1: 'Availability',
    metric2: 'Recognition',
    metric3: 'Automated',
    metric4: 'Impersonations',
    phoneInfo: 'Real-time biometric identification for SENA',
  },
  problems: {
    sectionTitle: 'Why was FaceLit created?',
    sectionText:  'In many educational settings, manual attendance control causes frequent problems. Traditional methods consume between 5 and 10 minutes per school day.',
    item1Title: 'Time loss',
    item1Text:  'Manual entries at the start of class consume valuable minutes of every academic day.',
    item2Title: 'Errors and inconsistencies',
    item2Text:  'Human errors in records and difficulty generating reports and disciplinary follow-ups.',
    item3Title: 'Identity fraud',
    item3Text:  'Traditional methods cannot verify the identity of the learner.',
  },
  offers: {
    sectionTitle: 'What does FaceLit offer?',
    item1Title: 'Smart registration',
    item1Text:  'Automatically identifies learners through facial recognition.',
    item2Title: 'Biometric security',
    item2Text:  'Every attendance record is linked to the user\'s unique face.',
    item3Title: 'Time optimization',
    item3Text:  'Reduces the time spent on manual lists and traditional processes.',
    item4Title: 'Real-time reports',
    item4Text:  'Automatically generates attendance and absence reports.',
    item5Title: 'Modern and accessible platform',
    item5Text:  'Intuitive interfaces for smartphones, tablets, and web environments.',
  },
  objective: {
    title:       'Project Objective',
    description: 'Develop an intelligent academic attendance registration and control system using facial recognition for SENA.',
    char1: 'Registration of learners, instructors, and administrators',
    char2: 'Capture and storage of facial biometric data',
    char3: 'Real-time detection and identification',
    char4: 'Automatic entry and exit logging',
    char5: 'Validation of environments and schedules',
    char6: 'Automatic report generation',
    char7: 'Smart notifications',
    char8: 'System logs and traceability',
    char9: 'Integration with IoT devices',
  },
  tech: {
    title:    'Technologies Used',
    subtitle: 'FaceLit integrates modern technologies focused on performance and security.',
    label1: 'AI Facial Recognition',
    label2: 'Figma UI/UX Design',
    label3: 'Web and Mobile',
    label4: 'Scalable Architecture',
    label5: 'Academic Database',
    label6: 'Report Automation',
    label7: 'Biometric Authentication',
  },
  innovation: {
    title:   'Innovation for the future of education',
    text:    'FaceLit transforms the academic experience through intelligent technology, strengthening SENA\'s security and efficiency.',
    pill1: 'More precision',
    pill2: 'More security',
    pill3: 'More time to learn',
  },

  //Login
  login: {
    title:          'Sign in',
    subtitle:       'Enter your credentials',
    email:          'Email address',
    emailPlaceholder: 'email@example.com',
    password:       'Password',
    passwordPlaceholder: '********',
    policyPrefix:   'I have read and accept the',
    policyLink:     'privacy notice',
    policySuffix:   '',
    policyError:    'You must accept the privacy notice',
    loginBtn:       'Sign in',
    forgotPassword: 'Forgot your password?',
    noAccount:      'Don\'t have an account?',
    registerLink:   'Register here',
    errors: {
      emailNotFound:  'Email address not registered',
      wrongPassword:  'Incorrect password',
    },
  },

  //Privacy Notice
  privacyNotice: {
    title:       'Privacy Notice',
    subtitle:    'Information about the processing of your personal data',
    body1:       'In accordance with Law 1581 of 2012, your personal data will be processed for the following purposes:',
    item1:       'Identification and authentication in the attendance system',
    item2:       'Attendance registration and control through biometric data',
    item3:       'Generation of reports and punctuality statistics',
    item4:       'Delivery of important notifications',
    warning:     'Your credentials are personal and non-transferable. Do not share them with third parties.',
    body2:       'You have the right to access, update, and correct your personal data at any time.',
    moreInfo:    'More information: ',
  },

  //Password Recovery
  passwordRecovery: {
    title:       'Recover password',
    subtitle:    'Enter your email address to receive password recovery instructions',
    emailLabel:  'Email address',
    emailPlaceholder: 'email@example.com',
    sendBtn:     'Send code',
    cancelBtn:   'Cancel',
    errors: {
      invalidEmail:    'Invalid email address',
      emailNotFound:   'This email address is not registered',
    },
  },

  //Token Sent
  tokenSent: {
    title:    'Code sent',
    subtitle: 'We sent a verification code to your email. Check your inbox to continue.',
    btn:      'Got it',
  },

  //Verify Identity
  verifyIdentity: {
    backBtn:       '← Request a new code',
    title:         'Verify your identity',
    subtitle:      'A 6-digit code has been sent to',
    timerLabel:    '⏰ Time remaining ',
    resendBtn:     'Resend code',
    inputLabel:    'Verification code',
    placeholder:   'XXXXXX',
    hint:          'Enter the 6-digit code',
    verifyBtn:     'Verify code',
    errors: {
      length:      'You must enter 6 digits',
      invalid:     'Invalid token',
    },
  },

  //New Password
  newPassword: {
    backBtn:      '← Request a new code',
    title:        'New password',
    subtitle:     'Create a secure password that meets the system policies.',
    reqTitle:     'Password requirements:',
    req: {
      length:  'Between 8 and 15 characters',
      upper:   'At least one uppercase letter',
      lower:   'At least one lowercase letter',
      number:  'At least one number',
      symbol:  'At least one special symbol',
    },
    passwordLabel:        'New password',
    passwordPlaceholder:  'Create your new password',
    confirmLabel:         'Confirm password',
    confirmPlaceholder:   'Repeat your new password',
    submitBtn:            'Reset password',
    errors: {
      passwordRequired:  'Password is required',
      passwordInvalid:   'Does not meet security requirements',
      confirmRequired:   'You must confirm your password',
      confirmMismatch:   'Passwords do not match',
    },
  },

  //Password Reset Done
  passwordResetDone: {
    title:          'Password reset',
    subtitle1:      'Your password has been successfully updated.',
    subtitle2:      'You can now sign in with your new password.',
    securityTitle:  'Security log:',
    security: {
      item1: '✓ Password encrypted and securely stored',
      item2: '✓ Recovery code invalidated',
      item3: '✓ Event recorded in audit logs',
      item4: '✓ Compliance with Law 1581 of 2012',
    },
    loginBtn: 'Go to sign in',
  },

  //Rights
  rights: {
    title1:    'Your rights over',
    title2:    'personal data',
    subtitle:  'Learn how your rights are protected under',
    lawLabel:  'Law 1581 of 2012',
    items: {
      access: {
        title: 'Right of access',
        desc:  'You have the right to know what personal data we have on record about you in our system.',
      },
      update: {
        title: 'Right to update',
        desc:  'You can update your personal data when it is incorrect or incomplete.',
      },
      rectification: {
        title: 'Right to rectification',
        desc:  'You have the right to request the correction of inaccurate data we hold about you.',
      },
      deletion: {
        title: 'Right to deletion',
        desc:  'You can request the removal of your data when it is no longer necessary for the processing purposes.',
      },
      revocation: {
        title: 'Right to revoke',
        desc:  'You may revoke at any time the consent given for the processing of your data.',
      },
    },
    importantLabel: 'Important: ',
    importantText:  'by reading and accepting these rights, any decision regarding your personal data will be your sole responsibility in accordance with current regulations.',
  },

  //Registration Success
  registrationSuccess: {
    title:    'Registration successfully completed',
    subtitle: 'Your account has been created successfully. You can now access the system.',
    btn:      'Go to home',
  },

  //Minor Consent
  minorConsent: {
    title:    'Consent required',
    subtitle1: 'We detected that you are a ',
    minorLabel: 'minor',
    subtitle2: '.\nWe need authorization from a responsible adult to continue.',
    legalText:  'In accordance with ',
    lawLabel:   'Law 1581 of 2012',
    legalText2: ', the express consent of the responsible adult is required for the processing of personal data of minors.',

    sectionGuardian:     'Guardian information',
    sectionAuthorization: 'Authorization',

    nameLabel:       'Guardian\'s full name',
    namePlaceholder: 'First and last name',
    docLabel:        'Guardian\'s ID number (10 digits)',
    docPlaceholder:  '0000000000',
    emailLabel:      'Guardian\'s email address',
    emailPlaceholder: 'email@example.com',
    emailWarning:    'Must be different from the minor\'s email: ',

    validateBtn:         'Validate email — required to continue',
    validateBtnDone:     'Guardian\'s email validated ✓',

    consentText:  'I confirm that I authorize the registration and processing of the minor\'s data, as established in ',
    consentText2: ' and its regulatory standards.',
    moreInfo:     'More information about Law 1581 of 2012',

    confirmBtn: 'Confirm authorization',
    backBtn:    'Back to registration',

    errors: {
      nameRequired:    'The guardian\'s name is required',
      nameIncomplete:  'Enter the full first and last name',
      nameLettersOnly: 'Only letters are allowed',
      docRequired:     'The ID number is required',
      docLength:       'The ID number must be exactly 10 digits',
      emailRequired:   'The email address is required',
      emailInvalid:    'Invalid email format',
      emailSameMinor:  'The guardian\'s email must be different from the minor\'s',
      emailNotValidated: 'You must validate the email before continuing',
      consentRequired: 'You must confirm the authorization',
      emailEmpty:      'Enter the email address first',
    },
  },

  //Register
  register: {
    title:    'User registration',
    subtitle: 'Complete your information to create your FaceLit account',
    sections: {
      personal: 'Personal data',
      contact:  'Contact',
      security: 'Security',
      other:    'Other details',
      acceptances: 'Acceptances',
    },
    name:               'First name',
    namePlaceholder:    'Full first name',
    lastname:           'Last name',
    lastnamePlaceholder:'Full last name',
    identityType:       'ID type',
    identitySelect:     'Select an option',
    identityTI: 'TI — Identity Card (minor)',
    identityCC: 'CC — National ID (adult)',
    identityCE: 'CE — Foreign ID',
    identityPA: 'PA — Passport',
    infoTI: 'TI is for minors under 18 years old',
    infoCC: 'CC is for adults 18 years old or older',
    document:            'ID number (10 digits)',
    documentPlaceholder: '0000000000',
    email:              'Email address',
    emailPlaceholder:   'email@example.com',
    validateEmail:      'Validate email — required to continue',
    emailValidated:     '✓ Email verified',
    password:           'Password',
    passwordHint:        '8–15 characters · 1 uppercase · 1 number · 1 symbol',
    confirmPassword:     'Confirm password',
    birthdate:           'Date of birth (8–100 years)',
    birthdateSelect:     'Select date',
    policyText:  'I declare that the information provided is truthful in accordance with',
    policyLaw:   'Law 1581 of 2012',
    rightsQuestion: 'Have you read and accepted your rights of access, update, and rectification of your data?',
    rightsYes:   'Yes',
    rightsNo:    'No',
    rightsRead:  'Read my rights',
    registerBtn: 'Register',
    cancelBtn:   'Cancel',
    hasAccount:  'Already have an account?',
    loginLink:   'Sign in',
    errors: {
      nameRequired:       'First name is required',
      onlyLetters:        'Only letters are allowed',
      lastnameRequired:   'Last name is required',
      identityRequired:   'Select an ID type',
      documentRequired:   'ID number is required',
      documentLength:     'Must be exactly 10 digits',
      emailRequired:      'Email is required',
      emailInvalid:       'Invalid email format',
      emailNotValidated:  'You must validate your email before continuing',
      emailEmpty:         'Enter your email address first',
      emailInvalidShort:  'Invalid email',
      passwordRequired:   'Password is required',
      passwordWeak:       'Minimum 8 and maximum 15 characters, one uppercase letter, one number, and one symbol',
      confirmRequired:    'Confirm your password',
      passwordMismatch:   'Passwords do not match',
      birthdateRequired:  'Select a date of birth',
      ageMin:             'Minimum age is 8 years',
      ageMax:             'Maximum age is 100 years',
      tiAdult:            'TI is only for people under 18 years old',
      ccMinor:            'CC is only for people 18 years old or older',
      policyRequired:     'You must read and accept the policies',
      rightsRequired:     'You must answer this question',
    },
  },

  //Facial Registration
  facialReg: {
    title:    'Register face',
    subtitle: 'Position your face in front of the camera',
    captureBtn: 'Start capture',
    instructions: 'Registration instructions:',
    instr1: 'Stand in front of the camera',
    instr2: 'Ensure adequate lighting',
    instr3: 'Look directly at the camera',
    instr4: 'Avoid wearing dark glasses or hats',
    instr5: 'The system will capture a frontal image of your face',
    tapToCapture:    'Tap the button to activate the camera',
    requestingPermission: 'Requesting camera permission…',
    permissionDenied:     'You must allow camera access to continue.',
    moveCloser:   'Move a little closer to the camera',
    goodPosition: 'Good position, you can capture now',
    captured:     'Face captured',
    captureError: 'An error occurred while taking the photo. Please try again.',
    lowLight:        'The image is too dark. Improve the lighting and try again.',
    captureSuccess:  'Great capture! The face is clearly visible.',
    retake: 'Retake photo',
    finish: 'Finish registration',
  },

  //Email Validation
  emailValidation: {
    backBtn:      'Back to registration',
    title:        'Verify your email',
    subtitle:     'A 6-digit code has been sent to',
    timerLabel:   'Time remaining ',
    resendBtn:    'Resend code',
    inputLabel:   'Verification code',
    placeholder:  'X X X X X X',
    hint:         'Enter the 6-digit code sent to your email',
    verifyBtn:    'Verify code',
    demoText:     'Demo: the code is',
    errors: {
      expired:    'The code has expired. Request a new one.',
      length:     'You must enter all 6 digits of the code.',
      invalid:    'Incorrect code. Please try again.',
    },
  },

  //Email Validated Success
  emailValidatedSuccess: {
    title:    'Email verified!',
    subtitle: 'Your email address has been successfully verified.\nYou can continue with the registration.',
    btn:      'Continue registration',
  },

} as const;

export default en;