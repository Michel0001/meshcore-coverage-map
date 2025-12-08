// Returns the geohashes all coverage cells with recent data.
import * as util from '../content/shared.js';

const LOOK_BACK_DAYS = 2;

export async function onRequest(context) {
  const store = context.env.COVERAGE;
  const result = [];
  let cursor = null;

  do {
    const coverage = await store.list({ cursor: cursor });
    cursor = coverage.cursor ?? null;
    coverage.keys.forEach(c => {
      const lastHeard = c.metadata.lastHeard ?? 0;
      if (util.ageInDays(lastHeard) < LOOK_BACK_DAYS)
        result.push(c.name);
      });
  } while (cursor !== null)

  return new Response(JSON.stringify(result));
}
