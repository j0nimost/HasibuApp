const request = require('supertest');
const app = require('../../app');
const dataHandler = require('./datahandler');
const authSignUp = require('./authhandler');
const storeModel = require('../models/storesModel');
const invoiceModel = require('../models/invoiceModel');
const payment = require('../models/paymentModel');

beforeAll(async () => await dataHandler.openConnections());

beforeEach(async () => {
    await createStore();
    await createInvoice();
});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());

describe('post a new payment', () => {
    it('should create a new payment', async () => {
        const authToken = await authSignUp();
        const res = await request(app).post('/api/v1/payment')
                                        .set('Authorization', 'Bearer ' + authToken)
                                        .send(paymentItem);
        expect(res.statusCode).toEqual(204);
    });
});



const createStore = async () => {
    const store = await storeModel.create(storeItem);
    storeId = store._id;
}

const createInvoice = async () => {
    const invoice = await invoiceModel.create(invoiceItem);
    invoiceNo = invoice.invoiceNo;
}

let storeId;
let invoiceNo;

const invoiceItem = {
    businessId: "6089c1bb76ada093dcb6d2af",
    grossAmount: 34300.00,
    netAmount: 34754.99,
    invoiceNo: 1,
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

const paymentItem = {
    paymentRefId: "OA2EXWAK0H",
    invoiceRef: 1,
    amount: 5000.00,
    paymentChannel: "MPESA",
    paidBy: "John Kiriamiti",
    paymentDate: Date.now()
}