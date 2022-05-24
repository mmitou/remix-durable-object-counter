import { createFetch } from "remix-cloudflare-workers-fetch";
import type { ServerBuild } from "remix-cloudflare-workers-fetch";
//@ts-ignore
import assetJson from "__STATIC_CONTENT_MANIFEST";
import * as build from "../build";
import { Counter } from "./counter";

const fetch = createFetch({
  build: build as unknown as ServerBuild,
  assetJson,
});

export default {
  fetch,
};

export { Counter };
