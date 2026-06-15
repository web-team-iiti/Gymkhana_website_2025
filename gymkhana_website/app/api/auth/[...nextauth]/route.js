export const runtime = "nodejs";

import { handlers } from "@/auth"; // Imports from the root auth.js
export const { GET, POST } = handlers;