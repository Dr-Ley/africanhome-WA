import { formatUsd } from "@/lib/utils";

export function PriceBreakdown({ total }: { total: number }) {
  const rows = [
    { label: "Vehicle and driver-guide", share: 0.28 },
    { label: "Accommodation and meals", share: 0.42 },
    { label: "Park and conservancy fees", share: 0.22 },
    { label: "Transfers and coordination", share: 0.08 },
  ];

  return (
    <div className="rounded-xl border border-sand bg-white p-5">
      <h3 className="font-display text-3xl text-charcoal">Illustrative split</h3>
      <p className="mt-2 text-sm text-charcoal/70">
        A rough way of reading the indicative figure. It is not a quotation and the real split changes with camps, season and routing.
      </p>
      <table className="mt-4 w-full text-sm">
        <caption className="sr-only">Illustrative price split</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-sand/80">
              <th scope="row" className="py-3 text-left font-normal">
                {row.label}
              </th>
              <td className="py-3 text-right">{formatUsd(Math.round(total * row.share))}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="py-3 text-left font-medium">
              Indicative total per person
            </th>
            <td className="py-3 text-right font-medium text-forest">{formatUsd(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
