import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { unlocked?: boolean };

/**
 * Cookie signing key. A dedicated PORTFOLIO_SESSION_SECRET is preferred, but if
 * only PORTFOLIO_PASSWORD is configured we derive a stable 64-char key from it,
 * so a single environment variable is enough to run the gate in production.
 */
function getSessionSecret() {
  const explicit = process.env["PORTFOLIO_SESSION_SECRET"];
  if (explicit && explicit.length >= 32) return explicit;

  const password = process.env["PORTFOLIO_PASSWORD"];
  if (!password) throw new Error("PORTFOLIO_PASSWORD is not configured");

  return createHash("sha256").update(`portfolio-gate:${password}`, "utf8").digest("hex");
}

function getSessionConfig() {
  return {
    password: getSessionSecret(),
    name: "portfolio-gate",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const getGateStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(getSessionConfig());
  return { unlocked: session.data.unlocked === true };
});

export const unlockProjects = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => {
    const password = typeof data?.password === "string" ? data.password.trim() : "";
    if (!password || password.length > 200) throw new Error("Invalid password");
    return { password };
  })
  .handler(async ({ data }) => {
    const expected = process.env["PORTFOLIO_PASSWORD"];
    if (!expected) throw new Error("PORTFOLIO_PASSWORD is not configured");

    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }

    const session = await useSession<GateSession>(getSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockProjects = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});
