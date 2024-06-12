import AuthGuard from "@/guards/AuthGuard";

export default function Template({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
