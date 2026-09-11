import { PageLoader } from "@/components/common/PageLoader";

export default function Loading() {
  return <main className="container-shell py-20" aria-label="Loading services"><PageLoader label="Loading services" /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-80 animate-pulse rounded-2xl bg-ink/5 motion-reduce:animate-none" />)}</div></main>;
}
