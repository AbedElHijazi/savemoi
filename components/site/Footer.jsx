import Link from "next/link";
import Icon from "@/components/ui/Icon";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="word">SAVÉMOI</div>
            <p className="tag">
              Natural beauty from the Middle East. A journey of tradition, passion and clean beauty —
              French innovation, Mediterranean nature.
            </p>
            <div className="footer-contact">
              <div><Icon name="pin" /> {SITE.address}</div>
              <div><Icon name="mail" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              <div><Icon name="phone" /> <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></div>
            </div>
          </div>

          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/track-order">Track Your Order</Link></li>
              <li><Link href="/pages/wholesale">SAVÉMOI for Wholesale</Link></li>
              <li><Link href="/pages/loyalty">SAVÉMOI Loyalty</Link></li>
              <li><Link href="/pages/sustainability">Sustainability</Link></li>
              <li><Link href="/pages/active-ingredients">Active Ingredients</Link></li>
              <li><Link href="/pages/world-of-savemoi">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4>Useful Links</h4>
            <ul>
              <li><Link href="/pages/terms-conditions">Terms &amp; Conditions</Link></li>
              <li><Link href="/pages/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/pages/orders-refund-policy">Orders &amp; Refund Policy</Link></li>
              <li><Link href="/pages/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4>Follow Us on Social Media</h4>
            <div className="social-row">
              <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
              <a href="#" aria-label="TikTok"><Icon name="tiktok" /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" /></a>
            </div>
            <div className="g-reviews">
              <div className="score">{SITE.googleRating}</div>
              <div className="stars" aria-hidden="true">★★★★★</div>
              <small>Based on {SITE.googleReviewsCount} Google reviews</small>
              <a className="btn btn-outline-light btn-sm" href="#" target="_blank" rel="noopener noreferrer">
                Write a Review
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-nl">
        <div className="wrap">
          <div>
            <strong>Stay Close to Nature</strong>
            <span>Stay in the know with our promotions and new arrivals.</span>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap">
          <span>© {new Date().getFullYear()} SAVÉMOI. All rights reserved.</span>
          <span>Registered in France</span>
        </div>
      </div>
    </footer>
  );
}
