import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { InvoiceStatus } from '@/types/invoice-status';

const BadgeVariants = cva(
  /* badge base style */
  'rounded rounded-md shadow-md w-[100px] text-center',
  {
    variants: {
      /* badge colors */
      intent: {
        draft:
          'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-900',
        pending:
          'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-red-600',
        paid: 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-900',
        overdue:
          'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 hover:bg-red-600',
      },

      /* bage roundness */
      roundness: {
        square: 'rounded-none',
        round: 'rounded-md',
        pill: 'rounded-full',
      },
    },

    // defaults
    defaultVariants: {
      intent: 'draft',
      roundness: 'round',
    },
  }
);

export type BadgeBaseProps = VariantProps<typeof BadgeVariants>;

export interface BadgeProps extends BadgeBaseProps {
  status: InvoiceStatus;
}
const Badge = ({ status, intent, roundness }: BadgeProps) => {
  return (
    <div className={BadgeVariants({ intent, roundness })}>
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default Badge;
