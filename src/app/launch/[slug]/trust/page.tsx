import React from 'react';

export default async function TrustPage(props: any) {
  const maybe = props?.params;
  const params = (maybe && typeof maybe.then === 'function') ? await maybe : (maybe ?? {});
  const slug = params?.slug ?? '';

  // TODO: replace with your real Trust UI
  return (
    <main style={{ padding: 24 }}>
      <h1>Trust</h1>
      <p>slug: <code>{slug}</code></p>
    </main>
  );
}
