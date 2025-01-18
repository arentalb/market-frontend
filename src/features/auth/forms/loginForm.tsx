import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, loginSchemaType } from "@/features/auth/forms/schemas.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useLoginMutation } from "@/features/auth/api/authApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/store/authSlice.ts";
import { UserRoles } from "@/constants/userRoles.ts";
import { ClientError } from "@/app/apiSlice.ts";

export default function LoginForm() {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  async function onSubmit(inputs: loginSchemaType) {
    try {
      const response = await login({
        email: inputs.email,
        password: inputs.password,
      }).unwrap();

      toast({
        title: ` ${response.data.user.name} بەخێربێیت `,
      });
      dispatch(setCredentials(response.data.user));
      if (response.data.user.role === UserRoles.Owner) {
        navigate("/app/dashboard");
        return;
      } else if (response.data.user.role === UserRoles.Manager) {
        navigate("/app/sale");
        return;
      }
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵە",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-sm min-w-80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">چونە ژورەوە</CardTitle>
          <CardDescription>ئیمەیڵ و وشەی نهێنی داغڵ بکە</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ئیمەیڵ</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ئیمەیڵ"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وشەی نهێنی</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="وشەی نهێنی"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? "چاوەروانی ...." : "چونە ژورەوە"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
