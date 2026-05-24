"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Volume2Icon,
  Share2Icon,
  FlagIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";
import { useState, useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Logo } from "@/constants/logos";

import ReportIssueModal from "./report-issue-modal";

const TooltipButton = ({
  label,
  icon,
  onClick,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) => {
  const btn = (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={onClick}
      data-state={active ? "on" : undefined}
      className="data-[state=on]:bg-muted"
      aria-label={label}
    >
      {icon}
    </Button>
  );

  return btn;
};

interface Props {
  logo: Logo;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  showNav?: boolean;
  showBackToGrid?: boolean;
  layout?: "modal" | "page";
}

const LogoDetailView = ({
  logo,
  onClose,
  onPrev,
  onNext,
  showNav = false,
  showBackToGrid = false,
  layout = "modal",
}: Props) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/${logo.category}/${logo.id}`;
    navigator.clipboard.writeText(url);
  }, [logo]);

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = `/api/logo/${logo.id}`;
    a.download = `${logo.brand.replaceAll(/\s+/gu, "-").toLowerCase()}.png`;
    a.click();
  }, [logo]);

  const handleAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`/api/logo/audio/${logo.id}`);
      audioRef.current.addEventListener("ended", () => setPlaying(false));
    }
    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [logo, playing]);

  const isPage = layout === "page";

  return (
    <>
      <div
        className={
          isPage
            ? "flex flex-col items-center justify-center min-h-screen p-8"
            : "fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        }
      >
        {!isPage && <div className="absolute inset-0" onClick={onClose} />}

        {showNav && onPrev && (
          <Button
            variant="outline"
            size="icon"
            onClick={onPrev}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-60 rounded-full shadow-md bg-background/90 backdrop-blur-sm"
            aria-label="Previous logo"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
        )}

        {showNav && onNext && (
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-60 rounded-full shadow-md bg-background/90 backdrop-blur-sm"
            aria-label="Next logo"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        )}

        <div
          className={
            isPage
              ? "relative max-w-lg w-full"
              : "relative z-50 bg-popover rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto ring-1 ring-foreground/5"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center p-8 bg-muted/30">
            <img
              src={`/api/logo/${logo.id}`}
              alt={logo.brand}
              className="w-48 h-48 object-contain"
              draggable={false}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {logo.brand}
                </h2>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {logo.category}
                </span>
              </div>
              {!isPage && onClose && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <XIcon className="size-4" />
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {logo.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {logo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              {logo.hasAudio && (
                <TooltipButton
                  label={playing ? "Stop" : "Listen"}
                  icon={
                    playing ? (
                      <span className="text-sm">⏹</span>
                    ) : (
                      <Volume2Icon className="size-4" />
                    )
                  }
                  onClick={handleAudio}
                  active={playing}
                />
              )}
              <TooltipButton
                label="Copy link"
                icon={<Share2Icon className="size-4" />}
                onClick={handleShare}
              />
              <TooltipButton
                label="Report issue"
                icon={<FlagIcon className="size-4" />}
                onClick={() => setReportOpen(true)}
              />
              <Button
                variant="default"
                size="sm"
                onClick={handleDownload}
                className="ml-auto"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            </div>

            {showBackToGrid && (
              <div className="pt-1">
                <a
                  href={logo.category ? `/${logo.category}` : "/"}
                  className="inline-block text-sm text-primary hover:underline"
                >
                  ← Back to grid
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <ReportIssueModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        brand={logo.brand}
      />
    </>
  );
};

export default LogoDetailView;
