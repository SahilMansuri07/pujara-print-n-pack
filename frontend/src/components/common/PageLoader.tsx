import { Printer } from "lucide-react";
import "./page-loader.css";

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return <div className="page-loader" role="status" aria-label={label}>
    <span className="page-loader-ring">
      <span className="page-loader-ring-track" aria-hidden="true" />
      <span className="page-loader-ring-hole" aria-hidden="true" />
      <Printer size={22} className="page-loader-icon" aria-hidden="true" />
    </span>
    <p className="page-loader-label">{label}<span className="page-loader-dots" aria-hidden="true"><span /><span /><span /></span></p>
  </div>;
}
