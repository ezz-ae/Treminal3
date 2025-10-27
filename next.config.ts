import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (cfg) => {
    cfg.resolve = cfg.resolve || {}
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      'react-native': false,
      '@react-native-async-storage/async-storage': false,
      usb: false,
      'pino-pretty': false,
    }
    return cfg
  },
  async headers() {
    // Dev-only relaxation for wallet/base SDKs that need window.opener
    const dev = process.env.NODE_ENV !== 'production'
    return dev
      ? [
          {
            source: '/:path*',
            headers: [
              { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
              { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
            ],
          },
        ]
      : []
  },
}

export default nextConfig