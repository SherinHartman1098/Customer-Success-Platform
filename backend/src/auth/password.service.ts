import bcrypt from 'bcrypt';


//hashing passwords before storing them in the database
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
    }

//comparing the provided password with the stored hash during login
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
    }