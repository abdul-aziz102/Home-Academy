import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 leading-7">
          <p>
            At Home Academy, we value your privacy. This policy explains what data we collect,
            how we use it, and the choices you have.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Contact details (name, email, phone) when you submit forms.</li>
              <li>Usage data (pages visited, device info) to improve our website.</li>
              <li>Payment information processed securely by our payment partners.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>To respond to inquiries and provide student support.</li>
              <li>To send updates about courses, offers, and events (you can opt out anytime).</li>
              <li>To maintain security, prevent fraud, and comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Cookies</h2>
            <p>
              We use essential and analytics cookies to deliver and improve services.
              You can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share it with trusted vendors
              (e.g., email, hosting, payment) strictly to provide our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of marketing emails via the unsubscribe link.</li>
              <li>Request details of data we hold about you.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>
              Email: <a href="mailto:homeacademy.lyari@gmail.com" className="underline">homeacademy.lyari@gmail.com</a><br />
              Phone: <a href="tel:+923323769179" className="underline">0332-3769179</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
