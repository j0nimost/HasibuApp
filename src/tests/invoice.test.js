const request = require("supertest");
const app = require('./apptesthandler');
const dataHandler = require('./datahandler');
const storeModel = require('../models/storesModel');
const invoiceModel = require('../models/invoiceModel');


beforeAll(async () => await dataHandler.openConnections());

beforeEach(async () => {
   await createStore();
   await createInvoice();
});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());


describe('post a new store invoice', () => {
  it('should create a new invoice', async () => {
    const res = await request(app).post(`/api/v1/invoices/${storeId}`)
                                  .send(invoiceTestModel);
    // console.log(res);
    expect(res.statusCode).toEqual(201);
  });
});

describe('get store invoices', () => {
  it('Should get all invoices', async () => {
    const res = await request(app)
                  .get(`/api/v1/invoices/${storeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Success");
  });
});

describe('get specific invoice', () => {
  it('Should get a single invoice', async () => {
    const res = await request(app).get(`/api/v1/invoices/invoice/${invoiceId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Success");
  });
});

const createStore = async () => {
  const store = await storeModel.create(storeItem);
  
  storeId = store.id;
}

const createInvoice = async () => {
  const invoice = await invoiceModel.create(invoiceTestModel);
  invoiceId = invoice.id;

}

let storeId;
let invoiceId;


const invoiceTestModel = {
  grossAmount: 34300.00,
  netAmount: 34754.99,
  servedBy: "john",
  purchaseItems:[
      {
          item: "Yves Saint Laurent",
          quantity: 5,
          unitCost: 6860,
          grossAmount: 34300.00
      }
  ]
};

const storeItem = {
  businessName:"Kate & Paul",
  location: "Makongeni",
  town: "Thika",
  county: "Kiambu",
  ownerEmail:"kgici@gmail.com",
  ownerMobile:"023232232"
};
