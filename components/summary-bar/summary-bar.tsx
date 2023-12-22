export interface SummaryBarProps {
  numberOfInvoices: number;
}
const SummaryBar = ({ numberOfInvoices }: SummaryBarProps) => {
  return (
    <div className="flex justify-center items-center mb-16">
      <span className="text-2xl font-bold text-cyan-400">
        Number of Invoices: {numberOfInvoices}
      </span>
    </div>
  );
};

export default SummaryBar;
