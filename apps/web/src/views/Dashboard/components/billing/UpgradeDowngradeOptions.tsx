import { TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UpgradeDowngradeOption {
  id: string;
  name: string;
  price: number;
  isUpgrade: boolean;
  priceDiff: number;
  actionText: string;
  description: string;
  priceChange: string;
}

interface UpgradeDowngradeOptionsProps {
  options: UpgradeDowngradeOption[] | null;
  onUpgrade: () => void;
  onDowngrade: () => void;
  upgradeLoading: boolean;
  downgradeLoading: boolean;
}

export default function UpgradeDowngradeOptions({
  options,
  onUpgrade,
  onDowngrade,
  upgradeLoading,
  downgradeLoading,
}: UpgradeDowngradeOptionsProps) {
  if (!options || options.length === 0) return null;

  return (
    <>
      {options.map(option => (
        <div key={option.id} className='border rounded-lg p-4 bg-muted/30'>
          <div className='flex items-center justify-between mb-3'>
            <div>
              <h4 className='font-medium text-foreground'>{option.name}</h4>
              <p className='text-sm text-muted-foreground'>
                {option.description}
              </p>
            </div>
            <Badge variant={option.isUpgrade ? 'default' : 'secondary'}>
              {option.priceChange}
            </Badge>
          </div>

          <Button
            onClick={option.isUpgrade ? onUpgrade : onDowngrade}
            disabled={upgradeLoading || downgradeLoading}
            variant={option.isUpgrade ? 'default' : 'outline'}
            className='w-full'
          >
            {upgradeLoading || downgradeLoading ? (
              'Processing...'
            ) : (
              <>
                {option.isUpgrade ? (
                  <TrendingUp className='h-4 w-4 mr-2' />
                ) : (
                  <TrendingDown className='h-4 w-4 mr-2' />
                )}
                {option.actionText} to {option.name}
              </>
            )}
          </Button>
        </div>
      ))}
    </>
  );
}
