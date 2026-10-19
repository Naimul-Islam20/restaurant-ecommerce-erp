import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <AuthShell imageAlt="ERP17 Restaurant dining room">
      <SignupForm />
    </AuthShell>
  );
}
