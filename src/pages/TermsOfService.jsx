import React from "react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 leading-7">
          <p>
            By accessing Home Academy’s website and services, you agree to these Terms.
            Please read them carefully.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Accounts & Enrollment</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Provide accurate information during signup and enrollment.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Payments & Refunds</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Fees are due as per course schedule shared at enrollment.</li>
              <li>Refunds (if applicable) follow our center’s refund policy communicated at registration.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Acceptable Use</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Do not disrupt classes, misuse materials, or violate laws.</li>
              <li>Respect instructors and fellow students in all interactions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
            <p>
              Course content and website materials are owned by Home Academy or its licensors.
              Do not copy, distribute, or resell without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Disclaimers & Liability</h2>
            <p>
              Services are provided “as is”. We are not liable for indirect or incidental damages
              to the maximum extent permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Termination</h2>
            <p>
              We may suspend or terminate access for violations of these Terms or unlawful activity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Changes</h2>
            <p>
              We may update these Terms. Continued use after changes means you accept the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>
              Email: <a href="mailto:homeacademy.lyari@gmail.com" className="underline">homeacademy.lyari@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
