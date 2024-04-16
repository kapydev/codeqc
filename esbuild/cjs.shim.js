import { createRequire as __createRequire } from "node:module";
import __path from "node:path";
import __url from "node:url";
import __crypto from "node:crypto";

globalThis.require = __createRequire(import.meta.url);
globalThis.__filename = __url.fileURLToPath(import.meta.url);
globalThis.__dirname = __path.dirname(__filename);
globalThis.crypto = __crypto;
