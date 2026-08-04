import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Image as ImageIcon,
  Sparkles,
  Save,
  FileText,
  Briefcase,
  Camera,
  ListCheck,
  Info,
  Settings,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Building2,
  Hammer,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useSiteData } from "../contexts/SiteContext";
import { MediaPickerModal } from "../components/MediaPickerModal";
import SafeImage from "../components/SafeImage";

import interiorCardBg from "../assets/images/interior_card_bg_1784515033104.jpg";
import aluminumCardBg from "../assets/images/aluminum_card_bg_1784516085266.jpg";
import carpentryCardBg from "../assets/images/carpentry_card_bg_1784516477737.jpg";
import commercialCardBg from "../assets/images/interior_card_bg_1784515033104.jpg";
import insulationCardBg from "../assets/images/insulation_card_bg_1784517415029.jpg";
import heroImg from "../assets/images/luxury_interior_hero_1784488795242.jpg";
import aboutImg from "../assets/images/luxury_interior_about_1784488806775.jpg";
import aboutSlide2 from "../assets/images/luxury_about_slide2_1784490484658.jpg";
import aboutSlide3 from "../assets/images/luxury_about_slide3_1784490498052.jpg";
import aboutSlide4 from "../assets/images/luxury_about_slide4_1784490510728.jpg";
import portfolioMajlisModern from "../assets/images/portfolio_majlis_modern_1784490542736.jpg";
import portfolioMajlisClassic from "../assets/images/portfolio_majlis_classic_1784490556781.jpg";
import portfolioCorridorClassic from "../assets/images/portfolio_corridor_classic_1784490570233.jpg";

