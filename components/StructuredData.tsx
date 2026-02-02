'use client'

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite schema
      {
        '@type': 'WebSite',
        '@id': 'https://fitmateo.cz/#website',
        url: 'https://fitmateo.cz/',
        name: 'FitMateo - BMI Kalkulačka',
        description: 'Profesionální BMI kalkulačka online zdarma. Vypočítejte si Body Mass Index a zjistěte svou ideální váhu.',
        inLanguage: 'cs-CZ',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://fitmateo.cz/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // WebPage schema
      {
        '@type': 'WebPage',
        '@id': 'https://fitmateo.cz/#webpage',
        url: 'https://fitmateo.cz/',
        name: 'BMI Kalkulačka Online | Vypočítejte si Body Mass Index zdarma',
        isPartOf: { '@id': 'https://fitmateo.cz/#website' },
        description: 'Vypočítejte si svůj BMI index jednoduše a rychle. Zjistěte, zda máte ideální váhu.',
        inLanguage: 'cs-CZ',
      },
      // SoftwareApplication schema - pro kalkulačku
      {
        '@type': 'SoftwareApplication',
        name: 'BMI Kalkulačka',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CZK',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
      },
      // FAQ schema
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Co je BMI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BMI (Body Mass Index) neboli Index tělesné hmotnosti je číslo vypočítané z vaší váhy a výšky. Je to spolehlivý ukazatel množství tuku v těle a slouží k screeningu váhových kategorií, které mohou vést ke zdravotním problémům.',
            },
          },
          {
            '@type': 'Question',
            name: 'Jaký je vzorec pro výpočet BMI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BMI se vypočítá vydělením vaší hmotnosti v kilogramech druhou mocninou vaší výšky v metrech: BMI = hmotnost (kg) / [výška (m)]². Například: Osoba vážící 70 kg a měřící 175 cm: BMI = 70 / (1,75)² = 22,9',
            },
          },
          {
            '@type': 'Question',
            name: 'Jaká je ideální váha?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Termín „ideální váha" oficiálně neexistuje, ale při hodnotách BMI v rozmezí 18,5–24,9 je vaše tělesná váha v intervalu, který nazýváme jako optimální váha vzhledem k vaší výšce. V tomto rozmezí je nejnižší riziko zdravotních komplikací spojených s váhou.',
            },
          },
          {
            '@type': 'Question',
            name: 'Je BMI přesné pro všechny?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BMI je dobrým ukazatelem pro většinu lidí, ale není dokonalé. Nerozlišuje mezi svalovou hmotou a tukem. Sportovci s velkým množstvím svalů mohou mít vysoké BMI, ačkoli mají nízké procento tělesného tuku.',
            },
          },
          {
            '@type': 'Question',
            name: 'Jaký je rozdíl mezi nadváhou a obezitou?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nadváha je stav, kdy BMI je mezi 25 a 29,9. Jedná se o mírné překročení optimální váhy s mírně zvýšeným zdravotním rizikem. Obezita začíná při BMI 30 a více a představuje významnější zdravotní riziko.',
            },
          },
        ],
      },
      // BreadcrumbList schema
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Domů',
            item: 'https://fitmateo.cz/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'BMI Kalkulačka',
            item: 'https://fitmateo.cz/',
          },
        ],
      },
      // Organization schema
      {
        '@type': 'Organization',
        '@id': 'https://fitmateo.cz/#organization',
        name: 'FitMateo',
        url: 'https://fitmateo.cz/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://fitmateo.cz/logo.png',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
