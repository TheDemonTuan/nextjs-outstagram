import Header from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Header />
      <div className="w-[245px]"/>
      <div className="flex-1">{children}</div>
    </div>
  );
}
