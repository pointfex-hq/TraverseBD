import { z } from 'zod';

export const analyticsEventSchema = z.object({
  eventType: z.enum(['package_view', 'whatsapp_click', 'search_filter', 'destination_view']),
  targetSlug: z.string().optional(),
  locale: z.enum(['en', 'bn']).default('en'),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

// In-memory counter for local development and session aggregates
const localEventCounts: Record<string, number> = {
  package_view: 0,
  whatsapp_click: 0,
  search_filter: 0,
  destination_view: 0,
};

export async function recordAnalyticsEvent(event: AnalyticsEventInput) {
  // Increment local counter
  if (localEventCounts[event.eventType] !== undefined) {
    localEventCounts[event.eventType]++;
  } else {
    localEventCounts[event.eventType] = 1;
  }

  return {
    recorded: true,
    eventType: event.eventType,
    totalForType: localEventCounts[event.eventType],
    timestamp: new Date().toISOString(),
  };
}

export function getLocalAnalyticsSummary() {
  return { ...localEventCounts };
}
