import { Crown, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AVAILABLE_PLANS } from './useSubscriptionActions';

interface PlanComparisonProps {
  currentPlanId: string;
}

export default function PlanComparison({ currentPlanId }: PlanComparisonProps) {
  return (
    <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
      <h4 className='font-medium text-blue-800 mb-3 flex items-center gap-2'>
        <Crown className='h-4 w-4' />
        Plan Comparison
      </h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {AVAILABLE_PLANS.map(plan => {
          const isCurrentPlan = plan.id === currentPlanId;
          const currentPlan = AVAILABLE_PLANS.find(p => p.id === currentPlanId);

          return (
            <div
              key={plan.id}
              className={`p-3 rounded-lg border ${
                isCurrentPlan
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white border-blue-200'
              }`}
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium text-blue-800'>{plan.name}</span>
                {isCurrentPlan && (
                  <Badge variant='default' className='text-xs'>
                    Current
                  </Badge>
                )}
              </div>
              <div className='text-sm text-blue-700 space-y-1'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>${plan.price}/month</span>
                </div>
                {!isCurrentPlan && currentPlan && (
                  <div className='text-xs'>
                    {plan.price > currentPlan.price ? (
                      <span className='text-green-600'>
                        +${plan.price - currentPlan.price}/month
                      </span>
                    ) : (
                      <span className='text-orange-600'>
                        -${currentPlan.price - plan.price}/month
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
