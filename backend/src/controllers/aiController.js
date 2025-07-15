import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import ParsedJob from '../models/ParsedJob.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runPythonParser = (url) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../scripts/testScraper.py');
    console.log('🛠️ Using scriptPath:', scriptPath);

    const child = spawn('/Library/Frameworks/Python.framework/Versions/3.11/bin/python3', [scriptPath, url], {
      env: { ...process.env },
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error('❌ Python exited with code:', code);
        console.error('📄 stderr:', stderr);
        return reject(new Error(`Python script failed with exit code ${code}`));
      }

      try {
        const parsed = JSON.parse(stdout);
        resolve(parsed);
      } catch (err) {
        console.error('❌ Failed to parse Python output:', stdout);
        return reject(new Error('Invalid JSON returned from script.'));
      }
    });
  });
};

export const parseJobFromUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const userId = req.user._id;

    const parsedJobData = await runPythonParser(url);

    const parsedJob = await ParsedJob.create({
      user: userId,
      sourceUrl: url || '',
      ...parsedJobData,
    });

    res.status(201).json(parsedJob);
  } catch (err) {
    console.error('Job parsing failed:', err);
    next(err);
  }
};