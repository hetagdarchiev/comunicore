export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='h-full w-full bg-white pt-4'>{children}</div>;
}
