export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mx-auto flex h-full w-full max-w-150 flex-col justify-center'>
      <div className='flex flex-col gap-y-8 rounded-4xl bg-white px-10 py-8 shadow-xl'>
        {children}
      </div>
    </div>
  );
}
