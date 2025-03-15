import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = async (email: string) => {
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET as Secret, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN as Secret, { expiresIn: '1d' });

    return { accessToken, refreshToken };
};

export const verifyToken = async (token: string) => {
    try {
        console.log(`Token: "${token}" || Secret: "${process.env.JWT_SECRET}" verification ongoing...`);
        return jwt.verify(token, process.env.JWT_SECRET as Secret);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    } catch (error) {
        return null;
    }
};