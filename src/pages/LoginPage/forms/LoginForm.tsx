import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginFormInputs,
  loginSchema,
} from "@/pages/LoginPage/forms/schema/loginSchema.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(inputs: LoginFormInputs) {
    try {
      const { data } = await login({
        email: inputs.email,
        password: inputs.password,
      });
      toast({
        title: `Welcome ${data?.user?.name}`,
      });
    } catch (error) {
      toast({
        title: error.message,
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
                چونە ژورەوە{" "}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
