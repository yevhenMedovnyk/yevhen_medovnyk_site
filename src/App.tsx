import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import Projects from './pages/Projects/Projects';
import Store from './pages/Store/Store';
import About from './pages/About/About';

function App(): React.ReactElement {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/about" element={<About />} />
					<Route path="/store" element={<Store />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
