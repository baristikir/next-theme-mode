import { useTheme } from 'next-theme-mode'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: React.FC = () => {
  const { colorMode, setColorMode } = useTheme()

  if (!colorMode) {
    return null
  }

  const isDark = colorMode === 'dark' ? true : false

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
        <button
          onClick={() =>
            isDark ? setColorMode('light') : setColorMode('dark')
          }
        >
          Change Mode
        </button>
        <span>Current Color Mode: {colorMode}</span>
      </p>
    </Layout>
  )
}

export default IndexPage
