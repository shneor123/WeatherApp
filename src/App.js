import { HashRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "./pages/home-page";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import { AppHeader } from "./cmps/app-header";

function App() {
  return (
    <section className='app main-container'>
      <AppHeader />
      <main>
        <Routes>
          <Route element={<HomePage />} path={'/'} />
          <Route element={<Favorites />} path={'/favorites'} />
          <Route element={<Search />} path={'/search'} />
        </Routes>
      </main>
    </section>
  )
}

export default App;
