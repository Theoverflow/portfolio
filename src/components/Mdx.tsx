import React from 'react';
import { MDXProvider, type Components } from '@mdx-js/react';

const components: Components = {
  a: (props) => (
    <a
      {...props}
      className={[
        'text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/60',
        props.className
      ]
        .filter(Boolean)
        .join(' ')}
      target={props.href?.startsWith('http') ? '_blank' : props.target}
      rel={props.href?.startsWith('http') ? 'noreferrer' : props.rel}
    />
  ),
  h1: (props) => <h1 {...props} className={[props.className, 'scroll-mt-24'].filter(Boolean).join(' ')} />,
  h2: (props) => <h2 {...props} className={[props.className, 'scroll-mt-24'].filter(Boolean).join(' ')} />,
  h3: (props) => <h3 {...props} className={[props.className, 'scroll-mt-24'].filter(Boolean).join(' ')} />
};

export function Mdx({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
