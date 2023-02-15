import '../../src/styles/globals.css'
import MainLayout from '../../src/components/MainLayout'

export default function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
