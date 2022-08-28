import {User} from '../../../entities';
import {DataStorable} from '../../../entities/protocols';
import {v4 as uuid} from 'uuid';
import {MockDatabase} from '../../databases/mock';
import {UserSession} from '../../../entities/auxiliary';

const UsersRepository: DataStorable<User> = {
    async add(user: User): Promise<User> {
        if (!user.id) {
            user.id = uuid();
        }

        MockDatabase.users.push(user);
        const returnValue = {...user};
        delete returnValue.password;
        return returnValue;
    },
    async update(user: User): Promise<User | null> {
        const index = MockDatabase.users.findIndex((item: User) => item.id === user.id);
        if (index < 0) return null;

        MockDatabase.users[index] = user;
        return user;
    },
    async delete(user: User): Promise<User | null> {
        const index = MockDatabase.users.findIndex((item: User) => item.id === user.id);
        if (index < 0) return null;

        MockDatabase.users.splice(index, 1);
        return user;
    },
    async getById(id: string): Promise<User | null> {
        return MockDatabase.users.find((item: User) => item.id === id) || null;
    },
    async getByUsername(username: string): Promise<User | null> {
        return MockDatabase.users.find((item: User) => item.username === username) || null;
    },
    async getAll(): Promise<User[] | null> {
        return MockDatabase.users.length ? MockDatabase.users : null;
    },
    async authenticate(username: string, password: string): Promise<User | null> {
        const user = MockDatabase.users.find((item: User) => item.username === username);
        if (!user || user.password !== password) {
            return null;
        }

        return user;
    },
    async addSession(session: UserSession): Promise<UserSession | null> {
        if (!session.id) {
            session.id = MockDatabase.userSessions.length;
        }

        MockDatabase.userSessions.push(session);
        return session;
    },
    async deleteSession(session: UserSession): Promise<UserSession | null> {
        const index = MockDatabase.userSessions.findIndex((item: UserSession) => item.id === session.id);
        if (index < 0) return null;

        MockDatabase.userSessions.splice(index, 1);
        return session;
    },
    async getSessionById(id: number): Promise<UserSession | null> {
        return MockDatabase.userSessions.find((item: UserSession) => item.id === id) || null;
    },
    async getSessionByUserId(userId: string): Promise<UserSession | null> {
        return MockDatabase.userSessions.find((item: UserSession) => item.userId = userId) || null;
    },
    async getAllSessions(): Promise<UserSession[] | null> {
        return MockDatabase.userSessions.length ? MockDatabase.userSessions : null;
    }
};

Object.freeze(UsersRepository);
export default UsersRepository;
