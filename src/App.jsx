import { useState } from 'react';
import './index.css';

import Layout from './elements/Layout';
import Home from './elements/Home';

function App() {

  const [selected, setSelected] = useState("Home")

  return (
    <Layout selected={selected} setSelected={setSelected}>
      {selected === "Home" && <Home />}
    </Layout>
  );
}

export default App;
