import {
  getCpuLoad,
  getDiskUsage,
  getNetworkUsage,
  getRamUsage,
  getSystemInfo
} from '../utils';

export default async function handler(req: any, res: any) {
  try {
    const cpuLoad = getCpuLoad();
    const ramUsage = getRamUsage();
    const diskUsage = getDiskUsage();
    const networkUsage = await getNetworkUsage();
    const systemInfo = getSystemInfo();

    res
      .status(200)
      .json({ cpuLoad, ramUsage, diskUsage, networkUsage, systemInfo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve system data' });
  }
}
