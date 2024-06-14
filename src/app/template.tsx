import Header from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Header />
      <div className="flex-auto">{children}</div>
    </div>
  );
}
