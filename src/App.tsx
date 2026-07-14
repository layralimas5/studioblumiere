import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { BridalPage } from '@/pages/BridalPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="servicos" element={<ServicesPage />} />
          <Route path="noivas" element={<BridalPage />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
