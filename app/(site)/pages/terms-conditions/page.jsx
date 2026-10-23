import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import PrintButton from "@/components/ui/PrintButton";

export const metadata = { title: "Terms & Conditions" };

const SECTIONS = [
  {
    title: "Acceptance of Agreement",
    content: (
      <>
        <p>You agree to the terms and conditions outlined in this Terms of Use Agreement with respect to our site. This Agreement constitutes the entire and only agreement between you and us, and supersedes all prior or contemporaneous agreements, representations, warranties and understandings with respect to the site, its content, products or services.</p>
        <p>The Site reserves the right to change, modify, add, or remove portions of these Terms at any time. Changes will be effective when posted on the Site. Please check these Terms regularly for updates. Your continued use of the Site following the posting of changes constitutes your acceptance of those changes.</p>
      </>
    )
  },
  {
    title: "Copyright",
    content: (
      <>
        <p>The content, organization, graphics, design, compilation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site, except as allowed under the Limited License section below, is strictly prohibited.</p>
        <p>You do not acquire ownership rights to any content, document or other materials viewed through the Site. Some of the content on the Site is the copyrighted work of third parties.</p>
      </>
    )
  },
  {
    title: "Limited License & Permitted Uses",
    content: (
      <>
        <p>You are granted a non-exclusive, non-transferable, revocable license to:</p>
        <ol>
          <li>Access and use the Site strictly in accordance with this Agreement;</li>
          <li>Use the Site solely for internal, personal, non-commercial purposes;</li>
          <li>Print out discrete information from the Site solely for internal, personal, non-commercial purposes, provided that you maintain all copyright and other policies contained therein.</li>
        </ol>
        <p>No print out or electronic version of any part of the Site or its contents may be used by you in any litigation or arbitration matter whatsoever under any circumstances.</p>
      </>
    )
  },
  {
    title: "Linking to the Site",
    content: (
      <>
        <p>You may provide links to the Site, provided that:</p>
        <ol>
          <li>You do not remove or obscure, by framing or otherwise, advertisements, the copyright notice, or other notices on the Site;</li>
          <li>Your site does not engage in illegal or pornographic activities;</li>
          <li>You discontinue providing links to the Site immediately upon request by us.</li>
        </ol>
      </>
    )
  },
  {
    title: "Orders, Pricing & Product Availability",
    content: (
      <>
        <p>All orders placed through the Site are subject to acceptance and confirmation by us. We reserve the right to refuse, limit, or cancel any order for any reason, including suspected fraud, errors in product or pricing information, or limited product availability.</p>
        <p>In the event a product is listed at an incorrect price or with incorrect information due to a typographical or technical error, we reserve the right to cancel any order placed for that product — whether or not the order has been confirmed — and, where payment has already been taken, to issue a full refund.</p>
        <p>Product availability is not guaranteed and may change without notice. Order, shipping, and refund terms specific to purchases are set out separately in our <Link href="/pages/orders-refund-policy">Orders &amp; Refund Policy</Link> and <Link href="/pages/shipping-policy">Shipping Policy</Link>, which form part of this Agreement.</p>
      </>
    )
  },
  {
    title: "Errors, Corrections & Changes",
    content: (
      <>
        <p>We do not represent or warrant that the Site will be error-free, free of viruses or other harmful components, or that defects will be corrected. We do not represent or warrant that the information available on or through the Site will be correct, accurate, timely or otherwise reliable.</p>
        <p>We may make changes to the features, functionality or content of the Site at any time. We reserve the right in our sole discretion to edit or delete any documents, information or other content appearing on the Site.</p>
      </>
    )
  },
  {
    title: "Unlawful Activity",
    content: <p>We reserve the right to investigate complaints or reported violations of this Agreement and to take any action we deem appropriate, including but not limited to reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties and disclosing any information necessary or appropriate to such persons or entities relating to your profile, email addresses, usage history, posted materials, IP addresses and traffic information.</p>
  },
  {
    title: "Indemnification",
    content: <p>You agree to indemnify, defend and hold us and our partners, agents, officers, directors, employees, subcontractors, successors, assigns, third party suppliers of information and documents, attorneys, advertisers, product and service providers, and affiliates harmless from any liability, loss, claim and expense, including reasonable attorney&apos;s fees, related to your violation of this Agreement or use of the Site.</p>
  },
  {
    title: "Non-Transferable",
    content: <p>Your right to use the Site is not transferable or assignable. Any password or right given to you to obtain information or documents is not transferable or assignable.</p>
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p>We and any Affiliated Party shall not be liable for any loss, injury, claim, liability, or damage of any kind resulting in any way from:</p>
        <ol>
          <li>Any errors in or omissions from the Site or any services or products obtainable therefrom;</li>
          <li>The unavailability or interruption of the Site or any features thereof;</li>
          <li>Your use of the Site;</li>
          <li>The content contained on the Site;</li>
          <li>Any delay or failure in performance beyond the control of a Covered Party.</li>
        </ol>
        <p>The aggregate liability of us and the affiliated parties in connection with any claim arising out of or relating to the Site or your order shall not exceed the amount you paid for the product or service giving rise to the claim.</p>
        <span className="legal-flag">⚠ Needs legal review before publishing</span>
      </>
    )
  },
  {
    title: "Copyrights & Copyright Agents",
    content: (
      <>
        <p>We respect the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with:</p>
        <ol>
          <li>An electronic or physical signature of the person authorized to act on behalf of the copyright owner;</li>
          <li>A description of the copyrighted work that you claim has been infringed;</li>
          <li>A description of where the infringing material is located on the Site;</li>
          <li>Your address, telephone number, and email address;</li>
          <li>A statement of good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
          <li>A statement, made under penalty of perjury, that the above information is accurate and that you are the copyright owner or authorized to act on their behalf.</li>
        </ol>
        <p>Our Copyright Agent can be reached at: <strong>info@savemoi.com</strong></p>
      </>
    )
  },
  {
    title: "Legal Compliance",
    content: <p>You agree to comply with all applicable domestic and international laws, statutes, ordinances and regulations regarding your use of the Site and the content and materials provided therein.</p>
  },
  {
    title: "Governing Law & Jurisdiction",
    content: (
      <>
        <p>This Agreement shall be governed by and construed in accordance with the laws of <strong>[France — to confirm]</strong>, without regard to its conflict of law principles. Any dispute arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of <strong>[France — to confirm]</strong>.</p>
        <span className="legal-flag">⚠ Jurisdiction placeholder — confirm with legal counsel before publishing</span>
      </>
    )
  },
  {
    title: "Disclaimer Regarding Information",
    content: (
      <>
        <p>The information from or through this site is provided &ldquo;as-is&rdquo; and &ldquo;as available,&rdquo; and all warranties, express or implied, are disclaimed, including but not limited to the disclaimer of any implied warranties of merchantability and fitness for a particular purpose.</p>
        <p>We are not liable for any indirect, special, incidental, or consequential damages, whether based on breach of contract, breach of warranty, tort, product liability or otherwise, even if advised of the possibility of such damage. All terms and conditions with respect to this site are governed by the above Terms of Use Agreement.</p>
      </>
    )
  }
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Legal" title={<>Terms &amp; <em>Conditions</em></>} date="Last updated: April 2025">
        <PrintButton />
      </PageHero>

      <div className="wrap-sm" style={{ paddingTop: "2.5rem" }}>
        <p className="body-txt" style={{ paddingBottom: "2rem", borderBottom: "1px solid var(--green-soft)" }}>
          Welcome to SAVÉMOI. By using our site, you are willingly and irrevocably agreeing to comply with and be bound by the following terms of use. Please review them carefully. If you do not agree to these terms, you should not use this site. The term &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo; refers to SAVÉMOI and its affiliates. The term &ldquo;you&rdquo; refers to the user or viewer of our website.
        </p>
        <div style={{ padding: "1rem 0 3rem" }}>
          <Accordion items={SECTIONS} numbered variant="caps indent" />
        </div>
        <div className="center" style={{ background: "var(--cream2)", padding: "2.5rem", borderRadius: 6 }}>
          <p className="body-txt">
            Questions about our Terms &amp; Conditions? We&apos;re here to help.<br />
            Contact us at <a className="text-link" href="mailto:info@savemoi.com">info@savemoi.com</a> and our team will respond within 24 hours.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.6rem", flexWrap: "wrap", margin: "1.6rem 0 4rem", fontSize: 12 }}>
          <Link className="text-link" href="/pages/privacy-policy">Privacy Policy</Link>
          <Link className="text-link" href="/pages/orders-refund-policy">Orders &amp; Refund Policy</Link>
          <Link className="text-link" href="/pages/shipping-policy">Shipping Policy</Link>
        </div>
      </div>
    </>
  );
}
