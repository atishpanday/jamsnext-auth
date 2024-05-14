import { NextResponse } from "next/server";
import pool from "../../../db";
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const POST = async (req) => {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const client = await pool.connect();
    try {
        const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [name, email, hashedPassword];
        await client.query(queryText, values);
        return NextResponse.json(
            { message: "User registered." },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "User already exists." },
            { status: 409 }
        );
    } finally {
        client.release();
    }
};
