import FormInbox from "@/components/Chats/form-inbox";
import HeaderInbox from "@/components/Chats/header-inbox";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <HeaderInbox />
      {children}
      <FormInbox />
    </div>
  );
}
