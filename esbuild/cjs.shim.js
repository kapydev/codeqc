import { createRequire as ___createRequire } from "node:module";
import ___path from "node:path";
import ___url from "node:url";
import ___crypto from "node:crypto";

globalThis.require = ___createRequire(import.meta.url);
globalThis.__filename = ___url.fileURLToPath(import.meta.url);
globalThis.__dirname = ___path.dirname(__filename);
globalThis.crypto = ___crypto;
