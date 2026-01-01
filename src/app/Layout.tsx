import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { SceneProvider, useScene } from './scene/SceneContext';
import { ParticlesBackground } from '../components/ParticlesBackground';

function RouteSync() {
  const { pathname } = useLocation();
  const { setRouteKey } = useScene();

  React.useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const first = parts[0] ?? '';
    if (first === '' || first === 'home') {
      setRouteKey('home');
      return;
    }
    if (first === 'work') {
      setRouteKey(parts.length > 1 ? 'detail' : 'work');
      return;
    }
    if (first === 'writing') {
      setRouteKey(parts.length > 1 ? 'detail' : 'writing');
      return;
    }
    setRouteKey('unknown');
  }, [pathname, setRouteKey]);

  return null;
}

function Header() {
  const { setHoverKey } = useScene();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-2 rounded-lg text-sm font-medium transition',
      isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
    ].join(' ');

  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-sm font-semibold tracking-wide"
          onMouseEnter={() => setHoverKey('home')}
          onMouseLeave={() => setHoverKey(null)}
        >
          <span className="text-white">YOURNAME</span>
          <span className="text-white/50">.dev</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/work"
            className={linkClass}
            onMouseEnter={() => setHoverKey('work')}
            onMouseLeave={() => setHoverKey(null)}
          >
            Work
          </NavLink>
          <NavLink
            to="/writing"
            className={linkClass}
            onMouseEnter={() => setHoverKey('writing')}
            onMouseLeave={() => setHoverKey(null)}
          >
            Writing
          </NavLink>
          <a
            href="#about"
            className="px-3 py-2 rounded-lg text-sm font-medium transition text-white/70 hover:text-white hover:bg-white/5"
            onMouseEnter={() => setHoverKey('detail')}
            onMouseLeave={() => setHoverKey(null)}
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

function Shell() {
  return (
    <div className="min-h-screen relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <ParticlesBackground />
      <RouteSync />

      <div className="relative z-10">
        <Header />

        <main id="main" className="mx-auto max-w-6xl px-4 py-10">
          <Outlet />
        </main>

        <footer className="mx-auto max-w-6xl px-4 pb-10 text-white/50 text-sm">
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} YOURNAME</span>
            <div className="flex gap-4">
              <a className="hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="hover:text-white" href="mailto:you@example.com">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <SceneProvider>
      <Shell />
    </SceneProvider>
  );
}
