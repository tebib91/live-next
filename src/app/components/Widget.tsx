'use client';

import styles from '@/assets/styles/Widget.module.css';
import useSystemResults from '../hooks/useSystemResults';

const Widget = () => {
  const { results, loading, error } = useSystemResults();

  return (
    <div className={styles.widget}>
      <div className={styles['project-box-wrapper']}>
        <div
          className={styles['project-box']}
          style={{ backgroundColor: '#e9e7fd' }}
        >
          <div className={styles['project-box-header']}>
            <div className={styles['more-wrapper']}></div>
          </div>
          <div className={styles['project-box-content-header']}></div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {results && (
            <>
              <div className={styles['box-progress-wrapper']}>
                <p className={styles['box-progress-header']}>CPU Usage</p>
                <div className={styles['box-progress-bar']}>
                  <span
                    className={styles['box-progress']}
                    style={{
                      width: `${results.cpuLoad}%`,
                      backgroundColor: '#4f3ff0'
                    }}
                  ></span>
                </div>
                <p className={styles['box-progress-percentage']}>
                  {results.cpuLoad.toFixed(1)}%
                </p>
              </div>
              <div className={styles['box-progress-wrapper']}>
                <p className={styles['box-progress-header']}>RAM Usage</p>
                <div className={styles['box-progress-bar']}>
                  <span
                    className={styles['box-progress']}
                    style={{
                      width: `${results.ramUsage}%`,
                      backgroundColor: '#f03f3f'
                    }}
                  ></span>
                </div>
                <p className={styles['box-progress-percentage']}>
                  {results.ramUsage.toFixed(1)}%
                </p>
              </div>
              <div className={styles['box-progress-wrapper']}>
                <p className={styles['box-progress-header']}>Disk Usage</p>
                <div className={styles['box-progress-bar']}>
                  <span
                    className={styles['box-progress']}
                    style={{
                      width: `${results.diskUsage}%`,
                      backgroundColor: '#c8f7dc'
                    }}
                  ></span>
                </div>
                <p className={styles['box-progress-percentage']}>
                  {results.diskUsage.toFixed(1)}%
                </p>
              </div>
            </>
          )}
          <div className={styles['project-box-footer']}></div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
