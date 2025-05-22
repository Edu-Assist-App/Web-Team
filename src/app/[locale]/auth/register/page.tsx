"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import { Input } from "@/app/[locale]/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/app/[locale]/components/ui/card";
import { Alert, AlertDescription } from "@/app/[locale]/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const formSchema = z
  .object({
    email: z.string().email({ message: "invalidEmail" }),
    userName: z.string().min(3, { message: "usernameLength" }),
    fullName: z.string().min(2, { message: "fullNameRequired" }),
    password: z.string().min(6, { message: "passwordLength" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordsMismatch",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("RegisterPage");
  const headerT = useTranslations("Header");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      userName: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...registerData } = values;
      // console.log("Registering user with data:", registerData);
      // // registration
      const regRes = await signIn("credentials", {
        redirect: false,
        email: registerData.email,
        username: registerData.userName,
        fullName: registerData.fullName,
        action: "register",
        password: registerData.password,
      });

      if (regRes?.error) {
        throw new Error(regRes.error);
      }

      // // // Sign in automatically after successful registration
      // const loginRes = await signIn("credentials", {
      //   redirect: false,
      //   email: registerData.email,
      //   action: "login",
      //   password: registerData.password,
      // });

      // if (loginRes?.error) {
      //   throw new Error(loginRes.error);
      // }

      router.push("/");
    } catch (err: any) {
      setError(err.message || t("errorMessages.registrationFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
                <Image
                  className="w-8 h-8"
                  width="1000"
                  height="1000"
                  alt={headerT("logoAlt")}
                  src="/logo.svg"
                  loading="lazy"
                />
              </div>
              <Link
                href="/"
                className="font-medium text-gray-900 text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap"
              >
                {headerT("brandName")}
              </Link>
            </div>
            <CardDescription className="text-center">
              {t("cardDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {[
                  { name: "email", type: "text" },
                  { name: "userName", type: "text" },
                  { name: "fullName", type: "text" },
                  { name: "password", type: "password" },
                  { name: "confirmPassword", type: "password" },
                ].map(({ name, type }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof FormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(`${name}Label`)}</FormLabel>
                        <FormControl>
                          <Input
                            type={type}
                            placeholder={t(`${name}Placeholder`)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors[name] &&
                            t(
                              `errorMessages.${form.formState.errors[name]?.message}`
                            )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-[#3800b3] hover:bg-indigo-800"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("submitButton.loading")}
                    </>
                  ) : (
                    t("submitButton.default")
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-sm text-muted-foreground">
              {t("footerText")}{" "}
              <Link
                href="/auth/login"
                className="text-primary font-medium hover:underline"
              >
                {t("signInLink")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
