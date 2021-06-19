
const UserService = require('./UserService');
const sinon = require("sinon");
const sequelize = require("sequelize");
const userModal = require('../dbConnection/models/UserModel');
const { users } = require('./UserService.Mock');

describe('Userservice', () => {

    afterEach(function () {
        sinon.restore();
    });

    test('Should return all the users', async () => {
        sinon.stub(userModal, 'findAll').returns(users);
        const result = await UserService.getAllUser();
        expect(result.length).toBe(4);
    });

    test('Should return user give by Id', async () => {
        sinon.stub(userModal, 'findAll').returns([users[1]]);
        const result = await UserService.getUser(2);
        expect(result.id).toBe(2);
    });

    test('Should return user give by Id with credentials', async () => {
        sinon.stub(userModal, 'findAll').returns([users[1]]);
        const result = await UserService.getUser(2);
        expect(result.login).toMatch(/Inès/);;
    });

    test('Should add new user', async () => {
        sinon.stub(userModal, 'create').returns(users[1]);
        const result = await UserService.addUser({
            "login":"SPsingh",
            "password":"test12345",
            "age": 34
        });
        expect(result.login).toMatch(/Inès/);;
    });

    test('Should update user', async () => {
        sinon.stub(userModal, 'update').returns(users[3]);
        const result = await UserService.updateUser(1, {
            "login":"hello",
            "password":"test12345",
            "age": 34
        });
        expect(result.login).toMatch(/hello/);;
    });
})