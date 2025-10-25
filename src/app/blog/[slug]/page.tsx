import React from 'react';

export default async function BlogPostPage(props: any) {
  // In Next 15, params may be a Promise during build. Normalize it:
  const maybe = props?.params;
  const params = (maybe && typeof maybe.then === 'function') ? await maybe : (maybe ?? {});
  const slug = params?.slug ?? '';

  // TODO: replace with your real blog post fetch/render
  return (
    <main style={{ padding: 24 }}>
      <h1>Blog post</h1>
      <p>slug: <code>{slug}</code></p>
    </main>
  );
}
