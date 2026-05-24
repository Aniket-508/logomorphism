import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";

import { logos } from "@/constants/logos";

const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ index: string }> }
) => {
  const { index } = await params;

  let key: string;

  const num = Number(index);
  if (Number.isNaN(num)) {
    key = `logo-${index}.png`;
  } else {
    const logo = logos[num % logos.length];
    key = `logo-${logo.id}.png`;
  }

  const { env } = getCloudflareContext();
  const object = await env.LOGOS.get(key);

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
