export const strings = {
  // Common
  common: {
    ok: 'حسناً',
    cancel: 'إلغاء',
    next: 'التالي',
    back: 'رجوع',
    skip: 'تخطي',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    retry: 'إعادة المحاولة',
    points: 'نقطة',
    points_plural: 'نقاط',
  },

  // Authentication
  auth: {
    welcome_title: 'مرحباً بك في نقطه',
    welcome_subtitle: 'اجمع النقاط مع كل زيارة',
    welcome_description: 'أدخل رقم هاتفك لإنشاء رمز QR الشخصي الخاص بك لجمع النقاط',
    get_started: 'ابدأ الآن',
    
    phone_title: 'احصل على بطاقة النقاط الخاصة بك',
    phone_subtitle: 'أدخل رقم هاتفك لإنشاء رمز QR الشخصي الخاص بك',
    phone_label: 'رقم الهاتف',
    phone_placeholder: '123 456 7890',
    create_qr: 'إنشاء رمز QR',
    phone_footer: 'امسح رمز QR الخاص بك في المواقع المشاركة لجمع النقاط',
    
    otp_title: 'تحقق من رمز التأكيد',
    otp_subtitle: 'أدخل رمز التحقق',
    otp_description: 'تم إرسال رمز التحقق إلى',
    otp_placeholder: '000000',
    verify: 'تحقق',
    resend_text: 'لم تستلم الرمز؟',
    resend_button: 'إعادة الإرسال',
    resend_timer: 'إعادة الإرسال خلال',
    
    onboarding_title: 'كيفية استخدام نقطه',
    onboarding_steps: {
      scan: {
        title: 'امسح رمز QR',
        description: 'استخدم رمز QR الخاص بك في المتاجر المشاركة لجمع النقاط مع كل عملية شراء',
      },
      collect: {
        title: 'اجمع النقاط',
        description: 'احصل على نقاط مع كل زيارة واستمتع بالمكافآت الحصرية',
      },
      redeem: {
        title: 'استبدل المكافآت',
        description: 'استخدم نقاطك للحصول على خصومات ومكافآت رائعة',
      },
    },
    
    terms_title: 'الشروط والأحكام',
    terms_welcome: 'مرحباً بك في نقطه!',
    terms_intro: 'يرجى قراءة الشروط والأحكام التالية قبل استخدام التطبيق:',
    terms_accept: 'أوافق على الشروط والأحكام',
    start_using: 'ابدأ استخدام التطبيق',
  },

  // Dashboard
  dashboard: {
    welcome: 'مرحباً بك',
    points_balance: 'رصيد النقاط',
    points_available: 'نقطة متاحة للاستبدال',
    your_qr_title: 'رمز QR الخاص بك',
    your_qr_subtitle: 'اعرض هذا الرمز في المتاجر المشاركة لجمع النقاط',
    quick_actions: 'إجراءات سريعة',
    recent_activity: 'النشاط الأخير',
    no_activity: 'لا توجد عمليات حتى الآن',
    start_collecting: 'ابدأ بجمع النقاط من المتاجر المشاركة',
    
    actions: {
      scan_qr: 'مسح QR',
      scan_subtitle: 'امسح لجمع النقاط',
      history: 'تاريخ النقاط',
      history_subtitle: 'عرض العمليات السابقة',
      rewards: 'المكافآت',
      rewards_subtitle: 'استبدل نقاطك',
    },
  },

  // Rewards
  rewards: {
    title: 'المكافآت',
    categories: {
      all: 'الكل',
      discounts: 'خصومات',
      drinks: 'مشروبات',
      food: 'طعام',
    },
    redeem: 'استبدال',
    not_available: 'غير متاح',
    insufficient_points: 'نقاط غير كافية',
    insufficient_message: 'ليس لديك نقاط كافية لاستبدال هذه المكافأة',
    confirm_redeem: 'تأكيد الاستبدال',
    confirm_message: 'هل تريد استبدال {points} نقطة للحصول على {reward}؟',
    redeem_success: 'تم الاستبدال',
    redeem_success_message: 'تم استبدال المكافأة بنجاح!',
    no_rewards: 'لا توجد مكافآت في هذه الفئة',
  },

  // History
  history: {
    title: 'تاريخ النقاط',
    earned: 'مكتسبة',
    redeemed: 'مستبدلة',
    all: 'الكل',
    points_earned: 'نقاط مكتسبة',
    points_redeemed: 'نقاط مستبدلة',
    no_transactions: 'لا توجد عمليات في هذه الفئة',
    
    transactions: {
      store_purchase: 'شراء من المتجر',
      reward_redeemed: 'استبدال مكافأة',
    },
  },

  // QR Scanner
  qr: {
    title: 'مسح QR',
    scan_title: 'امسح رمز QR لجمع النقاط',
    scan_description: 'وجه الكاميرا نحو رمز QR في المتاجر المشاركة لجمع النقاط تلقائياً',
    start_scanning: 'بدء المسح',
    camera_instruction: 'وجه الكاميرا نحو رمز QR',
    camera_permission: 'نحتاج إلى إذن الكاميرا لمسح رموز QR',
    request_permission: 'طلب الإذن',
    requesting_permission: 'جاري طلب إذن الكاميرا...',
    
    demo_title: 'تجربة المسح (للعرض التوضيحي)',
    demo_store: 'مسح متجر',
    demo_promo: 'مسح عرض',
    
    success_title: 'تم جمع النقاط!',
    success_message: 'تهانينا! لقد حصلت على {points} نقطة من هذا المتجر.',
    promo_title: 'عرض خاص!',
    promo_message: 'لقد حصلت على عرض خاص! تحقق من قسم المكافآت.',
    invalid_title: 'رمز QR غير صحيح',
    invalid_message: 'هذا الرمز غير مدعوم في تطبيق نقطه.',
    view_rewards: 'عرض المكافآت',
    great: 'رائع!',
  },

  // Profile
  profile: {
    title: 'الملف الشخصي',
    user_name: 'مستخدم نقطه',
    
    options: {
      my_qr: 'رمز QR الخاص بي',
      my_qr_subtitle: 'عرض أو مشاركة رمز QR',
      notifications: 'الإشعارات',
      notifications_subtitle: 'إدارة إعدادات الإشعارات',
      language: 'اللغة',
      language_subtitle: 'العربية',
      help: 'المساعدة والدعم',
      help_subtitle: 'الأسئلة الشائعة والدعم',
      privacy: 'الخصوصية والأمان',
      privacy_subtitle: 'سياسة الخصوصية والأمان',
      about: 'حول التطبيق',
      about_subtitle: 'الإصدار 1.0.0',
    },
    
    logout: 'تسجيل الخروج',
    logout_confirm: 'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
    version: 'الإصدار 1.0.0',
    
    alerts: {
      notifications: 'قريباً...',
      language: 'قريباً...',
      help: 'قريباً...',
      privacy: 'قريباً...',
      about: 'تطبيق نقطه - نظام الولاء والمكافآت',
    },
  },

  // Navigation
  navigation: {
    home: 'الرئيسية',
    rewards: 'المكافآت',
    scanner: 'المسح',
    history: 'التاريخ',
    profile: 'الملف الشخصي',
  },

  // Errors
  errors: {
    phone_required: 'يرجى إدخال رقم الهاتف',
    phone_invalid: 'يرجى إدخال رقم هاتف صحيح',
    otp_required: 'يرجى إدخال رمز التحقق المكون من 6 أرقام',
    network_error: 'خطأ في الشبكة، يرجى المحاولة مرة أخرى',
    unknown_error: 'حدث خطأ غير متوقع',
  },
};
