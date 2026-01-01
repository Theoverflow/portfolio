import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-white/70">That page doesn’t exist.</p>
      <Link to="/" className="text-white underline decoration-white/25 hover:decoration-white/60">
        Go home
      </Link>
    </div>
  );
}
