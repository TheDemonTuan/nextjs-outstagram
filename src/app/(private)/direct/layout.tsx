import SildeBarInbox from "@/components/Chats/sidebar-inbox";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SildeBarInbox>
      <div className="h-full">{children}</div>
    </SildeBarInbox>
  );
}
