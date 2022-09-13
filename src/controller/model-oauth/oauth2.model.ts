const bcrypt = require("bcrypt");
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import generalConfig from 'src/common/configuration/general.config';
import databaseConfig from 'src/common/configuration/database.config';
import { ModelOAuthClients } from './oauth2_clients';
import { ModelOAuthUsers } from './oauth2_users';


mongoose.connect(databaseConfig.database, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).catch(error => console.log(error));

const refreshTokens = [];

export default {
    async generateAccessToken(client, user, scope) {
        return jwt.sign({ user: user.username, aud: client.name, scope }, generalConfig.secret,{expiresIn: 600});
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
        const FOUND_CLIENT = await ModelOAuthClients.findOne({ clientId: clientId }).exec()
        if (FOUND_CLIENT) {
            const AUTHENTICATED = await bcrypt.compare(clientSecret,FOUND_CLIENT.clientSecret );
            if (AUTHENTICATED) {
                return FOUND_CLIENT;
            }
        }
        return false;
    },
    async getUser(username, password) {
        const FOUND_USER = await ModelOAuthUsers.findOne({ "username": username}).exec()
        if (FOUND_USER) {
            const AUTHENTICATED = await bcrypt.compare(password,FOUND_USER.password );
            if (AUTHENTICATED) {
                return FOUND_USER;
            }
        }
        return false;
    },
    async saveToken(token, client, user) {
        const FOUND_USER = await ModelOAuthUsers.findOneAndUpdate({ "username": user.username }, { tokenOauth2: token }).exec()
        if (!FOUND_USER) return Error ("Doesn't save token in User");
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