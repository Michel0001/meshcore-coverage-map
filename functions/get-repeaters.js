export async function onRequest(context) {
  const store = context.env.REPEATERS;
  const repeaters = await store.list();

  return new Response(JSON.stringify(repeaters));
}
