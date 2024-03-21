import { Label } from '../ui/label';
import { flatMapDeep, isObject, isArray } from 'lodash';

export function ErrorLabel({ error }: { error?: any }) {
  if (!error) return null;

  if (isArray(error)) {
    return error.map((e: any, i) => {
      return (
        <Label key={`error-${i}`} className="text-red-400">
          {e?.errorMessage}
        </Label>
      );
    });
  }

  if (isObject(error)) {
    let i = -1;
    return flatMapDeep(error, (e: any) => {
      i += 1;
      return (
        <Label key={`error-${i}`} className="text-red-400">
          {e?.errorMessage}
        </Label>
      );
    });
  }

  return (
    error?.errorMessage && (
      <Label className="text-red-400">{error?.errorMessage}</Label>
    )
  );
}
