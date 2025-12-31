"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Global error page (500)
 * Catches errors in the app router
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Container className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" aria-hidden="true" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>

            <p className="text-lg text-foreground-secondary mb-8">
              We're sorry, but something unexpected happened. Please try again.
            </p>

            {process.env.NODE_ENV === "development" && (
              <details className="mb-8 text-left p-4 bg-muted rounded-lg">
                <summary className="cursor-pointer font-semibold mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs overflow-auto text-red-600 dark:text-red-400 whitespace-pre-wrap">
                  {error.message}
                  {error.digest && `\nError ID: ${error.digest}`}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} className="group">
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                Try Again
              </Button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Go Home
              </Button>
            </div>
          </div>
        </Container>
      </body>
    </html>
  );
}



