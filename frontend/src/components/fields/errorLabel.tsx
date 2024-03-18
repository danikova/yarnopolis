import { Label } from '../ui/label';

export function ErrorLabel({ error }: { error?: any }) {
  return (
    error?.errorMessage && (
      <Label className="text-red-400">{error?.errorMessage}</Label>
    )
  );
}
