import { PageLoader } from "@/components/common/PageLoader";

export default function Loading() {
  return <main className="container-shell py-16" aria-label="Loading portfolio"><PageLoader label="Loading our portfolio" /><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div className="h-60 animate-pulse rounded-lg bg-ink/5 motion-reduce:animate-none" key={index} />)}</div></main>;
}
