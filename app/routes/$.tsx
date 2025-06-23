export async function loader() {
  // Catch-all route that triggers a 404
  throw new Response('Not Found', { status: 404 });
}

export default function CatchAll() {
  // This component should never render since the loader throws
  return null;
}
