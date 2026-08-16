import { Lang } from '../../core/services/language.service';

export interface Step {
  title: string;
  description: string;
}

export interface FeatureCard {
  title: string;
  description: string;
}

export interface LandingCopy {
  nav: {
    home: string;
    howItWorks: string;
    app: string;
    dashboard: string;
    api: string;
    coverage: string;
    login: string;
  };
  hero: {
    coveragePill: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  download: {
    eyebrow: string;
    cta: string;
    androidOnly: string;
    iosNote: string;
    versionLabel: string;
  };
  steps: {
    heading: string;
    subheading: string;
    items: readonly Step[];
  };
  app: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: readonly FeatureCard[];
    sampleLabel: string;
    samplePest: string;
    sampleRecommendationEn: string;
    sampleRecommendationTl: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: readonly FeatureCard[];
    cta: string;
  };
  api: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
  };
  coverage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    municipalities: readonly string[];
    note: string;
  };
  footer: {
    tagline: string;
    rights: string;
    login: string;
  };
}

export const LANDING_COPY: Record<Lang, LandingCopy> = {
  en: {
    nav: {
      home: 'SmartPest',
      howItWorks: 'How it works',
      app: 'Mobile App',
      dashboard: 'Dashboard',
      api: 'Open API',
      coverage: 'Coverage',
      login: 'Technician Login',
    },
    hero: {
      coveragePill: 'Serving Tiaong & Candelaria, Quezon',
      title: 'Spot the pest. Save the plant. No login needed.',
      subtitle:
        'Take a photo of an affected leaf or plant and get an instant pest identification with elimination recommendations in English and Tagalog — free, no account required.',
      ctaPrimary: 'Learn how it works',
      ctaSecondary: 'Technician? Sign in',
    },
    download: {
      eyebrow: 'Mobile App',
      cta: 'Download for Android',
      androidOnly: 'Android only, for now',
      iosNote: 'iOS isn’t available yet — Android is where we’re starting.',
      versionLabel: 'Version',
    },
    steps: {
      heading: 'How it works',
      subheading: 'From photo to recommendation in four simple steps — anyone can use it, no account needed.',
      items: [
        {
          title: 'Capture a photo',
          description: 'Point your phone camera at the affected leaf or plant and take a photo. No sign-up required.',
        },
        {
          title: 'Wait for identification',
          description: 'Our pest identification model analyzes the image and identifies the pest affecting your plant.',
        },
        {
          title: 'Get a bilingual recommendation',
          description: 'Receive clear elimination steps in both English and Tagalog, written for home and farm use.',
        },
        {
          title: 'Auto-synced to the dashboard',
          description: 'Every result is automatically pushed to the web dashboard so technicians can track pest activity nearby.',
        },
      ],
    },
    app: {
      eyebrow: 'Mobile App',
      title: 'A pest-identification app anyone can use, no login required',
      subtitle:
        'Built for farmers, gardeners, and households in Tiaong and Candelaria, Quezon — open the app and start identifying pests right away.',
      features: [
        { title: 'No account required', description: 'Open the app and start capturing photos immediately — nothing to sign up for.' },
        { title: 'Image capture', description: 'Photograph affected leaves or plants directly from your device camera or gallery.' },
        { title: 'Pest identification', description: 'Wait a moment while the pest affecting your plant is identified.' },
        { title: 'Bilingual recommendations', description: 'Elimination steps are shown in English and Tagalog, side by side.' },
        { title: 'Automatic dashboard sync', description: 'Every identification is pushed to the web dashboard for technicians to monitor, automatically.' },
      ],
      sampleLabel: 'Sample recommendation',
      samplePest: 'Detected: Aphids (Kuto ng Halaman)',
      sampleRecommendationEn:
        'Spray affected leaves with a mild soap-and-water solution every 3 days. Remove heavily infested leaves and encourage natural predators like ladybugs.',
      sampleRecommendationTl:
        'Wisikan ang apektadong dahon ng bahagyang sabon at tubig kada 3 araw. Alisin ang mga dahong sobrang apektado at hayaan ang mga natural na kaaway nito tulad ng ladybug.',
    },
    dashboard: {
      eyebrow: 'Web Dashboard',
      title: 'Built for technicians monitoring pest activity',
      subtitle:
        'Sign in to see which insects are showing up where, manage the identification dataset, and keep the model improving.',
      features: [
        { title: 'Technician login', description: 'A secured sign-in for technicians and staff — the public app stays login-free.' },
        { title: 'Local pest monitoring', description: 'See which insects are commonly detected in Tiaong and Candelaria, mapped by location.' },
        { title: 'Dataset management', description: 'Review, label, and curate submitted images to keep improving pest identification.' },
        { title: 'Automatic intake', description: 'Every mobile app detection arrives on the dashboard automatically — no manual entry.' },
      ],
      cta: 'Technician Login',
    },
    api: {
      eyebrow: 'Open API',
      title: 'Open data on insect activity, by barangay',
      subtitle:
        'Pest detection data collected from the app is made available through an open API, broken down per barangay — useful for local government units, researchers, and agricultural extension workers.',
      note: 'Example response shape — endpoint availability will be announced separately.',
    },
    coverage: {
      eyebrow: 'Coverage',
      title: 'Currently serving two municipalities in Quezon',
      subtitle: 'SmartPest is focused on doing right by these communities first, before expanding elsewhere.',
      municipalities: ['Tiaong, Quezon', 'Candelaria, Quezon'],
      note: 'Pest identification and recommendations are tuned for crops and pests common to these areas.',
    },
    footer: {
      tagline: 'Intelligent pest detection and management for Tiaong & Candelaria, Quezon.',
      rights: 'All rights reserved.',
      login: 'Technician Login',
    },
  },
  tl: {
    nav: {
      home: 'SmartPest',
      howItWorks: 'Paano ito gumagana',
      app: 'Mobile App',
      dashboard: 'Dashboard',
      api: 'Open API',
      coverage: 'Saklaw',
      login: 'Technician Login',
    },
    hero: {
      coveragePill: 'Naglilingkod sa Tiaong at Candelaria, Quezon',
      title: 'Kilalanin ang peste. Iligtas ang halaman. Walang kailangang login.',
      subtitle:
        'Kumuha ng litrato ng apektadong dahon o halaman at agad na malalaman ang klase ng peste kasama ang rekomendasyon para maalis ito, sa English at Tagalog — libre, walang account na kailangan.',
      ctaPrimary: 'Tingnan kung paano ito gumagana',
      ctaSecondary: 'Technician? Mag-sign in',
    },
    download: {
      eyebrow: 'Mobile App',
      cta: 'I-download para sa Android',
      androidOnly: 'Android muna sa ngayon',
      iosNote: 'Wala pa sa iOS — sa Android muna kami nagsisimula.',
      versionLabel: 'Bersyon',
    },
    steps: {
      heading: 'Paano ito gumagana',
      subheading: 'Mula sa litrato hanggang sa rekomendasyon sa apat na simpleng hakbang — kahit sino puwedeng gumamit, walang account na kailangan.',
      items: [
        {
          title: 'Kumuha ng litrato',
          description: 'I-point lang ang camera ng phone mo sa apektadong dahon o halaman at kumuha ng litrato. Walang sign-up na kailangan.',
        },
        {
          title: 'Hintayin ang resulta',
          description: 'Susuriin ng aming pest identification model ang litrato at tutukuyin kung anong peste ang umaatake sa iyong halaman.',
        },
        {
          title: 'Makatanggap ng bilingual na rekomendasyon',
          description: 'Makakakuha ka ng malinaw na hakbang para maalis ang peste, nasa English at Tagalog, angkop para sa bahay at bukid.',
        },
        {
          title: 'Awtomatikong isa-sync sa dashboard',
          description: 'Bawat resulta ay awtomatikong ipapadala sa web dashboard para masubaybayan ng mga technician ang pest activity sa lugar.',
        },
      ],
    },
    app: {
      eyebrow: 'Mobile App',
      title: 'Isang pest-identification app na kahit sino puwedeng gamitin, walang login',
      subtitle:
        'Ginawa para sa mga magsasaka, tagahalaman, at pamilya sa Tiaong at Candelaria, Quezon — buksan lang ang app at simulan nang kilalanin ang mga peste.',
      features: [
        { title: 'Walang account na kailangan', description: 'Buksan lang ang app at agad nang makakuha ng litrato — walang sign-up na kinakailangan.' },
        { title: 'Pagkuha ng litrato', description: 'Kunan ng litrato ang apektadong dahon o halaman gamit ang camera o gallery ng iyong device.' },
        { title: 'Pest identification', description: 'Maghintay lamang habang tinutukoy kung anong peste ang umaatake sa iyong halaman.' },
        { title: 'Bilingual na rekomendasyon', description: 'Ang mga hakbang para maalis ang peste ay ipapakita sa English at Tagalog, magkatabi.' },
        { title: 'Awtomatikong dashboard sync', description: 'Bawat resulta ng pagkilala ay awtomatikong ipinapadala sa web dashboard para sa mga technician.' },
      ],
      sampleLabel: 'Halimbawang rekomendasyon',
      samplePest: 'Natukoy: Aphids (Kuto ng Halaman)',
      sampleRecommendationEn:
        'Spray affected leaves with a mild soap-and-water solution every 3 days. Remove heavily infested leaves and encourage natural predators like ladybugs.',
      sampleRecommendationTl:
        'Wisikan ang apektadong dahon ng bahagyang sabon at tubig kada 3 araw. Alisin ang mga dahong sobrang apektado at hayaan ang mga natural na kaaway nito tulad ng ladybug.',
    },
    dashboard: {
      eyebrow: 'Web Dashboard',
      title: 'Ginawa para sa mga technician na nagmomonitor ng pest activity',
      subtitle:
        'Mag-sign in para makita kung aling mga insekto ang lumalabas sa bawat lugar, pamahalaan ang dataset ng identification, at patuloy na pagbutihin ang model.',
      features: [
        { title: 'Technician login', description: 'Isang secured sign-in para sa mga technician at staff — manatiling walang login ang public app.' },
        { title: 'Lokal na pest monitoring', description: 'Tingnan kung aling mga insekto ang karaniwang natutukoy sa Tiaong at Candelaria, naka-mapa ayon sa lokasyon.' },
        { title: 'Dataset management', description: 'Suriin, i-label, at pangasiwaan ang mga isinumiteng litrato upang patuloy na mapabuti ang pest identification.' },
        { title: 'Awtomatikong pagtanggap', description: 'Bawat detection mula sa mobile app ay awtomatikong dumarating sa dashboard — walang manual entry.' },
      ],
      cta: 'Technician Login',
    },
    api: {
      eyebrow: 'Open API',
      title: 'Bukas na datos ng pest activity, ayon sa barangay',
      subtitle:
        'Ang pest detection data na nakalap mula sa app ay ginagawang available sa pamamagitan ng open API, hinahati-hati ayon sa barangay — kapaki-pakinabang para sa mga LGU, researcher, at agricultural extension workers.',
      note: 'Halimbawang response shape lamang — atin pang aabisuhan ang availability ng endpoint.',
    },
    coverage: {
      eyebrow: 'Saklaw',
      title: 'Kasalukuyang naglilingkod sa dalawang bayan sa Quezon',
      subtitle: 'Pinagtutuunan muna ng SmartPest ang mga komunidad na ito bago palawakin sa ibang lugar.',
      municipalities: ['Tiaong, Quezon', 'Candelaria, Quezon'],
      note: 'Ang pest identification at rekomendasyon ay iniangkop sa mga pananim at pestehong karaniwan sa mga lugar na ito.',
    },
    footer: {
      tagline: 'Matalinong pest detection at management para sa Tiaong at Candelaria, Quezon.',
      rights: 'Lahat ng karapatan ay nakalaan.',
      login: 'Technician Login',
    },
  },
};
