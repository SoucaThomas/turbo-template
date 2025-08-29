export default function TechStack() {
  const technologies = [
    { name: 'NestJS', category: 'Backend' },
    { name: 'OpenAPI', category: 'API' },
    { name: 'TanStack Router', category: 'Frontend' },
    { name: 'TanStack Query', category: 'Data' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'JWT', category: 'Auth' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'shadcn/ui', category: 'Components' },
  ];

  return (
    <section className='py-20 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center mb-16'>
          <h2 className='text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6'>
            Built with Modern Technologies
          </h2>
          <p className='text-xl text-muted-foreground'>
            Carefully selected tools and frameworks for the best developer
            experience.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className='group relative bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/50'
            >
              <div className='text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300'>
                {tech.name}
              </div>
              <div className='text-sm text-muted-foreground'>
                {tech.category}
              </div>
              <div className='absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300'></div>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <div className='inline-flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full'>
            <span className='h-2 w-2 rounded-full bg-green-500 animate-pulse'></span>
            <span className='text-sm'>
              All technologies are actively maintained and production-ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
