"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [{ href: "/resume-timeline", label: "Resume timeline" }];

export default function SideRailNav() {
  const pathname = usePathname();

  return (
    <nav className="site-rail" aria-label="Primary">
      <div className="site-rail__panel">
        <span className="site-rail__hint">Menu</span>
        <ul className="site-rail__list">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="site-rail__link"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
