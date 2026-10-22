/**
 * Reusable JSON-LD structured data components.
 * All render server-side as <script type="application/ld+json"> tags.
 */

export function JobPostingJsonLd({ job, slug }) {
  const datePosted = job.created_at
    ? new Date(job.created_at).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description:
      job.description ||
      `${job.title} recruitment notification by ${job.org}. Check eligibility, vacancies, salary and apply online.`,
    datePosted,
    validThrough: job.last_date || "",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.org,
      sameAs: job.official_link || "https://www.sarkarisuccess.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "All India",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 25500,
        maxValue: 151100,
        unitText: "MONTH",
      },
    },
    educationRequirements: "Bachelor's Degree",
    experienceRequirements: "Freshers eligible",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HomepageJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sarkari Success",
    url: "https://www.sarkarisuccess.com",
    description:
      "India's First AI-Powered Sarkari Career Companion. Latest government job notifications, results, admit cards for SSC, Railway, UPSC, Banking & State PSC.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.sarkarisuccess.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarkari Success",
    url: "https://www.sarkarisuccess.com",
    logo: "https://www.sarkarisuccess.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact.sarkarisuccess@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://t.me/sarkarisuccess",
      "https://www.youtube.com/@sarkarisuccess",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}

export function ArticleJsonLd({ title, description, url, datePublished, dateModified, authorName }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName || "Sarkari Success Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Sarkari Success",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sarkarisuccess.com/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
