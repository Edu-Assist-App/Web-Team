import { MainLayout } from "@/app/[locale]/components/layouts/main-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
