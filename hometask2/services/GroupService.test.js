
const GroupService = require('./GroupService');
const sinon = require("sinon");
const sequelize = require("sequelize");
const GroupModel = require('../dbConnection/models/GroupModel');
const { groups } = require('./groupMock');

describe('GroupService', () => {
    afterEach(function () {
        sinon.restore();
    });
    test('should return all the groups in the system', async () => {
        sinon.stub(GroupModel, 'findAll').returns(groups);
        const result = await GroupService.getGroups();
        expect(result.length).toBe(3);
    });

    test('should return group given a groupId', async () => {
        sinon.stub(GroupModel, 'findById').returns(groups[0]);
        const result = await GroupService.getGroup(1)
        expect(result.id).toBe(1);
    });

    test('should create a new group', () => {
        sinon.stub(GroupModel, 'create').returns(groups[0]);
        const result = await GroupService.createGroup({
            name: 'group4',
            permissions: ['DELETE', 'SHARE', 'WRITE']
        });
        expect(result.name).toMatch(/group4/);;
    });

    test('should update a group', () => {
        sinon.stub(GroupModel, 'updateGroup').returns(groups[0]);
        const result = await GroupService.createGroup({
            name: 'group4',
            permissions: ['DELETE', 'SHARE', 'WRITE']
        });
        expect(result.name).toMatch(/group4/);
    });

});