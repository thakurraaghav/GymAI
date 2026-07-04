import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="text-lime-400 font-mono text-9xl font-bold mb-4">404</div>
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Page Not Found</h1>
      <p className="text-zinc-400 mb-8 max-w-sm text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
