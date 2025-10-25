export async function GET(_req: Request, context: any) {
  const slug = context?.params?.slug ?? '';
  // TODO: replace with your real status logic
  return Response.json({ ok: true, slug });
}
