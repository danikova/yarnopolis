import { Label } from '../ui/label';

export function ErrorLabel({ error }: { error?: { errorMessage: string } }) {
  return (
    error?.errorMessage && (
      <Label className="text-red-400">{error?.errorMessage}</Label>
    )
  );
}
