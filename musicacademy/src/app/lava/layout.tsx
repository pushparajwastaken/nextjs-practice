export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Lavaaa,Inner Lower Item</h1>
      {children}
    </div>
  );
}
