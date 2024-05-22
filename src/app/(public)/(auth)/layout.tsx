import GuestGuard from "@/guards/GuestGuard";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GuestGuard>{children}</GuestGuard>;
}
