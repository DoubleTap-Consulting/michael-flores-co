import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET_HEADER = "x-webhook-secret";
const REQUIRED_FIELDS = ["event_id", "project", "type"] as const;

type SentryWebhookPayload = {
  event_id: string;
  project: string;
  type: string;
  [key: string]: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasRequiredFields(payload: unknown): payload is SentryWebhookPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return REQUIRED_FIELDS.every((field) => isNonEmptyString(candidate[field]));
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SENTRY_WEBHOOK_SECRET;
  const receivedSecret = request.headers.get(WEBHOOK_SECRET_HEADER);

  if (!configuredSecret) {
    console.error("[sentry-webhook] Missing SENTRY_WEBHOOK_SECRET configuration");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!receivedSecret) {
    console.warn(`[sentry-webhook] Missing ${WEBHOOK_SECRET_HEADER} header`);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (receivedSecret !== configuredSecret) {
    console.warn("[sentry-webhook] Invalid webhook secret");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    console.warn("[sentry-webhook] Invalid JSON payload");
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!hasRequiredFields(payload)) {
    console.warn("[sentry-webhook] Missing required fields", {
      requiredFields: REQUIRED_FIELDS
    });

    return NextResponse.json(
      {
        error: "Missing required fields: event_id, project, type"
      },
      { status: 400 }
    );
  }

  console.info("[sentry-webhook] Event received", {
    event_id: payload.event_id,
    project: payload.project,
    type: payload.type
  });

  return NextResponse.json({ ok: true });
}
