export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='h-full w-full bg-white px-4 pt-5'>{children}</div>;
}
