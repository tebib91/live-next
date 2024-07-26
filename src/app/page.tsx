'use client';
import profilePic1 from '@/assets/wallpapers/wallpaperflare.com_wallpaper.jpg';

import Image from 'next/image';
import { useState } from 'react';
import Dock from './components/Dock';
import Modal from './components/Modal';
import Search from './components/Search';
import Widget from './components/Widget';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Image
        src={profilePic1}
        placeholder="blur"
        quality={100}
        fill
        loading="lazy"
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        alt="Picture of the author"
      />
      <Search />
      <Widget />
      <Dock setShowModal={setShowModal} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>Hello from the modal!</Modal>
      )}
    </main>
  );
}
