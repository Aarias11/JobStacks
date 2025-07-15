import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import ParsedJob from '../models/ParsedJob.js';
import Application from '../models/Application.js';

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

    // ✅ Check for existing application
    const existing = await Application.findOne({ user: userId, sourceUrl: url });
    if (existing) {
      return res.status(409).json({ message: "Application already exists." });
    }

    // Run Python parser
    const parsedJobData = await runPythonParser(url);

    // Save to ParsedJob (for record-keeping)
    const parsedJob = await ParsedJob.create({
      user: userId,
      sourceUrl: url || '',
      ...parsedJobData,
    });

    // Copy to Application (for active user interaction)
    const application = await Application.create({
      user: userId,
      sourceUrl: url || '',
      ...parsedJobData,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error('Job parsing failed:', err);
    next(err);
  }
};