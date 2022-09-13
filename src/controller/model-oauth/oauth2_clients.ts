import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var OAuthClientsSchema = new Schema({
    clientId: String,
    clientSecret: String,
    name: String,
    grants: [String], // Array of grants that the client can use (ie, `authorization_code`)
    redirectUris: [String], // Array of urls the client is allowed to redirect to
});

export const ModelOAuthClients = mongoose.model('clients', OAuthClientsSchema);
