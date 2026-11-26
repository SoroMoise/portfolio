import type { Metadata } from "next";
import LocaleNotFound from "../not-found";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LocaleNotFound />;
}
