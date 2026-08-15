// src/app/auth/signup/page.tsx
"use client";

import { Suspense } from "react";
import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
