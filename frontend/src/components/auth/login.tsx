import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { useAuthContext } from '@/context/auth.context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  login: z
    .string()
    .min(10, { message: 'Login must be at least 10 characters' })
    .max(20),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export default function Login() {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { login, password } = values;
    try {
      loginUser(login, password);
      toast.success('Login successfull!');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account </CardTitle>
        <CardDescription>
          Enter your login and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <FieldGroup>
            <Controller
              name="login"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Login</FieldLabel>
                  <Input {...field} id="login-input" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} id="password-input" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full mt-3">Login</Button>
            <Link
              to="/auth/register"
              className="tex-center block mt-2 text-blue-500"
            >
              Don't have an account? Register now!
            </Link>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
