import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var OAuthUserchema = new Schema({
    name: String,
    genre: String,
    username: String,
    password:String,
    tokenOauth2:Object   
}).index({ username: 1, id_pdv: 1, sku: 1, ean: 1, rut: 1 });;

export const ModelOAuthUsers = mongoose.model('users', OAuthUserchema);
