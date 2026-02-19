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
import { useNavigate } from 'react-router-dom';

const formSchema = z
  .object({
    login: z
      .string()
      .min(10, { message: 'Login must be at least 10 characters' })
      .max(20),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    passwordRepeat: z.string().min(4),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Password are not equal',
    path: ['passwordRepeat'],
  });

export default function Register() {
  const { registerUser } = useAuthContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { login, password } = values;
    registerUser(login, password);
    toast.success('Account created');
    navigate('/auth/login');
  };
  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account </CardTitle>
        <CardDescription>
          Enter your login and password to create an account
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
            <Controller
              name="passwordRepeat"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password repeat</FieldLabel>
                  <Input {...field} id="password-repeat" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <CardFooter>
            <Button type="submit" className="w-full mt-3">
              Create an account
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
