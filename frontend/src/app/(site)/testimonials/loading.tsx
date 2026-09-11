import { PageLoader } from "@/components/common/PageLoader";

export default function Loading() {
  return <main className="container-shell py-16"><PageLoader label="Loading testimonials" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-60 animate-pulse rounded-xl bg-ink/5 motion-reduce:animate-none" />)}</div></main>;
}
