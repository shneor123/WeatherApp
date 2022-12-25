import { HashRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "./pages/home-page";

function App() {
  return (
    <section className="app">
      <Router>
        <Routes>
          <Route element={<HomePage />} path={'/'} />
        </Routes>
      </Router>
      {/* <AppHeader /> */}
    </section>
  )
}

export default App;
