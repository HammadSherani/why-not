interface PolicySection {
  title: string;
  intro: string;
  items?: string[];
  outro?: string;
}

const sections: PolicySection[] = [
  {
    title: "1. Introduction",
    intro:
      "WhyNot is committed to protecting your privacy and personal data. This policy explains how we comply with the General Data Protection Regulation (GDPR) and other applicable privacy laws.",
  },
  {
    title: "2. Information We Collect",
    intro: "We collect the following types of information:",
    items: [
      "Personal Information: Name, email address, username, age, profile picture, and contact details.",
      "Plan Information: Plans you create or join, preferences, and activity within plans.",
      "Technical Information: IP address, browser type, device information, and usage data.",
      "Payment Information: If you make payments, we collect payment-related information via our secure third-party providers.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    intro: "We use your information to:",
    items: [
      "Provide and maintain our services.",
      "Enable you to create, discover, and join plans.",
      "Communicate with you about your account and plans.",
      "Improve our platform, personalize your experience, and ensure safety.",
      "Comply with legal obligations and enforce our terms.",
    ],
  },
  {
    title: "4. Legal Basis for Processing (GDPR)",
    intro: "We process your personal data based on the following legal grounds:",
    items: [
      "Consent: When you give us explicit consent.",
      "Contract: To provide our services and fulfill our contractual obligations.",
      "Legitimate Interests: To improve security, prevent fraud, and enhance user experience.",
      "Legal Obligation: To comply with applicable laws and regulations.",
    ],
  },
  {
    title: "5. Information Sharing",
    intro: "We do not sell your personal data. We may share your information:",
    items: [
      "With service providers who help us operate our platform, such as hosting, analytics, and payment processors.",
      "When required by law or to protect our rights, safety, or property.",
      "With other users, only information you choose to share within your plans.",
    ],
  },
  {
    title: "6. Cookies & Tracking Technologies",
    intro: "We use cookies and similar technologies to:",
    items: ["Ensure the platform works properly.", "Remember your preferences and settings.", "Analyze usage and improve our services."],
    outro: "You can manage your cookie preferences in your browser settings.",
  },
  {
    title: "7. Data Retention",
    intro:
      "We retain your personal data only as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.",
  },
  {
    title: "8. Your Privacy Rights (GDPR)",
    intro: "Depending on your location, you may have the right to:",
    items: [
      "Access your personal data.",
      "Correct inaccurate information.",
      "Request deletion of your data.",
      "Restrict or object to certain processing.",
      "Request a copy of your data.",
      "Withdraw consent at any time.",
    ],
  },
  {
    title: "9. Data Security",
    intro:
      "We use reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse, loss, alteration, or disclosure.",
  },
  {
    title: "10. International Data Transfers",
    intro:
      "Your information may be processed or stored in countries outside your country of residence. Where required, we use appropriate safeguards to protect your personal information during international transfers.",
  },
  {
    title: "11. Children's Privacy",
    intro:
      "WhyNot is not intended for children under the minimum legal age required to use our platform. We do not knowingly collect personal information from children without appropriate authorization.",
  },
  {
    title: "12. Changes to This Policy",
    intro:
      "We may update this Privacy Policy from time to time. If we make significant changes, we may notify you through the platform or by email.",
  },
  {
    title: "13. Contact Us",
    intro:
      "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-black/60 dark:text-white/60">
        Your privacy is important to us. This Privacy Policy explains how WhyNot (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;) collects, uses, shares, and protects your information when you use our platform.
      </p>

      <div className="mt-6 max-w-3xl">
        <h2 className="text-base font-semibold">Last updated: August 8, 2026</h2>
        <p className="mt-1.5 text-sm leading-6 text-black/60 dark:text-white/60">
          This Privacy Policy applies to all users of WhyNot, including visitors, registered users, and plan
          creators.
        </p>
      </div>

      <div className="mt-6 max-w-3xl space-y-6">
        {sections.map(({ title, intro, items, outro }) => (
          <div key={title}>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-black/60 dark:text-white/60">{intro}</p>
            {items && (
              <ul className="mt-1.5 space-y-1 pl-1">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-black/60 dark:text-white/60">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-black/40 dark:bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {outro && <p className="mt-1.5 text-sm leading-6 text-black/60 dark:text-white/60">{outro}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
