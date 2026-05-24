"use client";

import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";

import LogoDetailView from "@/components/logo-detail-view";
import { getAdjacentLogo, getLogoById } from "@/constants/logos";

export default function LogoModal() {
  const [viewId, setViewId] = useQueryState("view");

  const logo = viewId ? getLogoById(viewId) : null;

  const close = useCallback(() => setViewId(null), [setViewId]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!viewId) {
        return;
      }
      const next = getAdjacentLogo(viewId, direction);
      if (next) {
        setViewId(next.id);
      }
    },
    [viewId, setViewId]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!viewId) {
        return;
      }
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewId, close, navigate]);

  if (!logo) {
    return null;
  }

  return (
    <LogoDetailView
      logo={logo}
      onClose={close}
      onPrev={() => navigate(-1)}
      onNext={() => navigate(1)}
      showNav
      layout="modal"
    />
  );
}
