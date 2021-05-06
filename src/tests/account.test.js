const request = require('supertest');
const app = require('../../app');
const dataHandler = require('./datahandler');
const authSignUp = require('./authhandler');
const accountModel = require('../models/accountsModel');

beforeAll(async() => await dataHandler.openConnections());

beforeEach(async () => {
    await createAccount();

});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());


describe('get store accounts', () =>  {
    it('Should get accounts related to a store', async () => {
        const authToken = await authSignUp();
        const res = await request(app)
                                .get(`/api/v1/account/store/${accountItem.storeId}`)
                                .set('Authorization', 'Bearer ' + authToken);
        expect(res.statusCode).toEqual(200);
    });
});

describe('get a specific account record', () => {
  it('Should get a specific record account', async () => {
      const authToken = await authSignUp();
      const res = await request(app)
                              .get(`/api/v1/account/${accountItem.accountRef}`)
                              .set('Authorization', 'Bearer '+ authToken);
      expect(res.statusCode).toEqual(200);
  })
})

const createAccount = async () => {
  const acc = await accountModel.create(accountItem);
}


const accountItem = {
  credit: 0,
  debit: 15600,
  creationTimeStamp: "2021-04-28T19:19:39.488Z",
  accountRef: "HAP000000005",
  transactionRef: "OA2EXWAK02",
  storeId: "608815e392b152376c8ef07e",
  description: "OA2EXWAK02 FOR 13"
}

  