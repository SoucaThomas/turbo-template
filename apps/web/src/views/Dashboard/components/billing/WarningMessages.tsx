interface WarningMessagesProps {
  isCanceled: boolean;
  isPastDue: boolean;
  periodEnd: string;
}

export default function WarningMessages({
  isCanceled,
  isPastDue,
  periodEnd,
}: WarningMessagesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Warning Messages */}
      {isCanceled && (
        <div className='bg-yellow-50 p-3 rounded-lg border border-yellow-200'>
          <p className='text-sm text-yellow-800'>
            ⚠️ <strong>Subscription Ending:</strong> Your subscription will end
            on {formatDate(periodEnd)}
          </p>
        </div>
      )}

      {isPastDue && (
        <div className='bg-red-50 p-3 rounded-lg border border-red-200'>
          <p className='text-sm text-red-800'>
            ❌ <strong>Payment Required:</strong> Your payment is past due.
            Please update your payment method.
          </p>
        </div>
      )}
    </>
  );
}
