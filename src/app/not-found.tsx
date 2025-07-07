
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-128px)]">
      <Rocket className="w-24 h-24 text-primary animate-pulse mb-8" />
      <h1 className="text-8xl sm:text-9xl font-bold font-heading text-primary">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-4 mb-6">
        Oops! Page Not Found.
      </h2>
      <p className="text-lg text-foreground/80 mb-10 max-w-lg">
        The page you are looking for seems to have drifted off into the cosmos. Let's guide you back home.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return to Home Base</Link>
      </Button>
    </Container>
  );
}
