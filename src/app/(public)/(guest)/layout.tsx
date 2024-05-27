import Header from "@/components/header";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
