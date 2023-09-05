import bcrypt from "bcryptjs";

export const hashData = async (data: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data, salt);
    return hashed;
}

export const compareHash = async (data: string, hash: string): Promise<boolean> => {
    const isEqual = await bcrypt.compare(data, hash);
    return isEqual;
}