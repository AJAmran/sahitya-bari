import dbConnect from './mongodb';
import User from './models/User';
import bcrypt from 'bcryptjs';

async function main() {
    await dbConnect();

    const email = 'admin@sahitya-bari.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.findOneAndUpdate(
        { email },
        {
            $setOnInsert: {
                email,
                password: hashedPassword,
                role: 'ADMIN',
                name: 'Admin User',
            }
        },
        { upsert: true, returnDocument: 'after' }
    );

    console.log('Seed completed successfully:', admin.email);
    process.exit(0);
}

main().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
