import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import faker from 'faker'
import mongoose from 'mongoose'
import Server from '../app';
import loggerService from '../utils/logger.service';
import 'mocha'

chai.use(chaiHttp)

describe('Users Routes', () => {
    const routes = {
        signup: '/api/users/signup',
        signin: '/api/users/signin',
        secret: '/api/users/secret'
    }
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    const preSave = {
        email: 'mr.test@mail.com',
        password: faker.internet.password()
    }
    const server = new Server().app
    let token = ''
    before(async () => {
        const result = await chai
            .request(server)
            .post(routes.signup)
            .send(preSave)
        expect(result.status).to.equal(200);
        token = result.body.token
    })
    after('Dropping test db', async () => {
        await mongoose.connection.dropDatabase(() => {
            loggerService.debug('\n Database Dropped', false)
        })
        await mongoose.connection.close()
    })
    describe('Signup Route', () => {
        it('should create a new user if email not found', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(routes.signup)
                    .send(user)
                expect(result.status).to.equal(200);
                expect(result.body).not.to.be.empty;
                expect(result.body).to.have.property('token');
            } catch (err) {
                loggerService.error(err);
            }
        })
    })
})