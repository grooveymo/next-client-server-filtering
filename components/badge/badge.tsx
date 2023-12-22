import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { InvoiceStatus } from '@/types/invoice-status';

const BadgeVariants = cva(
  /* badge base style */
  'rounded rounded-lg shadow-md w-[100px] text-center font-bold py-4 -mt-4',
  {
    variants: {
      /* badge colors */
      intent: {
        draft:
          'text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-yellow-100 dark:text-yellow-800 hover:bg-yellow-900',
        pending:
          'text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-blue-100 dark:text-blue-800 hover:bg-red-600',
        paid: 'text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-100 dark:text-green-800 hover:bg-green-900',
        overdue:
          'text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-red-100 dark:text-red-800 hover:bg-red-600',
      },

      /* badge roundness */
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
const Badge = ({ status, roundness }: BadgeProps) => {
  return (
    <div className={BadgeVariants({ intent: status, roundness })}>
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default Badge;
