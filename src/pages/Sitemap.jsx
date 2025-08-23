import React from "react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Courses" },
    { to: "/instructors", label: "Instructors" },
    { to: "/admissions", label: "Admissions" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
        <p className="text-gray-600 mb-6">
          Quick links to important pages across the site.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((l) => (
            <li key={l.to} className="bg-white border rounded-xl p-4 hover:shadow transition">
              <Link to={l.to} className="font-medium hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
