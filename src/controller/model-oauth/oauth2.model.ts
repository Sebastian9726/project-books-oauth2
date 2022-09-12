import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import generalConfig from 'src/common/configuration/general.config';


const userDB = [
    {
        username: 'username1',
        password: 'holamama', // holamama
        email: 'jonatan@ctrl.alt.coop',
    },
    {
        username: 'username2',
        password: '$2a$04$3R0YNNmdWLhs01aN9Ksyp.BFzYQPomxanotdFbR4iz0PxIq0nIUHq', // barfoo
        email: 'felix@ctrl.alt.coop',
    },
];

const clientDB = [
    {
        grants: ['password'],
        name: 'testClient',
        id: 'abcd',
        clientSecret: 'mypassword', // holamama
    },
];

const refreshTokens = [];

export default {
    async generateAccessToken(client, user, scope) {
        return jwt.sign({ user: user.username, aud: client.name, scope }, generalConfig.secret,);
    },
    async generateRefreshToken(client, user, scope) {
        const token = crypto.randomBytes(36).toString('hex');
        return token;
    },
    async getAccessToken(accessToken) {
        const { exp, aud, type, scope, user } = jwt.verify(accessToken, generalConfig.secret) as any;
        return {
            accessToken,
            accessTokenExpiresAt: new Date(exp * 1000),
            scope,
            client: aud,
            user,
        };
    },
    async getClient(clientId, clientSecret) {
        const foundClient = clientDB.find((item) => item.id === clientId);
        if (foundClient) {
            // const authenticated = await bcrypt.compare(clientSecret,foundClient.clientSecret );
            if (foundClient.clientSecret === clientSecret) {
                return foundClient;
            }
        }
        return false;
    },
    async getUser(username, password) {
        const foundUser = userDB.find((item) => item.username === username);
        if (foundUser) {
            //const authenticated = await bcrypt.compare(password, foundUser.password);
            if (password === foundUser.password) {
                return foundUser;
            }
        }
        return false;
    },
    async saveToken(token, client, user) {
        refreshTokens.push({
            user: user.username,
            client: client.name,
            token: token.refreshToken,
        });
        return {
            ...token,
            client,
            user,
        };
    },
    async validateScope(user, client, scope) {
        return true;
    },

    async verifyScope(accessToken, scope) {
        return true;
    },
};