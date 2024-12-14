import { createConnection } from "@/lib/db.js";
import { NextResponse } from 'next/server'

export async function GET() {
    try{
        const db = await createConnection();
        const sql = "SELECT * from school_info";
        const [school] = await db.query(sql);      
        return NextResponse.json(school);
        
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: error.message})   
    }
}

