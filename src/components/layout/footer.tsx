export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 py-8 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Shikhar KC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
