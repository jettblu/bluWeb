import Subscribe from "../../components/subscribe";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="fixed bottom-4 right-4 z-20">
        <Subscribe />
      </div>
    </div>
  );
}
