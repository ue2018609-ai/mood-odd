import "./globals.css";

export const metadata = {
  title: "Mood Styling",
  description: "분위기로 고르는 코디",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
