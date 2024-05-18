import Header from "@/components/header";
import AuthGuard from "@/guards/AuthGuard";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Header />
      <AuthGuard>{children}</AuthGuard>
    </div>
  );
}
