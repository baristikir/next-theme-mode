import { useTheme } from 'next-theme-mode'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: React.FC = () => {
  const { colorMode, setColorMode } = useTheme()

  const isDark = colorMode === 'dark' ? true : false

  return (
    <div style={{ backgroundColor: 'var(--color-primaryBackground)' }}>
      <Layout title="Home | Next.js + TypeScript Example">
        <h1 style={{ color: 'var(--color-primaryText)' }}>Hello Next.js 👋</h1>
        <p>
          <Link href="/about">
            <a style={{ color: 'var(--color-primaryText)' }}>About</a>
          </Link>
          <button
            style={{
              color: 'var(--color-primaryText)',
              backgroundColor: 'var(--color-primaryBackground)',
            }}
            onClick={() =>
              isDark ? setColorMode('light') : setColorMode('dark')
            }
          >
            Change Mode
          </button>
          <span style={{ color: 'var(--color-primaryText)' }}>
            Current Color Mode: {colorMode}
          </span>
        </p>
      </Layout>
    </div>
  )
}

export default IndexPage
