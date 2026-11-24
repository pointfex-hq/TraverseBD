import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(code: string, message: string, status = 400) {
  return json({ error: code, message }, status);
}

export function zodError(error: ZodError) {
  return json({
    error: "VALIDATION_ERROR",
    message: "Request validation failed",
    fields: Object.fromEntries(error.issues.map(issue => [
      String(issue.path[0] ?? "request"), issue.message
    ]))
  }, 400);
}
