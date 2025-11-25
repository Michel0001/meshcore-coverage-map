export async function onRequest(context) {
  const store = context.env.COVERAGE;
  const result = [];
  let cursor = null;

  do {
    const coverage = await store.list({ cursor: cursor });
    cursor = coverage.cursor ?? null;
    await Promise.all(coverage.keys.map(async c => {
      const values = (await store.get(c.name, "json")) ?? []
      result.push({
        hash: c.name,
        heard: c.metadata.heard ?? 0,
        lost: c.metadata.lost ?? 0,
        lastHeard: c.metadata.lastHeard ?? 0,
        hitRepeaters: c.metadata.hitRepeaters ?? [],
        values: values
      });
    }));
  } while (cursor !== null)

  return new Response(JSON.stringify(result));
}
