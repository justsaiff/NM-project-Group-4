import { Leaf } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export function AuraLogo(props: LucideProps) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Leaf {...props} />
      <span className="text-xl font-semibold text-foreground">Aura</span>
    </div>
  );
}
