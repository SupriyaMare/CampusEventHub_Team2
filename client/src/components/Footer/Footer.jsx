// ✅ src/components/Footer/Footer.jsx (READY TO PASTE)
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  // ✅ Keep footer universal (no Admin/Student dashboard links)
  // Show only meaningful links for everyone. Hide "Feedback" if you want.
  const links = useMemo(() => {
    const base = [
      { label: "Events", to: "/events" },
      { label: "Help", to: "/help" }, // create later or change to "/"
      { label: "Privacy", to: "/privacy" }, // create later or change
      { label: "Terms", to: "/terms" }, // create later or change
    ];

    // Optional: if you already have /admin/feedback and you want it ONLY on admin pages
    const isAdmin = pathname.startsWith("/admin");
    if (isAdmin) base.unshift({ label: "Feedback", to: "/admin/feedback" });

    return base;
  }, [pathname]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Row */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>CEH</div>
            <div className={styles.brandText}>
              <div className={styles.name}>CampusEventHub</div>
              <div className={styles.tagline}>
                Events, registrations, and feedback — streamlined.
              </div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {links.map((l) => (
              <Link key={l.to} className={styles.link} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Row */}
        <div className={styles.bottom}>
          <div className={styles.copy}>
            © {year} CampusEventHub. All rights reserved.
          </div>

          <div className={styles.meta}>
            <span className={styles.muted}>Support:</span>{" "}
            <a className={styles.mail} href="mailto:support@campuseventhub.com">
              support@campuseventhub.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
