import { PageLoader } from "@/components/common/PageLoader";

export default function Loading() {
  return <main className="container-shell py-16"><PageLoader label="Loading blogs" /><div className="h-96 animate-pulse rounded-xl bg-ink/5 motion-reduce:animate-none" /></main>;
}
