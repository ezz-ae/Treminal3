import React from 'react';

export default async function BotCreatorPage(props: any) {
  // Normalize Next 15's sometimes-Promise params
  const maybe = props?.params;
  const params = (maybe && typeof maybe.then === 'function') ? await maybe : (maybe ?? {});
  const slug = params?.slug ?? '';

  // TODO: replace with real page content
  return (
    <main style={{ padding: 24 }}>
      <h1>Bot Creator</h1>
      <p>slug: <code>{slug}</code></p>
    </main>
  );
}
