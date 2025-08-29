export function LoadingSkeleton() {
  return (
    <div className='space-y-4'>
      <h4 className='font-medium'>Active Sessions</h4>
      <div className='space-y-3'>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className='flex items-center justify-between p-3 border rounded-lg animate-pulse'
          >
            <div className='flex items-center gap-3'>
              <div className='h-4 w-4 rounded-full bg-[var(--muted)]'></div>
              <div className='space-y-2'>
                <div className='h-4 w-24 rounded bg-[var(--muted)]'></div>
                <div className='h-3 w-32 rounded bg-[var(--muted)]'></div>
              </div>
            </div>
            <div className='h-6 w-16 rounded bg-[var(--muted)]'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
