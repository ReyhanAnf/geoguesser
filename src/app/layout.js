import './globals.css';
import GoogleMapsScript from '@/components/GoogleMapsScript';

export const metadata = {
  title: 'GeoGuesser AI',
  description: 'Test your geography knowledge with AI-powered location guessing!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleMapsScript />
        {children}
      </body>
    </html>
  );
}
