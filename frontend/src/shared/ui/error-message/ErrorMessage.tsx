type Props = {
  error: string;
  className?: string;
};

export function ErrorMessage(props: Props) {
  const { error, className = '' } = props;
  return (
    <span
      className={`animate-in fade-in slide-in-from-top-1 text-xs text-red-500 duration-200 ${className}`}
    >
      {error}
    </span>
  );
}
