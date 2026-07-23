import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "Mood Styling",
  description: "분위기로 고르는 코디",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Theme radius="none" grayColor="gray" panelBackground="solid" hasBackground={false}>
          {children}
        </Theme>
      </body>
    </html>
  );
}
