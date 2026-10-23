import PageHero from "@/components/ui/PageHero";

export const metadata = { title: "Privacy Policy" };

/**
 * NOTE: No privacy-policy source was provided in the design files.
 * Replace the placeholder below with your legally reviewed policy text.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Legal" title={<>Privacy <em>Policy</em></>} />
      <div className="wrap-sm section">
        <span className="legal-flag">⚠ Placeholder — add your legally reviewed privacy policy here</span>
        <p className="body-txt mt-2">
          For any question about how your personal data is handled, contact us at{" "}
          <a className="text-link" href="mailto:info@savemoi.com">info@savemoi.com</a>.
        </p>
      </div>
    </>
  );
}
