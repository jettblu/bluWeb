import Subscribe from "../../components/subscribe";
import "katex/dist/katex.min.css";

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
