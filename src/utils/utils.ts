// utils.ts

import os from 'os';
import { promisify } from 'util';

let exec, execAsync, si: { networkInterfaces: () => Promise<any[]>; networkStats: (arg0: any) => any; }, nodeDiskInfo: { getDiskInfoSync: () => any; };

if (typeof window === 'undefined') {
  exec = require('child_process').exec;
  execAsync = promisify(exec);
  si = require('systeminformation');
  nodeDiskInfo = require('node-disk-info');
}

let previousNetworkStats = {
  rx: 0,
  tx: 0,
  timestamp: Date.now()
};

export function getCpuLoad() {
  const cpus = os.cpus();
  let user = 0,
    nice = 0,
    sys = 0,
    idle = 0,
    irq = 0,
    total = 0;

  cpus.forEach(cpu => {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  });

  total = user + nice + sys + idle + irq;
  return ((total - idle) / total) * 100;
}

export function getRamUsage() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  return (usedMemory / totalMemory) * 100;
}

export function getDiskUsage() {
  if (typeof window !== 'undefined' || !nodeDiskInfo) {
    console.error('Disk usage can only be checked on the server side');
    return 0;
  }

  try {
    const disks = nodeDiskInfo.getDiskInfoSync();
    const rootDisk = disks.find(
      (disk: { _mounted: string }) => disk._mounted === '/'
    );
    if (!rootDisk) throw new Error('Root disk not found');
    const total = rootDisk._blocks;
    const used = rootDisk._used;
    return (used / total) * 100;
  } catch (error) {
    console.error('Error getting disk usage:', error);
    return 0;
  }
}

export async function getNetworkUsage() {
  if (typeof window !== 'undefined' || !si) {
    console.error('Network usage can only be checked on the server side');
    return { upload: 0, download: 0 };
  }

  try {
    const wifiInterface = await si.networkInterfaces().then((interfaces: any[]) => {
      return interfaces.find((iface: any) => iface.ifaceName === 'wlp1s0');
    });

    if (!wifiInterface) {
      console.error('Wi-Fi interface not found');
      return { upload: 0, download: 0 };
    }

    const initialStats = await si.networkStats(wifiInterface.ifaceName);
    let previousStats = initialStats;

    return new Promise(resolve => {
      setInterval(async () => {
        const currentStats = await si.networkStats(wifiInterface.ifaceName);
        console.log({ currentStats });
        const deltaRx = currentStats[0]?.rx_bytes - previousStats[0]?.rx_bytes;
        const deltaTx = currentStats[0]?.tx_bytes - previousStats[0]?.tx_bytes;
        const deltaTime = (Date.now() - previousStats[0]?.timestamp) / 1000 + 1;

        const downloadSpeed = deltaRx / deltaTime / 1024; // kB/s
        const uploadSpeed = deltaTx / deltaTime / 1024; // kB/s

        console.log(
          `Upload: ${uploadSpeed.toFixed(
            2
          )} kB/s, Download: ${downloadSpeed.toFixed(2)} kB/s`
        );

        previousStats = currentStats;
      }, 10000); // Update every second
      resolve({ upload: 0, download: 0 }); // Initial placeholder to avoid unhandled promise rejection
    });
  } catch (error) {
    console.error('Error getting network usage:', error);
    return { upload: 0, download: 0 };
  }
}

export function getSystemInfo() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptime: os.uptime(),
    hostname: os.hostname(),
    type: os.type()
  };
}

if (typeof window === 'undefined') {
  (async () => {
    await getNetworkUsage();
  })();
}
