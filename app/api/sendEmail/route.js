import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'codermoksedul@gmail.com',
                pass: 'ugvmewmweppjfcxy',
            }
        });

        const mailOption = {
            from: 'codermoksedul@gmail.com',
            to: to, // Use the provided 'to' email address
            subject: subject,
            html: `
                <h3>Hello Augustine</h3>
                <li> title: ${subject}</li>
                <li> message: ${message}</li> 
            `
        };

        await transporter.sendMail(mailOption);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
    }
}
