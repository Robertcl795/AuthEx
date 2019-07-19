import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import GooglePlusTokenStrategy from 'passport-google-plus-token'
import FacebookTokenStrategy from 'passport-facebook-token'

import config from '../config';
import User from '../models/User';
import loggerService from './logger.service';

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.token
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if (!user) return done(null, false)
        done(null, user)
    } catch (err) {
        done(err, false)
    }
}))

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.gclientID,
    clientSecret: config.gclientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        const existingUser = await User.findOne({ "google.id": profile.id })
        if (existingUser) return done(null, existingUser)
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch (err) {
        done(err, false, err.message)
    }
}))

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.fclientID,
    clientSecret: config.fclientSecret
}, async(accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        const existingUser = await User.findOne({ "facebook.id": profile.id })
        if (existingUser) return done(null, existingUser)
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch(err) {
        done(err, false, err.message)
    }
}))

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const foundUser = await User.findOne({ email })
        const isMatch = await foundUser.isValidPassword(password)
        if (!isMatch) return done(null, false)
        if (!foundUser) return done(null, false)
        done(null, foundUser)
    } catch (err) {
        done(err, false)
    }
}))