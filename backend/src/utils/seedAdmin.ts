/**
 * Node Modules
 */
import bcryptjs from 'bcryptjs';

/**
 * Local Modules
 */
import config from '@/config';
import { GENDER, ROLE } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';

/**
 * Seed Admin Logic
 */
export const seedAdmin = async () => {
    try {
        const isSuperAdminExists = await User.findOne({
            email: config.ADMIN.EMAIL,
            role: ROLE.ADMIN,
        });

        if (isSuperAdminExists) {
            console.log('Default Admin already exists');
            return;
        }
        console.log('Trying to create default super admin');

        const hashedPassword = await bcryptjs.hash(
            config.ADMIN.PASSWORD,
            config.BCRYPT_SALT_ROUND,
        );

        await User.create({
            name: 'RedHope Admin',
            role: ROLE.ADMIN,
            email: config.ADMIN.EMAIL,
            phoneNumber: '01860700650',
            password: hashedPassword,
            bloodGroup: 'B+',
            gender: GENDER.MALE,
            dateOfBirth: '2002-08-15',
            district: 'Chittagong',
            city: 'Khulshi',
            thana: 'Khulshi',
        });

        console.log('Default Admin created successfully');
    } catch (error) {
        console.error(error);
    }
};
