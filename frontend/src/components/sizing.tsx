import { AudioWaveform, Ruler } from 'lucide-react';
import { isNaN } from 'lodash';

export function HookSizingLabel({ min, max }: { min: number; max: number }) {
  if (max - min < 0.0005)
    return (
      <div className="flex gap-2">
        <span>{isNaN(min) ? 0.0 : min.toFixed(1)}</span>
        <Ruler className="h-5 w-5 opacity-70" />
      </div>
    );

  return (
    <div className="flex gap-2">
      <span>{isNaN(min) ? 0.0 : min.toFixed(1)}</span>-
      <span>{isNaN(max) ? 0.0 : max.toFixed(1)}</span>
      <Ruler className="h-5 w-5 opacity-70" />
    </div>
  );
}

export function YarnSizingLabel({ value }: { value: number }) {
  return (
    <div className="flex gap-2">
      <span>{isNaN(value) ? 0 : value}</span>
      <AudioWaveform className="h-5 w-5 opacity-70" />
    </div>
  );
}
