import { exec } from 'child_process';
import os from 'os';
import { promisify } from 'util';
const si = require('systeminformation');

const execAsync = promisify(exec);

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
  const nodeDiskInfo = require('node-disk-info');
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
  try {
    const wifiInterface = await si.networkInterfaces().then(interfaces => {
      // Filter interfaces to find wifi interface (replace 'wlan0' with your actual interface name)

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

(async () => {
  await getNetworkUsage();
})();

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