const DEFAULT_SERVICE_DETAILS = {
  "interior-design": {
    title: "الديكور الداخلي والتشطيبات",
    subtitle: "Interior Design & Fit-Out",
    description: "نقدم حلولاً متكاملة للديكور الداخلي والتشطيبات الفاخرة التي تجمع بين الجمال والوظيفة لتعكس ذوقك الرفيع.",
    about: "قطاع الديكور الداخلي والتشطيبات في عدن للديكور يمثل جوهر الإبداع والتميز. نحن نهتم بأدق التفاصيل في تحويل الفراغات إلى مساحات تنبض بالحياة، باستخدام أحدث التقنيات وأجود المواد لضمان تنفيذ أعمال تتجاوز توقعات عملائنا، سواء في المشاريع السكنية أو التجارية.",
    heroImage: interiorCardBg,
    aboutImage: portfolioMajlisModern,
    gallery: [portfolioMajlisModern, portfolioMajlisClassic, portfolioCorridorClassic],
    subServices: [
      { id: "ceilings", title: "الأسقف المعلقة والديكورية", items: ["جبسمبورد", "جبس مغربي"] },
      { id: "wall-panels", title: "تكسيات الجدران", items: ["بديل شيبورد", "بديل رخام", "بديل خشب", "فوم"] },
      { id: "painting", title: "الدهانات والتشطيبات النهائية", items: [] },
      { id: "lighting", title: "أنظمة الإضاءة الحديثة", items: ["سبوت لايت", "داون لايت", "إضاءة مخفية", "LED Profile", "Magnetic Track"] }
    ],
    features: [
      { icon: "ShieldCheck", title: "جودة لا تضاهى", desc: "نستخدم أفضل الخامات لضمان استدامة وجمال التنفيذ المتقن." },
      { icon: "PencilRuler", title: "تصاميم مبتكرة", desc: "تصاميم عصرية وكلاسيكية تناسب جميع الأذواق وتستغل المساحات بذكاء." },
      { icon: "Clock", title: "دقة في المواعيد", desc: "التزام كامل بتسليم المشاريع في الوقت المتفق عليه دون تأخير." },
      { icon: "Sparkles", title: "إشراف هندسي متكامل", desc: "متابعة دقيقة لكل مرحلة لضمان التنفيذ بأعلى المعايير الهندسية." }
    ],
    process: [
      { step: "01", title: "المعاينة والاستشارة", desc: "نقوم بزيارة الموقع وتقديم استشارات هندسية مبدئية لفهم متطلباتك ورؤيتك بوضوح." },
      { step: "02", title: "التصميم والتخطيط", desc: "نعد المخططات الهندسية والتصاميم ثلاثية الأبعاد (3D) لتراها واقعاً قبل التنفيذ." },
      { step: "03", title: "التنفيذ والإشراف", desc: "يبدأ فريقنا بالتنفيذ تحت إشراف هندسي دقيق لضمان مطابقة التصميم وجودة العمل." },
      { step: "04", title: "التسليم النهائي", desc: "نسلمك المشروع جاهزاً ومطابقاً لأعلى معايير التشطيب الفاخر، لتستمتع بمساحتك الجديدة." }
    ]
  },
  "aluminum-facades": {
    title: "أعمال الألمنيوم والواجهات",
    subtitle: "Aluminum & Facades",
    description: "نصمم وننفذ أرقى واجهات الألمنيوم والزجاج التي تضفي طابعاً عصرية وقيمة جمالية وهندسية لمشروعك.",
    about: "يعتبر قطاع الألمنيوم والواجهات من أهم القطاعات التي تبرز هوية المبنى. في عدن للديكور، نوفر حلولاً مبتكرة للواجهات الزجاجية وأعمال الكلادنج والشبابيك، معتمدين على معايير الجودة العالمية لضمان العزل الحراري والصوتي والمظهر العصري الجذاب.",
    heroImage: aluminumCardBg,
    aboutImage: aluminumCardBg,
    gallery: [aluminumCardBg, heroImg, aboutSlide2],
    subServices: [
      { id: "windows", title: "شبابيك ألمنيوم", items: [] },
      { id: "doors", title: "أبواب ألمنيوم", items: [] },
      { id: "glass", title: "واجهات زجاجية", items: [] },
      { id: "cladding", title: "أعمال الكلادنج", items: [] }
    ],
    features: [
      { icon: "ShieldCheck", title: "جودة وأمان", desc: "استخدام قطاعات ألمنيوم وزجاج عالي الجودة ومقاوم للعوامل الجوية." },
      { icon: "PencilRuler", title: "تصاميم عصرية", desc: "واجهات زجاجية وكلادنج تعكس التطور وتضيف لمسة جمالية للمبنى." },
      { icon: "Clock", title: "دقة التنفيذ", desc: "تركيب متقن يضمن العزل المائي والحراري والصوتي بأعلى المعايير." },
      { icon: "Sparkles", title: "إشراف هندسي", desc: "متابعة دقيقة لضمان التنفيذ وفقاً للمواصفات الهندسية العالمية." }
    ],
    process: [
      { step: "01", title: "المعاينة وأخذ القياسات", desc: "زيارة الموقع لرفع المقاسات بدقة ودراسة المتطلبات الهندسية." },
      { step: "02", title: "التصميم والاعتماد", desc: "تقديم المخططات التفصيلية لاختيار القطاعات وألوان الكلادنج." },
      { step: "03", title: "التصنيع والتجهيز", desc: "تفصيل الألمنيوم والزجاج في ورشنا باستخدام أحدث التقنيات." },
      { step: "04", title: "التركيب والتسليم", desc: "تركيب الواجهات باحترافية عالية وتسليم المشروع بجودة تامة." }
    ]
  },
  "custom-carpentry": {
    title: "النجارة والديكور الخشبي المخصص",
    subtitle: "Custom Carpentry",
    description: "أعمال نجارة مخصصة وديكورات خشبية فريدة تلبي احتياجاتك وتضفي الدفء والأناقة على مساحاتك.",
    about: "نقدم في قطاع النجارة والديكور الخشبي أعمالاً فنية متقنة تُصنع خصيصاً لتلائم مساحتك. من الأبواب الفاخرة إلى الخزائن الجدارية والمكتبات، نستخدم أفضل أنواع الأخشاب لنضمن المتانة والجمال في كل قطعة ننتجها.",
    heroImage: carpentryCardBg,
    aboutImage: carpentryCardBg,
    gallery: [carpentryCardBg, portfolioMajlisClassic, aboutSlide3],
    subServices: [
      { id: "wooden-doors", title: "أبواب خشبية", items: [] },
      { id: "decor", title: "ديكورات خشبية ثابتة", items: [] },
      { id: "tv-units", title: "مكتبات التلفزيون", items: [] },
      { id: "cabinets", title: "خزائن الحائط", items: [] },
      { id: "bed-backs", title: "خلفيات السرير", items: [] },
      { id: "desks", title: "مكاتب العمل", items: [] }
    ],
    features: [
      { icon: "ShieldCheck", title: "أخشاب فاخرة", desc: "انتقاء أفضل أنواع الأخشاب الطبيعية والصناعية لضمان المتانة والجمال." },
      { icon: "PencilRuler", title: "تفصيل مخصص", desc: "تصنيع قطع فريدة تتناسب تماماً مع مساحتك وذوقك الخاص." },
      { icon: "Sparkles", title: "تشطيبات راقية", desc: "دهانات ومعالجات خشبية عالية الجودة تبرز جمال الخشب وتحميه." },
      { icon: "Clock", title: "التزام بالمواعيد", desc: "تسليم الأعمال الخشبية في الوقت المحدد مع الحفاظ على أعلى معايير الجودة." }
    ],
    process: [
      { step: "01", title: "الاستشارة والتصميم", desc: "فهم احتياجاتك وتقديم تصاميم أولية للقطع الخشبية المطلوبة." },
      { step: "02", title: "رفع المقاسات", desc: "زيارة الموقع لأخذ المقاسات الدقيقة واختيار نوع الخشب والتشطيب." },
      { step: "03", title: "التصنيع الحرفي", desc: "تنفيذ التصاميم في منجرتنا على أيدي حرفيين مهرة باستخدام معدات متطورة." },
      { step: "04", title: "التركيب النهائي", desc: "تركيب الأعمال الخشبية في الموقع بدقة واحترافية لضمان التكامل." }
    ]
  },
  "commercial-medical": {
    title: "المشاريع التجارية والطبية",
    subtitle: "Commercial & Medical Projects",
    description: "تصميم وتنفيذ المشاريع التجارية والطبية بمعايير عالمية تضمن الكفاءة التشغيلية وتجربة مستخدم مريحة.",
    about: "ندرك في قطاع المشاريع التجارية والطبية أهمية توفير بيئة عمل مريحة ومطابقة للاشتراطات الصحية والمهنية. نقدم خدمات متكاملة لتجهيز العيادات، المكاتب، والمعارض التجارية بأعلى معايير الجودة، مع التركيز على الاستغلال الأمثل للمساحات.",
    heroImage: commercialCardBg,
    aboutImage: commercialCardBg,
    gallery: [commercialCardBg, portfolioCorridorClassic, aboutSlide4],
    subServices: [
      { id: "offices", title: "تصميم وتنفيذ المكاتب والشركات", items: [] },
      { id: "shops", title: "المحلات والمعارض التجارية", items: [] },
      { id: "clinics", title: "العيادات والمشاريع الطبية", items: [] }
    ],
    features: [
      { icon: "PencilRuler", title: "استغلال المساحات", desc: "تصميم ذكي يعظم الاستفادة من المساحات لتحقيق الكفاءة التشغيلية." },
      { icon: "ShieldCheck", title: "معايير صحية", desc: "تنفيذ دقيق يطابق اشتراطات الأمن والسلامة للمعايير الصحية." },
      { icon: "Sparkles", title: "هوية بصرية متكاملة", desc: "تصاميم تعكس هوية علامتك التجارية وتوفر تجربة مميزة للعملاء." },
      { icon: "Clock", title: "إدارة احترافية", desc: "تنفيذ المشاريع ضمن الجدول الزمني والميزانية المحددة لضمان سرعة التشغيل." }
    ],
    process: [
      { step: "01", title: "دراسة المشروع", desc: "تحليل نشاطك التجاري أو الطبي لفهم المتطلبات التشغيلية والهوية البصرية." },
      { step: "02", title: "التصميم وتوزيع المساحات", desc: "إعداد مخططات تفصيلية تضمن سهولة الحركة والجماليات." },
      { step: "03", title: "التنفيذ المتكامل", desc: "تولي كافة أعمال التشطيب والتجهيز باحترافية ووفقاً للجدول الزمني." },
      { step: "04", title: "التسليم والتشغيل", desc: "تسليم المشروع جاهزاً بالكامل للبدء في استقبال عملائك بنجاح." }
    ]
  },
  "insulation-waterproofing": {
    title: "العزل والترميم الإنشائي",
    subtitle: "Waterproofing & Insulation",
    description: "حلول متقدمة للعوازل المائية والحرارية والترميم الإنشائي لضمان حماية وسلامة مبناك على المدى الطويل.",
    about: "قطاع العوازل والترميم الإنشائي يهدف إلى حماية المباني من العوامل الجوية وإطالة عمرها الافتراضي. نستخدم أحدث التقنيات في العزل المائي والحراري والصوتي، بالإضافة إلى أنظمة الإيبوكسي المتطورة، لضمان بيئة آمنة وصحية ومستدامة.",
    heroImage: insulationCardBg,
    aboutImage: insulationCardBg,
    gallery: [insulationCardBg, aboutImg, portfolioMajlisModern],
    subServices: [
      { id: "water", title: "العزل المائي", items: [] },
      { id: "roofs", title: "عزل الأسطح والأسقف", items: [] },
      { id: "tanks", title: "عزل خزانات المياه", items: [] },
      { id: "thermal", title: "العزل الحراري", items: [] },
      { id: "sound", title: "العزل الصوتي", items: [] },
      { id: "epoxy", title: "أنظمة الإيبوكسي", items: ["إيبوكسي صناعي", "إيبوكسي طبي", "إيبوكسي ديكوري"] },
      { id: "cracks", title: "ترميم ومعالجة التشققات", items: [] },
      { id: "facades", title: "ترميم الواجهات", items: [] },
      { id: "polishing", title: "جلي البلاط وتلميعه", items: [] }
    ],
    features: [
      { icon: "ShieldCheck", title: "حماية متكاملة", desc: "حلول عزل متطورة تحمي مبناك من تسربات المياه والحرارة." },
      { icon: "Sparkles", title: "مواد معتمدة", desc: "استخدام أحدث مواد العزل المطابقة للمواصفات العالمية." },
      { icon: "Clock", title: "استدامة وضمان", desc: "تنفيذ احترافي يطيل العمر الافتراضي للمبنى مع تقديم ضمانات." },
      { icon: "PencilRuler", title: "كفاءة وحرفية", desc: "فريق متخصص في معالجة التشققات والترميم الجذري للعيوب الإنشائية." }
    ],
    process: [
      { step: "01", title: "الفحص والاختبار", desc: "فحص المبنى لتحديد أماكن التسرب أو التشققات بدقة وتقييم الهيكل." },
      { step: "02", title: "اختيار الحل الأنسب", desc: "تحديد نوع العزل أو طريقة الترميم المناسبة وتقديم خطة عمل." },
      { step: "03", title: "التنفيذ والمعالجة", desc: "تطبيق مواد العزل أو أعمال الترميم بخطوات فنية مدروسة." },
      { step: "04", title: "الاختبار والتسليم", desc: "إجراء اختبارات نهائية للتأكد من فعالية العزل ومتانة الترميم قبل التسليم." }
    ]
  }
};

