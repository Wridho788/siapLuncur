export default function Footer() {
  return (
    <footer className="text-center text-xs text-muted-foreground py-8 border-t border-border bg-background/80 w-full">
      © {new Date().getFullYear()} SiapLuncur. Dibuat dengan <span className="text-pink-500">❤️</span> oleh Ravatech.
    </footer>
  );
}
