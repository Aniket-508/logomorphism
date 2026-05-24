import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";

import { getLogoById } from "@/constants/logos";
import { getAudioObjectKey } from "@/lib/r2-keys";

const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const logo = getLogoById(id);

  if (!logo) {
    return new Response("Not found", { status: 404 });
  }

  const key = getAudioObjectKey(logo.category, logo.id);
  const { env } = getCloudflareContext();
  const object = await env.LOGOMORPHISM.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "audio/mpeg",
    },
  });
};

export { GET };
