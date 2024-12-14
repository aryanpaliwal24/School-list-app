import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    return cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage }).single('image');

export async function POST(req) {
  return new Promise((resolve, reject) => {
    upload(req, req.res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return reject(NextResponse.json({ error: 'Failed to upload image' }, { status: 500 }));
      }

      try {
        console.log("Uploaded file:", req.file);
        const formData = await req.formData();
        const name = formData.get('name');
        const address = formData.get('address');
        const city = formData.get('city');
        const state = formData.get('state');
        const contact = formData.get('contact');
        const email_id = formData.get('email_id');

        console.log('Form Data:', { name, address, city, state, contact, email_id });

        const image = req.file ? `/images/${req.file.filename}` : null;
        console.log('Uploaded Image Path:', image);

        if (!name || !address || !city || !state || !contact || !email_id) {
          return reject(NextResponse.json({ message: 'All fields are required' }, { status: 400 }));
        }

        const query = 'INSERT INTO school_info (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const connection = await createConnection();
        await connection.execute(query, [name, address, city, state, contact, email_id, image]);

        return resolve(NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 }));

      } catch (error) {
        console.error('Error during database insertion:', error);
        return reject(NextResponse.json({ message: 'Failed to insert data into database' }, { status: 500 }));
      }
    });
  });
}
