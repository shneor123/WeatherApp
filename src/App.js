import { HashRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "./pages/home-page";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <section className="app">
      <Router>
        <Routes>
          <Route element={<HomePage />} path={'/'} />
          <Route element={<Favorites />} path={'/favorites'} />
          <Route element={<Search />} path={'/search'} />
        </Routes>
      </Router>
      {/* <AppHeader /> */}
    </section>
  )
}

export default App;
