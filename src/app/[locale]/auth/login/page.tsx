"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const formSchema = z.object({
  email: z.string().email({ message: "invalidEmail" }),
  password: z.string().min(6, { message: "passwordLength" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("LoginPage");
  const headerT = useTranslations("Header");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      action: "login",
    });

    setLoading(false);

    if (res?.error) {
      setError(
        res.error === "CredentialsSignin"
          ? t("errorMessages.loginFailed")
          : res.error
      );
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const res = await signIn("google", { redirect: false });

      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      setError(t("errorMessages.googleLoginFailed"));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-3">
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

            {/* Google Sign In Button */}
            <Button
              variant="outline"
              className="w-full mb-6"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("submitButton.googleLoading")}
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/google.png"
                    alt="Google"
                    width={16}
                    height={16}
                  />
                  {t("submitButton.googleDefault")}
                </div>
              )}
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("submitButton.continueWith")}
                </span>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("emailLabel")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("emailPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email &&
                          t(
                            `errorMessages.${form.formState.errors.email.message}`
                          )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("passwordLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.password &&
                          t(
                            `errorMessages.${form.formState.errors.password.message}`
                          )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

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
                href="/auth/register"
                className="text-primary font-medium hover:underline"
              >
                {t("createAccountLink")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
