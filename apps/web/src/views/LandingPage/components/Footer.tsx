import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-muted/50 text-foreground py-16 border-t border-border'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Full-Stack Template
            </h3>
            <p className='text-muted-foreground mb-6 max-w-md'>
              A modern, production-ready template for building full-stack
              applications with NestJS, TanStack Router, and React.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted'
              >
                <Github className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted'
              >
                <Linkedin className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted'
              >
                <Mail className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-foreground'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-foreground'>
              Resources
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors hover:underline'
                >
                  Contributing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-border mt-12 pt-8 text-center'>
          <p className='text-muted-foreground'>
            © 2024 Full-Stack Template. Built with ❤️ using modern web
            technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
