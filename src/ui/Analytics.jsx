import Script from 'next/script';

export default function Analytics() {
  return <>
    <Script id="gtm-data-layer" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());`}
    </Script>
    <Script
      id="google-tag-manager"
      src="https://www.googletagmanager.com/gtm.js?id=GTM-W9KPWM24"
      strategy="afterInteractive"
    />
  </>;
}
