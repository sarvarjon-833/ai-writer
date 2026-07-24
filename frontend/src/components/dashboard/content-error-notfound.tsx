import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function ContentNotFound() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Content not found</AlertTitle>
      <AlertDescription>Please, provide a valid Id</AlertDescription>
    </Alert>
  );
}
