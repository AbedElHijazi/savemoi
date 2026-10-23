import Topbar from "@/components/site/Topbar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <Topbar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </CartProvider>
  );
}
