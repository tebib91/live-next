import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const directoryPath = '/home'; // You can specify any directory here
  const results: string[] = [];
  const MAX_RESULTS = 50;
  const excludedPatterns = ['.cache', '.config', 'node_modules', '.git', '.*']; // Add any other patterns you want to exclude

  function searchFiles(dir: string) {
    if (results.length >= MAX_RESULTS) return; // Stop if we have enough results

    let files;
    try {
      files = fs.readdirSync(dir);
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    for (const file of files) {
      if (results.length >= MAX_RESULTS) break; // Stop if we have enough results

      // Check if the file or directory should be excluded
      if (excludedPatterns.some(pattern => file.includes(pattern))) {
        continue;
      }
      const filePath = path.join(dir, file);
      let stat;
      try {
        stat = fs.lstatSync(filePath);
      } catch (err) {
        console.error(`Error getting stats for file ${filePath}:`, err);
        continue;
      }

      if (stat.isDirectory()) {
        searchFiles(filePath);
      } else if (file.toLowerCase().includes((query as string).toLowerCase())) {
        results.push(filePath.replace(directoryPath, ''));
      }
    }
  }

  searchFiles(directoryPath);

  res.status(200).json({ results: results.slice(0, MAX_RESULTS) });
}
