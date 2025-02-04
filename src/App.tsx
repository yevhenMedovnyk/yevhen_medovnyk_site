import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Contacts from './pages/Contacts/Contacts';
import GalleryPage from './pages/GalleryPage/Gallery.page';
import Projects from './pages/Projects/Projects';
import Store from './pages/Store/Store';
import About from './pages/About/About';
import Album from './pages/Album/Album';
import CreateOrEditAlbum from './pages/CreateOrEditAlbum/CreateOrEditAlbum';

function App(): React.ReactElement {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<GalleryPage />} />
					<Route path="/album/*" element={<Album />} />
					<Route path="/create-edit-album/*" element={<CreateOrEditAlbum />} />
					<Route path="/create-album" element={<CreateOrEditAlbum />} />
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
