import { redirect } from "next/navigation";

export default function Page() {
  redirect("/en"); // or detect locale from headers/cookies and redirect dynamically
}
