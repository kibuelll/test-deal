import '@/styles/globals.css'
import MainLayout from '@/components/MainLayout'

export default function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