// التعريف الدقيق للقطاعات الخمسة الأساسية المطابقة 100% للموقع الحالي
const SECTORS_CONFIG = [
  {
    shortId: "interior",
    serviceId: "interior-design",
    defaultTitle: "الديكور الداخلي والتشطيبات",
    defaultSubtitle: "Interior Design & Fit-Out",
    icon: Layers,
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  {
    shortId: "aluminum",
    serviceId: "aluminum-facades",
    defaultTitle: "أعمال الألمنيوم والواجهات",
    defaultSubtitle: "Aluminum & Facades",
    icon: Building2,
    badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
  {
    shortId: "carpentry",
    serviceId: "custom-carpentry",
    defaultTitle: "النجارة والديكور الخشبي المخصص",
    defaultSubtitle: "Custom Carpentry",
    icon: Hammer,
    badgeColor: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  },
  {
    shortId: "commercial",
    serviceId: "commercial-medical",
    defaultTitle: "المشاريع التجارية والطبية",
    defaultSubtitle: "Commercial & Medical Projects",
    icon: Briefcase,
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  },
  {
    shortId: "construction",
    serviceId: "insulation-waterproofing",
    defaultTitle: "العزل والترميم الإنشائي",
    defaultSubtitle: "Waterproofing & Insulation",
    icon: ShieldCheck,
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },
];

const AVAILABLE_ICONS = ["ShieldCheck", "PencilRuler", "Clock", "Sparkles", "CheckCircle2"];

/**
 * دالة استخراج البيانات التلقائي من الموقع والدمج مع قاعدة البيانات الحالية
 * تضمن عدم فقدان أي حرف أو صورة أو مشروع موجود حالياً بالموقع
 */
function getSectorData(serviceId, pageConfig) {
  const customData = pageConfig?.serviceDetails?.[serviceId] || {};
  const defaultData = DEFAULT_SERVICE_DETAILS?.[serviceId] || {
    title: "عنوان القطاع",
    subtitle: "Service Sector",
    description: "",
    about: "",
    heroImage: "",
    aboutImage: "",
    gallery: [],
    subServices: [],
    features: [],
    process: [
      { step: "01", title: "المعاينة والاستشارة", desc: "" },
      { step: "02", title: "التصميم والتخطيط", desc: "" },
      { step: "03", title: "التنفيذ والإشراف", desc: "" },
      { step: "04", title: "التسليم النهائي", desc: "" },
    ],
  };

  const isInvalidImage = (img) => !img || typeof img !== "string" || img.trim() === "" || img.startsWith("/uploads/");

  const heroImage = isInvalidImage(customData.heroImage) ? defaultData.heroImage : customData.heroImage;
  const aboutImage = isInvalidImage(customData.aboutImage) ? defaultData.aboutImage : customData.aboutImage;

  const rawGallery = customData.gallery !== undefined && Array.isArray(customData.gallery) && customData.gallery.length > 0
    ? customData.gallery
    : (defaultData.gallery || []);

  const gallery = rawGallery.map(img => isInvalidImage(img) ? (defaultData.heroImage || img) : img);

  return {
    ...defaultData,
    ...customData,
    heroImage,
    aboutImage,
    gallery,
    subServices: customData.subServices !== undefined ? customData.subServices : (defaultData.subServices || []),
    features: customData.features !== undefined ? customData.features : (defaultData.features || []),
    process: customData.process !== undefined ? customData.process : (defaultData.process || []),
  };
}

export default function AdminServices() {
  const { pageConfig = {}, setEntirePageConfig } = useSiteData();

  // الحالة الرئيسية: null تعني عرض قائمة القطاعات الخمسة، قيمة معرف تعني فتح الصفحة الخاصة بالقطاع
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [editData, setEditData] = useState(null);

  // حالة إدارة الوسائط والمكتبة
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState(null);

  // تحديث البيانات المستخرجة عند فتح أي قطاع أو تغير الحالة العامة
  useEffect(() => {
    if (selectedSectorId) {
      setEditData(getSectorData(selectedSectorId, pageConfig));
    }
  }, [selectedSectorId, pageConfig?.serviceDetails]);

  // فتح صفحة إدارة القطاع المرتكزة
  const handleOpenSectorPage = (serviceId) => {
    setSelectedSectorId(serviceId);
    setEditData(getSectorData(serviceId, pageConfig));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // العودة إلى قائمة القطاعات
  const handleBackToHub = () => {
    setSelectedSectorId(null);
    setEditData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // حفظ ونشر التعديلات فوراً في قاعدة البيانات والموقع
  const handleSaveSector = (e) => {
    if (e) e.preventDefault();
    if (!selectedSectorId || !editData) return;

    const currentSectorConfig = SECTORS_CONFIG.find((s) => s.serviceId === selectedSectorId);
    const shortId = currentSectorConfig?.shortId;

    // تحديث تفاصيل الخدمة الفورية
    const newServiceDetails = {
      ...(pageConfig?.serviceDetails || {}),
      [selectedSectorId]: editData,
    };

    // مزامنة العنوان والصورة الرئيسية مع قائمة البطاقات العامة (servicesPage.sectors) إن وجدت
    const currentSectorsList = [...(pageConfig?.servicesPage?.sectors || [])];
    const sectorIdx = currentSectorsList.findIndex((s) => s.id === shortId);
    if (sectorIdx >= 0) {
      currentSectorsList[sectorIdx] = {
        ...currentSectorsList[sectorIdx],
        title: editData.title || currentSectorsList[sectorIdx].title,
        image: editData.heroImage || currentSectorsList[sectorIdx].image,
      };
    }

    setEntirePageConfig({
      serviceDetails: newServiceDetails,
      ...(sectorIdx >= 0
        ? { servicesPage: { ...(pageConfig?.servicesPage || {}), sectors: currentSectorsList } }
        : {}),
    });

    toast.success(
      `تم الحفظ بنجاح! نُقلت كافة بيانات وصور ومشاريع (${editData.title}) إلى قاعدة البيانات وظهرت في الموقع فوراً.`
    );
  };

  // معالجة اختيار أو رفع صورة جديدة من جهاز المستخدم أو المكتبة
  const handleImageSelected = (url) => {
    if (!mediaTarget || !editData) return;

    if (mediaTarget.type === "hero") {
      setEditData((prev) => ({ ...prev, heroImage: url }));
      toast.success("تم تحديث صورة الجزء العلوي (Hero) - اضغط حفظ لتنفيذ النشر");
    } else if (mediaTarget.type === "about") {
      setEditData((prev) => ({ ...prev, aboutImage: url }));
      toast.success("تم تحديث صورة النبذة (عن الخدمة) - اضغط حفظ لتنفيذ النشر");
    } else if (mediaTarget.type === "galleryAdd") {
      setEditData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), url],
      }));
      toast.success("تمت إضافة صورة مشروع منفذ جديد إلى القائمة بنجاح");
    } else if (mediaTarget.type === "galleryReplace" && typeof mediaTarget.index === "number") {
      setEditData((prev) => {
        const newG = [...(prev.gallery || [])];
        newG[mediaTarget.index] = url;
        return { ...prev, gallery: newG };
      });
      toast.success("تم استبدال صورة المشروع المنفذ بنجاح");
    }
    setMediaPickerOpen(false);
  };

  // معالجة إعادة ترتيب المشاريع (نقل أعلى / أسفل)
  const handleMoveProjectUp = (idx) => {
    if (idx <= 0 || !editData) return;
    const newGallery = [...(editData.gallery || [])];
    const temp = newGallery[idx - 1];
    newGallery[idx - 1] = newGallery[idx];
    newGallery[idx] = temp;
    setEditData((prev) => ({ ...prev, gallery: newGallery }));
    toast.success("تم تعديل ترتيب المشروع للأعلى (اضغط حفظ لاعتماد الترتيب الجديد بالموقع)");
  };

  const handleMoveProjectDown = (idx) => {
    if (!editData || idx >= (editData.gallery || []).length - 1) return;
    const newGallery = [...(editData.gallery || [])];
    const temp = newGallery[idx + 1];
    newGallery[idx + 1] = newGallery[idx];
    newGallery[idx] = temp;
    setEditData((prev) => ({ ...prev, gallery: newGallery }));
    toast.success("تم تعديل ترتيب المشروع للأسفل (اضغط حفظ لاعتماد الترتيب الجديد بالموقع)");
  };

  // معالجة حذف مشروع
  const handleDeleteProject = (idx) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا المشروع المنفذ من قائمة أعمال القطاع؟")) {
      setEditData((prev) => ({
        ...prev,
        gallery: (prev.gallery || []).filter((_, i) => i !== idx),
      }));
      toast.success("تم حذف المشروع من قائمة القطاع (اضغط حفظ لنشر التغيير فوراً)");
    }
  };

  // -------------------------------------------------------------------------
  // العرض الأول: الصفحة الرئيسية لإدارة الخدمات والقطاعات (خدماتنا) - شبكة القطاعات
  // -------------------------------------------------------------------------
  if (!selectedSectorId || !editData) {
    return (
      <div className="space-y-8" dir="rtl">
        {/* رأس القسم */}
        <div className="bg-[#111] border border-[#D4AF37]/40 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent rounded-full pointer-events-none -translate-x-20 -translate-y-20" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-extrabold px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <Layers size={16} />
              <span>إدارة المحتوى المباشرة — قسم خدماتنا</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              إدارة الخدمات والقطاعات (خدماتنا)
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-3xl leading-relaxed">
              هذا القسم هو المسؤول الوحيد والشامل عن إدارة كافة بيانات قسم <strong className="text-[#D4AF37]">"خدماتنا"</strong> بالموقع. تم استخراج جميع العناوين، النصوص، والمشاريع المنفذة الحالية تلقائياً من الموقع. اضغط على أي قطاع للدخول إلى صفحته الخاصة وتعديله بالكامل، وستنعكس التعديلات في الموقع فوراً بعد الحفظ.
            </p>
          </div>
        </div>

        {/* شبكة القطاعات الخمسة */}
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-[#D4AF37]" size={20} />
            <span>القطاعات الخمسة الأساسية في الموقع (اضغط على القطاع للإدارة والتعديل):</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS_CONFIG.map((sector, index) => {
              const currentData = getSectorData(sector.serviceId, pageConfig);
              const SectorIcon = sector.icon || Layers;
              const projectsCount = (currentData.gallery || []).length;

              return (
                <div
                  key={sector.serviceId}
                  onClick={() => handleOpenSectorPage(sector.serviceId)}
                  className="group bg-[#111] border border-white/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between"
                >
                  <div>
                    {/* الصورة الخلفية للبطاقة */}
                    <div className="aspect-[16/9] relative overflow-hidden bg-black">
                      {currentData.heroImage ? (
                        <SafeImage
                          src={currentData.heroImage}
                          alt={currentData.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] text-white/20">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                      
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center font-mono font-bold text-xs text-[#D4AF37]">
                          {index + 1}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-full border backdrop-blur-md ${sector.badgeColor}`}>
                          {projectsCount} مشاريع منفذة
                        </span>
                        <SectorIcon size={20} className="text-[#D4AF37]" />
                      </div>
                    </div>

                    {/* المحتوى والتفاصيل */}
                    <div className="p-6 space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {currentData.title || sector.defaultTitle}
                        </h3>
                        <p className="text-white/40 font-mono text-xs dir-ltr text-right">
                          {currentData.subtitle || sector.defaultSubtitle}
                        </p>
                      </div>

                      <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
                        {currentData.description || currentData.about || "لا يوجد وصف مختصر متاح لهذا القطاع."}
                      </p>
                    </div>
                  </div>

                  {/* زر الفتح وإدارة المحتوى */}
                  <div className="p-4 bg-black/60 border-t border-white/5 flex items-center justify-between group-hover:bg-[#D4AF37]/10 transition-colors">
                    <span className="font-display font-extrabold text-xs text-[#D4AF37] group-hover:underline">
                      فتح وإدارة بيانات هذا القطاع بالكامل
                    </span>
                    <ChevronRight size={18} className="text-[#D4AF37] transform group-hover:translate-x-1 transition-transform rotate-180" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // العرض الثاني: صفحة إدارة القطاع المرتكزة (تفتح خاصة بهذا القطاع فقط)
  // -------------------------------------------------------------------------
  const activeConfig = SECTORS_CONFIG.find((s) => s.serviceId === selectedSectorId);

  return (
    <div className="space-y-8 pb-16" dir="rtl">
      {/* شريط الإبحار العلوي في صفحة القطاع */}
      <div className="sticky top-0 z-40 bg-[#111]/95 backdrop-blur-md border border-[#D4AF37]/50 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToHub}
            type="button"
            className="bg-black hover:bg-white/10 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 shadow-sm hover:border-[#D4AF37]"
          >
            <ArrowRight size={18} className="text-[#D4AF37]" />
            <span>العودة لكافة القطاعات (خدماتنا)</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#D4AF37] font-bold">إدارة بيانات القطاع:</span>
            </div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {editData.title || activeConfig?.defaultTitle}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSaveSector}
          type="button"
          className="bg-[#D4AF37] hover:bg-[#C5A030] text-black font-extrabold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all shrink-0 text-sm scale-105 hover:scale-110"
        >
          <Save size={20} />
          <span>حفظ ونشر التعديلات فوراً بالموقع</span>
        </button>
      </div>

      <form onSubmit={handleSaveSector} className="space-y-8">
        {/* 1. القسم الأول: عناوين ونصوص أعلى الصفحة وصورة الخلفية (Hero Section) */}
        <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Info size={22} className="text-[#D4AF37]" />
            <h2 className="font-display font-bold text-lg text-white">
              أولاً: عناوين ونصوص أعلى الصفحة (Hero Section) وصورة الخلفية
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-white/80 mb-2">
                العنوان الرئيسي للقطاع (عربي) <span className="text-[#D4AF37]">*</span>:
              </label>
              <input
                type="text"
                required
                value={editData.title || ""}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full bg-black border border-[#D4AF37]/30 text-white rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#D4AF37] font-bold"
                placeholder="مثال: الديكور الداخلي والتشطيبات"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-white/80 mb-2">
                العنوان الفرعي أو الإنجليزي (Subtitle):
              </label>
              <input
                type="text"
                value={editData.subtitle || ""}
                onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                className="w-full bg-black border border-[#D4AF37]/30 text-white rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#D4AF37] font-mono dir-ltr text-right"
                placeholder="Interior Design & Fit-Out"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-white/80 mb-2">
              الوصف المختصر أعلى الصفحة (تحت العنوان مباشرة):
            </label>
            <textarea
              rows={3}
              value={editData.description || ""}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full bg-black border border-[#D4AF37]/30 text-white rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#D4AF37] leading-relaxed"
              placeholder="اكتب وصفاً مختصراً يظهر في واجهة صفحة هذا القطاع بالموقع..."
            />
          </div>

          {/* الصورة الرئيسية للقطاع */}
          <div className="p-5 bg-black/60 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/15 shrink-0">
                {editData.heroImage ? (
                  <SafeImage src={editData.heroImage} alt="hero" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    <ImageIcon size={28} />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-white block">صورة خلفية أعلى الصفحة (Hero Image)</span>
                <span className="text-xs text-white/50 leading-relaxed block">
                  تظهر كخلفية فاخرة في الجزء العلوي عند دخول الزائر لصفحة هذا القطاع، وكذلك كبطاقة للقطاع في قائمة الخدمات.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMediaTarget({ type: "hero" });
                setMediaPickerOpen(true);
              }}
              className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shrink-0 flex items-center gap-2 shadow-sm"
            >
              <ImageIcon size={16} />
              <span>{editData.heroImage ? "تغيير الصورة أو رفع جديدة" : "اختيار أو رفع صورة"}</span>
            </button>
          </div>
          <div className="mt-3">
            <label className="block text-[11px] font-bold text-white/60 mb-1">أو الصق رابط الصورة مباشرة:</label>
            <input
              type="text"
              value={typeof editData.heroImage === "string" && (editData.heroImage.startsWith("http") || editData.heroImage.startsWith("/uploads")) ? editData.heroImage : ""}
              onChange={(e) => {
                const url = e.target.value.trim();
                setEditData((prev) => ({ ...prev, heroImage: url }));
              }}
              className="w-full bg-black border border-white/15 text-white/80 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono dir-ltr text-right placeholder:text-white/25"
              placeholder="الصق رابط الصورة هنا مثل: https://... أو /uploads/..."
              dir="ltr"
            />
          </div>
        </div>

        {/* 2. القسم الثاني: النبذة التفصيلية عن الخدمة وصورتها التوضيحية (About Section) */}
        <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <FileText size={22} className="text-[#D4AF37]" />
            <h2 className="font-display font-bold text-lg text-white">
              ثانياً: النبذة التفصيلية عن الخدمة (قسم "عن الخدمة")
            </h2>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-white/80 mb-2">
              النص التعريفي والنبذة المفصلة عن خدمات هذا القطاع:
            </label>
            <textarea
              rows={5}
              value={editData.about || ""}
              onChange={(e) => setEditData({ ...editData, about: e.target.value })}
              className="w-full bg-black border border-[#D4AF37]/30 text-white rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37] leading-relaxed"
              placeholder="اكتب هنا التفاصيل الشاملة والنبذة التعريفية بالقطاع والمواد والأساليب المستخدمة..."
            />
          </div>

          <div className="p-5 bg-black/60 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/15 shrink-0">
                {editData.aboutImage ? (
                  <SafeImage src={editData.aboutImage} alt="about" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    <ImageIcon size={28} />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-white block">الصورة التوضيحية بجانب نص النبذة</span>
                <span className="text-xs text-white/50 leading-relaxed block">
                  تظهر بجانب النص التعريفي في منتصف صفحة القطاع في الموقع.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMediaTarget({ type: "about" });
                setMediaPickerOpen(true);
              }}
              className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shrink-0 flex items-center gap-2 shadow-sm"
            >
              <ImageIcon size={16} />
              <span>{editData.aboutImage ? "تغيير الصورة أو رفع جديدة" : "اختيار أو رفع صورة"}</span>
            </button>
          </div>
          <div className="mt-3">
            <label className="block text-[11px] font-bold text-white/60 mb-1">أو الصق رابط الصورة مباشرة:</label>
            <input
              type="text"
              value={typeof editData.aboutImage === "string" && (editData.aboutImage.startsWith("http") || editData.aboutImage.startsWith("/uploads")) ? editData.aboutImage : ""}
              onChange={(e) => {
                const url = e.target.value.trim();
                setEditData((prev) => ({ ...prev, aboutImage: url }));
              }}
              className="w-full bg-black border border-white/15 text-white/80 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono dir-ltr text-right placeholder:text-white/25"
              placeholder="الصق رابط الصورة هنا مثل: https://... أو /uploads/..."
              dir="ltr"
            />
          </div>
        </div>

        {/* 3. القسم الثالث: معرض المشاريع المنفذة الخاصة بهذا القطاع */}
        <div className="bg-[#111] border border-[#D4AF37]/50 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
            <div>
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Camera className="text-[#D4AF37]" size={24} />
                <span>ثالثاً: إدارة المشاريع المنفذة وصور أعمالنا الخاصة بهذا القطاع</span>
              </h2>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                تظهر هذه الصور في قسم <strong className="text-white">"أعمالنا تتحدث عنا"</strong> بصفحة هذا القطاع. يمكنك إضافة مشاريع جديدة، حذف المشاريع، استبدال الصور، وتعديل الترتيب كما تشاء.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMediaTarget({ type: "galleryAdd" });
                setMediaPickerOpen(true);
              }}
              className="bg-[#D4AF37] hover:bg-[#C5A030] text-black font-extrabold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-all text-xs sm:text-sm shrink-0 scale-105 hover:scale-110"
            >
              <Plus size={20} />
              <span>إضافة مشروع منفذ جديد</span>
            </button>
          </div>

          {(!editData.gallery || editData.gallery.length === 0) ? (
            <div className="text-center py-14 border-2 border-dashed border-white/20 rounded-2xl bg-black/50 space-y-3">
              <Camera size={48} className="text-white/20 mx-auto" />
              <p className="text-white/70 text-base font-bold">لا توجد صور مشاريع منفذة مضافة لهذا القطاع بعد.</p>
              <p className="text-white/40 text-xs">
                اضغط على زر "إضافة مشروع منفذ جديد" بالأعلى لرفع صور من جهازك أو اختيارها من المكتبة.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {editData.gallery.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  className="bg-black border border-white/15 rounded-2xl overflow-hidden group shadow-lg hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#111]">
                      <SafeImage
                        src={imgUrl}
                        alt={`project_${gIdx}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#D4AF37] text-xs font-extrabold px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                        مشروع منفذ #{gIdx + 1}
                      </div>
                    </div>
                  </div>

                  {/* أزرار التحكم بالمشروع (استبدال، ترتيب فوق/تحت، حذف) */}
                  <div className="p-3 bg-[#151515] border-t border-white/10 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget({ type: "galleryReplace", index: gIdx });
                        setMediaPickerOpen(true);
                      }}
                      className="w-full py-2.5 px-3 bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Edit2 size={15} />
                      <span>استبدال / تعديل الصورة</span>
                    </button>

                    <div>
                      <input
                        type="text"
                        value={typeof imgUrl === "string" && (imgUrl.startsWith("http") || imgUrl.startsWith("/uploads")) ? imgUrl : ""}
                        onChange={(e) => {
                          const url = e.target.value.trim();
                          setEditData((prev) => {
                            const newG = [...(prev.gallery || [])];
                            newG[gIdx] = url;
                            return { ...prev, gallery: newG };
                          });
                        }}
                        className="w-full bg-black border border-white/15 text-white/80 rounded-xl p-2 text-[11px] focus:outline-none focus:border-[#D4AF37] font-mono dir-ltr text-right placeholder:text-white/25"
                        placeholder="الصق رابط الصورة هنا..."
                        dir="ltr"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 flex-1">
                        <button
                          type="button"
                          disabled={gIdx === 0}
                          onClick={() => handleMoveProjectUp(gIdx)}
                          className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all border ${
                            gIdx === 0
                              ? "bg-black text-white/20 border-white/5 cursor-not-allowed"
                              : "bg-black hover:bg-white/10 text-white/80 border-white/15 hover:border-[#D4AF37]/50"
                          }`}
                          title="نقل المشروع للأعلى في الترتيب"
                        >
                          <ArrowUp size={14} />
                          <span>أعلى</span>
                        </button>
                        <button
                          type="button"
                          disabled={gIdx === (editData.gallery || []).length - 1}
                          onClick={() => handleMoveProjectDown(gIdx)}
                          className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all border ${
                            gIdx === (editData.gallery || []).length - 1
                              ? "bg-black text-white/20 border-white/5 cursor-not-allowed"
                              : "bg-black hover:bg-white/10 text-white/80 border-white/15 hover:border-[#D4AF37]/50"
                          }`}
                          title="نقل المشروع للأسفل في الترتيب"
                        >
                          <span>أسفل</span>
                          <ArrowDown size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(gIdx)}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all border border-red-500/20 hover:border-transparent shrink-0"
                        title="حذف هذا المشروع"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. القسم الرابع: مجالات الاختصاص والتطبيقات */}
        <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <ListCheck className="text-[#D4AF37]" size={22} />
                <span>رابعاً: مجالات الاختصاص والتطبيقات (الخدمات الفرعية بصفحة القطاع)</span>
              </h2>
              <p className="text-white/50 text-xs mt-1">
                الصناديق التخصصية التي تظهر تحت عنوان "مجالات اختصاصنا" في صفحة القطاع.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newSubs = [...(editData.subServices || [])];
                newSubs.push({
                  id: `sub_${Date.now()}`,
                  title: "مجال اختصاص جديد",
                  items: ["بند أول", "بند ثاني"],
                });
                setEditData({ ...editData, subServices: newSubs });
                toast.success("تمت إضافة صندوق مجال اختصاص جديد");
              }}
              className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shrink-0"
            >
              <Plus size={16} />
              <span>إضافة مجال اختصاص جديد</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(editData.subServices || []).map((sub, sIdx) => (
              <div key={sub.id || sIdx} className="p-5 bg-black border border-white/10 rounded-2xl space-y-4 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span className="text-xs font-extrabold text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    مجال الاختصاص #{sIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newSubs = (editData.subServices || []).filter((_, i) => i !== sIdx);
                      setEditData({ ...editData, subServices: newSubs });
                      toast.success("تم حذف مجال الاختصاص");
                    }}
                    className="text-white/40 hover:text-red-400 p-1 transition-colors"
                    title="حذف هذا المجال"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-white/80 mb-1.5 font-bold">عنوان المجال:</label>
                  <input
                    type="text"
                    value={sub.title || ""}
                    onChange={(e) => {
                      const newSubs = [...(editData.subServices || [])];
                      newSubs[sIdx] = { ...newSubs[sIdx], title: e.target.value };
                      setEditData({ ...editData, subServices: newSubs });
                    }}
                    className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#D4AF37]"
                    placeholder="مثال: الأسقف المعلقة والديكورية"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/80 mb-1.5 font-bold">
                    البنود والتطبيقات (افصل بين كل بند وفاصلة عربية ، أو أجنبية ,):
                  </label>
                  <input
                    type="text"
                    value={(sub.items || []).join(" ، ")}
                    onChange={(e) => {
                      const val = e.target.value;
                      const itemsArr = val
                        .split(/،|,/)
                        .map((x) => x.trim())
                        .filter(Boolean);
                      const newSubs = [...(editData.subServices || [])];
                      newSubs[sIdx] = { ...newSubs[sIdx], items: itemsArr };
                      setEditData({ ...editData, subServices: newSubs });
                    }}
                    className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#D4AF37]"
                    placeholder="جبسمبورد ، جبس مغربي ، إضاءات مخفية"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. القسم الخامس: مميزات وخصائص الخدمة (Why Choose Us) */}
        <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="text-[#D4AF37]" size={22} />
                <span>خامساً: مميزات وخصائص الخدمة (لماذا تختار خدماتنا؟)</span>
              </h2>
              <p className="text-white/50 text-xs mt-1">
                المميزات الأربعة التي تعرض معايير الجودة والاحترافية في صفحة هذا القطاع.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFeat = [...(editData.features || [])];
                newFeat.push({
                  icon: "ShieldCheck",
                  title: "ميزة إضافية",
                  desc: "وصف الميزة ومستوى الجودة المطبق...",
                });
                setEditData({ ...editData, features: newFeat });
                toast.success("تمت إضافة ميزة جديدة");
              }}
              className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shrink-0"
            >
              <Plus size={16} />
              <span>إضافة ميزة جديدة</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(editData.features || []).map((feat, fIdx) => {
              const iconName = typeof feat.icon === "string" ? feat.icon : "ShieldCheck";

              return (
                <div key={fIdx} className="p-4 bg-black border border-white/10 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#D4AF37]">ميزة #{fIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFeat = (editData.features || []).filter((_, i) => i !== fIdx);
                          setEditData({ ...editData, features: newFeat });
                          toast.success("تم حذف الميزة");
                        }}
                        className="text-white/40 hover:text-red-400 transition-colors"
                        title="حذف الميزة"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/70 mb-1 font-bold">اسم الأيقونة البرمجية:</label>
                      <select
                        value={iconName}
                        onChange={(e) => {
                          const newFeat = [...(editData.features || [])];
                          newFeat[fIdx] = { ...newFeat[fIdx], icon: e.target.value };
                          setEditData({ ...editData, features: newFeat });
                        }}
                        className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] dir-ltr text-right font-mono"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/70 mb-1 font-bold">عنوان الميزة:</label>
                      <input
                        type="text"
                        value={feat.title || ""}
                        onChange={(e) => {
                          const newFeat = [...(editData.features || [])];
                          newFeat[fIdx] = { ...newFeat[fIdx], title: e.target.value };
                          setEditData({ ...editData, features: newFeat });
                        }}
                        className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-white/70 mb-1 font-bold">وصف الميزة:</label>
                      <textarea
                        rows={3}
                        value={feat.desc || ""}
                        onChange={(e) => {
                          const newFeat = [...(editData.features || [])];
                          newFeat[fIdx] = { ...newFeat[fIdx], desc: e.target.value };
                          setEditData({ ...editData, features: newFeat });
                        }}
                        className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. القسم السادس: مراحل تنفيذ الخدمة (Process Steps) */}
        <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Settings className="text-[#D4AF37]" size={22} />
                <span>سادساً: مراحل تنفيذ الخدمة (Process Steps)</span>
              </h2>
              <p className="text-white/50 text-xs mt-1">
                خطوات ومراحل العمل الأربعة المنهجية المعروضة في أسفل صفحة القطاع.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newProc = [...(editData.process || [])];
                newProc.push({
                  step: `0${newProc.length + 1}`,
                  title: "مرحلة عمل جديدة",
                  desc: "وصف الإجراءات المتبعة في هذه المرحلة...",
                });
                setEditData({ ...editData, process: newProc });
                toast.success("تمت إضافة مرحلة تنفيذ جديدة");
              }}
              className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shrink-0"
            >
              <Plus size={16} />
              <span>إضافة مرحلة تنفيذ</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(editData.process || []).map((step, stIdx) => (
              <div key={stIdx} className="p-4 bg-black border border-white/10 rounded-2xl space-y-3 shadow-md relative">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={step.step || `0${stIdx + 1}`}
                    onChange={(e) => {
                      const newProc = [...(editData.process || [])];
                      newProc[stIdx] = { ...newProc[stIdx], step: e.target.value };
                      setEditData({ ...editData, process: newProc });
                    }}
                    className="w-14 h-10 bg-[#111] border border-[#D4AF37]/50 text-[#D4AF37] text-center font-bold text-sm rounded-xl focus:outline-none font-mono"
                    title="رقم أو رمز المرحلة"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newProc = (editData.process || []).filter((_, i) => i !== stIdx);
                      setEditData({ ...editData, process: newProc });
                      toast.success("تم حذف المرحلة");
                    }}
                    className="text-white/40 hover:text-red-400 p-1 transition-colors"
                    title="حذف المرحلة"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1 font-bold">عنوان المرحلة:</label>
                  <input
                    type="text"
                    value={step.title || ""}
                    onChange={(e) => {
                      const newProc = [...(editData.process || [])];
                      newProc[stIdx] = { ...newProc[stIdx], title: e.target.value };
                      setEditData({ ...editData, process: newProc });
                    }}
                    className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1 font-bold">وصف المرحلة:</label>
                  <textarea
                    rows={3}
                    value={step.desc || ""}
                    onChange={(e) => {
                      const newProc = [...(editData.process || [])];
                      newProc[stIdx] = { ...newProc[stIdx], desc: e.target.value };
                      setEditData({ ...editData, process: newProc });
                    }}
                    className="w-full bg-[#111] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ الكبير في أسفل الصفحة */}
        <div className="p-6 sm:p-8 bg-[#151515] border border-[#D4AF37]/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <span className="font-display font-extrabold text-lg text-white block">
              هل انتهيت من تعديل بيانات ({editData.title})؟
            </span>
            <span className="text-xs sm:text-sm text-white/70 leading-relaxed block">
              اضغط على زر الحفظ والنشر ليتم التحديث في قاعدة البيانات وانعكاس النصوص والمشاريع بالموقع فوراً دون الحاجة لتحديث الصفحة.
            </span>
          </div>
          <button
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#C5A030] text-black font-extrabold px-10 py-4 rounded-xl text-base transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] flex items-center justify-center gap-3 shrink-0 scale-105 hover:scale-110 w-full sm:w-auto"
          >
            <Check size={24} />
            <span>حفظ ونشر التعديلات فوراً بالموقع</span>
          </button>
        </div>
      </form>

      {/* نافذة اختيار أو رفع الوسائط والصور */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelectImage={handleImageSelected}
      />
    </div>
  );
}
