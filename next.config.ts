import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions : ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
  extension : /\.mdx?$/,
  options: {
    rehypePlugins: [['rehype-slug', {}]],
  },
})

export default withMDX(nextConfig)
