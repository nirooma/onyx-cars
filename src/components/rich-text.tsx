export function BrandName() {
  return (
    <span className="font-display" dir="ltr" translate="no">
      Stillward
    </span>
  );
}

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[TBD\]|Stillward)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part === "[TBD]") {
          return (
            <span key={index} className="tbd">
              [TBD]
            </span>
          );
        }
        if (part === "Stillward") {
          return <BrandName key={index} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
