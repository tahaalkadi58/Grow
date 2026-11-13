"use client";

import { useEffect } from "react";

const waitForImages = async (images: HTMLImageElement[]) => {
  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), {
            once: true,
          });

          img.addEventListener("error", () => resolve(), {
            once: true,
          });
        });
      }

      if (img.naturalWidth > 0 && img.decode) {
        await img.decode().catch(() => {});
      }
    })
  );
};

export function HeroImageReveal() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const wrapper = document.querySelector<HTMLElement>(".hero-layers");
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(".hero-layers .hero-layer")
      );

      await waitForImages(images);

      if (cancelled) {
        return;
      }

      document.documentElement.classList.add("hero-loaded");

      if (!wrapper || images.length === 0) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      if (reduceMotion.matches) {
        return;
      }

      // Rasterize each layer once so we can hit-test transparent PNG areas and
      // resolve which overlapping layer is visually on top under the pointer.
      const sources = images
        .map((img) => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          if (!width || !height) {
            return null;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) {
            return null;
          }

          try {
            ctx.drawImage(img, 0, 0, width, height);
          } catch {
            return null;
          }

          return { img, ctx, width, height };
        })
        .filter(
          (
            entry
          ): entry is {
            img: HTMLImageElement;
            ctx: CanvasRenderingContext2D;
            width: number;
            height: number;
          } => entry !== null
        );

      // DOM/paint order is 12 → 1, so the last entry is visually on top.
      const topDown = [...sources].reverse();
      let active: HTMLImageElement | null = null;

      const setActive = (next: HTMLImageElement | null) => {
        if (active === next) {
          return;
        }
        if (active) {
          active.classList.remove("is-vibrating");
        }
        active = next;
        if (active) {
          active.classList.add("is-vibrating");
        }
      };

      const pick = (clientX: number, clientY: number) => {
        const rect = wrapper.getBoundingClientRect();
        if (
          clientX < rect.left ||
          clientX > rect.right ||
          clientY < rect.top ||
          clientY > rect.bottom
        ) {
          return null;
        }

        for (const { img, ctx, width, height } of topDown) {
          // Map the pointer into the image's rendered content box (object-contain).
          const imageRect = img.getBoundingClientRect();
          const imageRatio = width / height;
          const rectRatio = imageRect.width / imageRect.height;

          let drawWidth = imageRect.width;
          let drawHeight = imageRect.height;
          let offsetX = imageRect.left;
          let offsetY = imageRect.top;

          if (imageRatio > rectRatio) {
            drawHeight = imageRect.width / imageRatio;
            offsetY = imageRect.top + (imageRect.height - drawHeight) / 2;
          } else {
            drawWidth = imageRect.height * imageRatio;
            offsetX = imageRect.left + (imageRect.width - drawWidth) / 2;
          }

          if (
            clientX < offsetX ||
            clientX > offsetX + drawWidth ||
            clientY < offsetY ||
            clientY > offsetY + drawHeight
          ) {
            continue;
          }

          const u = (clientX - offsetX) / drawWidth;
          const v = (clientY - offsetY) / drawHeight;
          const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
          const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
          const alpha = ctx.getImageData(x, y, 1, 1).data[3];
          if (alpha > 8) {
            return img;
          }
        }

        return null;
      };

      const onMove = (event: PointerEvent) => {
        setActive(pick(event.clientX, event.clientY));
      };

      const onLeave = () => {
        setActive(null);
      };

      const onVisibility = () => {
        if (document.hidden) {
          setActive(null);
        }
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("blur", onLeave);
      document.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("scroll", onLeave, { passive: true });

      return () => {
        document.removeEventListener("pointermove", onMove);
        window.removeEventListener("blur", onLeave);
        document.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("scroll", onLeave);
        setActive(null);
      };
    };

    let teardown: (() => void) | void;
    void run().then((cleanup) => {
      if (cancelled && typeof cleanup === "function") {
        cleanup();
      } else {
        teardown = cleanup;
      }
    });

    return () => {
      cancelled = true;
      if (typeof teardown === "function") {
        teardown();
      }
    };
  }, []);

  return null;
}
