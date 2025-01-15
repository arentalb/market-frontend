export function PageHeader({ title }: { title: string }) {
  return (
    <div className={"mb-4 pb-2  border-b"}>
      <h1 className={"text-2xl"}>{title}</h1>
    </div>
  );
}
