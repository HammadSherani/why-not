import Link from "next/link";

const sections = [
  {
    title: "1. Introduction",
    body: "Welcome to WhyNot. By accessing or using our platform, you agree to follow these Terms of Service, respect our community standards, and use WhyNot responsibly. These guidelines are designed to help create a safe, respectful, and enjoyable experience for everyone.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old and legally eligible to use the WhyNot platform. By creating an account, you confirm that you meet the required age and legal requirements in your country or region.",
  },
  {
    title: "3. User Responsibilities",
    body: "Users must provide accurate and up-to-date information, treat other members with respect, and use the WhyNot platform in a safe and responsible manner. Any misleading, harmful, abusive, or inappropriate behavior may result in restrictions or account suspension.",
  },
  {
    title: "4. Creating & Joining Plans",
    body: "You are responsible for the plans you create or join, as well as the personal information you choose to share with other users. Always make thoughtful decisions, communicate clearly, and take appropriate precautions when arranging or participating in plans.",
  },
  {
    title: "5. Account & Safety",
    body: "We may restrict, temporarily suspend, or permanently remove accounts that violate our Terms of Service, community guidelines, or safety policies. These actions may be taken to protect other users and maintain a safe, respectful, and trustworthy environment across the WhyNot platform.",
  },
];

export default function LegalInfoPage() {
  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Please review the terms and conditions that govern your use of our platform and services.
      </p>

      <div className="mt-8 max-w-3xl space-y-6">
        {sections.map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-black/60 dark:text-white/60">{body}</p>
          </div>
        ))}

        <div>
          <h2 className="text-base font-semibold">6. Privacy &amp; Contact</h2>
          <p className="mt-1.5 text-sm leading-6 text-black/60 dark:text-white/60">
            Your privacy is important to us, and we are committed to protecting your personal information and
            maintaining transparency about how your data is used. Please review our{" "}
            <Link href="/profile/privacy" className="font-medium text-[#ff5870] hover:underline">
              Privacy Policy
            </Link>{" "}
            for more details, or contact our support team if you have any questions or concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
