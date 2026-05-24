import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";

import { getLogoById, logos } from "@/constants/logos";
import { getLogoObjectKey } from "@/lib/r2-keys";

const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ index: string }> }
) => {
  const { index } = await params;

  const num = Number(index);
  const logo = Number.isNaN(num)
    ? getLogoById(index)
    : logos[num % logos.length];

  if (!logo) {
    return new Response("Not found", { status: 404 });
  }

  const key = getLogoObjectKey(logo.category, logo.id);
  const { env } = getCloudflareContext();
  const object = await env.LOGOMORPHISM.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers: Record<string, string> = {
    "Cache-Control": "public, max-age=31536000, immutable",
    "Content-Type": "image/png",
  };

  if (object.httpEtag) {
    headers["ETag"] = object.httpEtag;
  }

  return new Response(object.body, { headers });
};

export { GET };
