"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cn } from "@/lib/utils";

export interface LinkProps extends NextLinkProps {
  className?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => (
    <NextLink
      ref={ref}
      className={cn("text-primary underline-offset-4 hover:underline", className)}
      {...props}
    />
  )
);

Link.displayName = "Link";
