import React from "react";

export type SceneKey = "home" | "work" | "writing" | "detail" | "unknown";

export type Vec3 = readonly [number, number, number];

type SceneState = {
  focus: Vec3;
  strength: number;
  routeKey: SceneKey;
  setRouteKey: (k: SceneKey) => void;
  setHoverKey: (k: SceneKey | null) => void;
};

const SceneContext = React.createContext<SceneState | null>(null);

const ROUTE_FOCUS: Record<SceneKey, { focus: Vec3; strength: number }> = {
  home: { focus: [0, 0, 0], strength: 0.35 },
  work: { focus: [2.2, 0.8, -0.5], strength: 0.75 },
  writing: { focus: [-2.2, 0.8, -0.5], strength: 0.65 },
  detail: { focus: [0, 1.4, -1.0], strength: 1.0 },
  unknown: { focus: [0, 0, 0], strength: 0.25 },
};

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [routeKey, setRouteKey] = React.useState<SceneKey>("home");
  const [hoverKey, setHoverKey] = React.useState<SceneKey | null>(null);

  const derived = React.useMemo(() => {
    const base = ROUTE_FOCUS[routeKey] ?? ROUTE_FOCUS.unknown;
    if (!hoverKey) return base;
    const hover = ROUTE_FOCUS[hoverKey] ?? base;

    // Hover should be a gentle override, not a hard jump.
    const focus: Vec3 = [
      base.focus[0] * 0.4 + hover.focus[0] * 0.6,
      base.focus[1] * 0.4 + hover.focus[1] * 0.6,
      base.focus[2] * 0.4 + hover.focus[2] * 0.6,
    ];

    return {
      focus,
      strength: Math.max(base.strength, hover.strength) * 0.9,
    };
  }, [routeKey, hoverKey]);

  const value = React.useMemo<SceneState>(
    () => ({
      focus: derived.focus,
      strength: derived.strength,
      routeKey,
      setRouteKey,
      setHoverKey,
    }),
    [derived, routeKey]
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

export function useScene() {
  const ctx = React.useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used within SceneProvider");
  return ctx;
}
