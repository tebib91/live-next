'use client';

import styles from '@/assets/styles/Dock.module.css';
import Image from 'next/image';

const Dock = ({ setShowModal }: any) => {
  return (
    <div className={styles.dock}>
      <div className={styles.icon} onClick={() => setShowModal(true)}>
        <Image
          src="https://img.icons8.com/?size=100&id=F7xAnB6rPaWl&format=png&color=000000"
          alt="Icon 1"
          width={42}
          height={42}
        />
      </div>
      <div className={styles.icon} onClick={() => setShowModal(true)}>
        <Image
          src="https://img.icons8.com/?size=100&id=kJr8od2fGcmF&format=png&color=000000"
          alt="Icon 2"
          width={42}
          height={42}
        />
      </div>
      <div className={styles.icon} onClick={() => setShowModal(true)}>
        <Image
          src="https://img.icons8.com/?size=100&id=s5NUIabJrb4C&format=png&color=000000"
          alt="Icon 3"
          width={42}
          height={42}
        />
      </div>
    </div>
  );
};

export default Dock;
