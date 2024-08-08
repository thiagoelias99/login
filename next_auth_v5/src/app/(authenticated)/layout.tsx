import { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div>
      <h1>This is logged area</h1>
      {children}
    </div>
  )
}