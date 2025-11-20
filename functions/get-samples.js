export async function onRequest(context) {
  const store = context.env.SAMPLES;
  const url = new URL(context.request.url);
  const prefix = url.searchParams.get('p');

  const samples = await store.list({prefix: prefix});

  return new Response(JSON.stringify(samples));
}
