import { cn } from "@/lib/utils";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function Box({ children, className }: BoxProps) {
  return (
    <div
      className={cn("mx-auto w-full flex items-start justify-start", className)}
    >
      {children}
    </div>
  );
}
