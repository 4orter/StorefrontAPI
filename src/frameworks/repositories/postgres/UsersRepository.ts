import brcypt from 'bcrypt';
import vars from '../../../config/vars';
import {User} from '../../../entities';
import {DataStorable, UserSessionStorable, UserStorable} from '../../../entities/protocols';
import {PostgresDatabase} from '../../databases/postgres';
import {UserSession} from '../../../entities/auxiliary';

const selectClause = (): string => {
    return 'SELECT id, username, first_name AS "firstName", last_name AS "lastName", level';
};

const returningClause = (): string => {
    return 'RETURNING id, username, first_name AS "firstName", last_name AS "lastName", level';
};

const UsersRepository: DataStorable<User> & UserStorable & UserSessionStorable = {
    async add(user: User): Promise<User | null> {
        const {username,firstName,lastName,level} = user;
        try {
            const conn = await PostgresDatabase.connect();
            const hash = brcypt.hashSync(user.password + vars.bcryptSecret, vars.bcryptRounds);
            const result = await conn.query(
                `INSERT INTO users (username, password_digest, first_name, last_name, level) VALUES ($1, $2, $3, $4, $5) ${returningClause()}`,
                [username, hash, firstName, lastName, level]
            );

            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error('Error creating user');
        }
    },
    async update(user: User): Promise<User | null> {
        const {id,username,password,firstName,lastName} = user;
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                `UPDATE users SET username = ($1), password_digest = ($2), first_name = ($3), last_name = ($4) WHERE id = ($5)} ${returningClause()}`,
                [username,password,firstName,lastName,id]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error updating user');
        }
    },
    async delete(user: User): Promise<User | null> {
        const {id} = user;
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                `DELETE FROM users WHERE id = ($1) ${returningClause()}`,
                [id]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    },
    async getById(id: string): Promise<User | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                `${selectClause()} FROM users WHERE id = ($1)`,
                [id]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error get user by id');
        }
    },
    async getByUsername(username: string): Promise<User | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                `${selectClause()} FROM users WHERE username = ($1)`,
                [username]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting user by username');
        }
    },
    async getAll(): Promise<User[] | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(`${selectClause()} FROM users`);
            conn.release();
            return result.rows.length ? result.rows : null;
        } catch (error) {
            throw new Error('Error getting users');
        }
    },
    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                `${selectClause()}, password_digest AS password FROM users WHERE username = ($1)`,
                [username]
            );
            conn.release();

            if (result.rows.length) {
                const user = result.rows[0] as User;
                if (brcypt.compareSync(password + vars.bcryptSecret, (user.password || ''))) {
                    delete user.password;
                    return user;
                }
                return null;
            }
            return null;
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    },
    async addSession(session: UserSession): Promise<UserSession | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                'INSERT INTO user_sessions (secret, user_id) VALUES ($1, $2) RETURNING *',
                [session.secret, session.userId]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error creating new session for user');
        }
    },
    async deleteSession(session: UserSession): Promise<UserSession | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                'DELETE FROM user_sessions WHERE user_id = ($1) RETURNING *',
                [session.userId]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error deleting session for user');
        }
    },
    async getSessionById(id: number): Promise<UserSession | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                'SELECT * FROM user_sessions WHERE id = ($1)',
                [id]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error getting user session by id');
        }
    },
    async getSessionByUserId(userId: string): Promise<UserSession | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query(
                'SELECT * FROM user_sessions WHERE user_id = ($1)',
                [userId]
            );
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error getting user session by user id');
        }
    },
    async getAllSessions(): Promise<UserSession[] | null> {
        try {
            const conn = await PostgresDatabase.connect();
            const result = await conn.query('SELECT * FROM user_sessions');
            conn.release();
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            throw new Error('Error getting user sessions');
        }
    }
};

Object.freeze(UsersRepository);
export default UsersRepository;
