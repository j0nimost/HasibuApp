const request = require("supertest");
const app = require('./apptesthandler');
const dataHandler = require('./datahandler');
const storeModel = require('../models/storesModel');

beforeAll(async () => await dataHandler.openConnections());

beforeEach(async () => {
	await createStore();
});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());


describe('post a new store', () => {
  it('Should create a new store', async () => {
    const res = await request(app)
								.post('/api/v1/stores')
								.send(storeItem);
	expect(res.statusCode).toEqual(201);
	expect(res.body.status).toEqual("Success");
  });
});

describe('get all the stores', () => {
	it('Should get all the stores', async () => {
		const res = await request(app)
									.get('/api/v1/stores');

		expect(res.statusCode).toEqual(200);
		expect(res.body.status).toEqual("Success");
	});
});

describe('get a specific store', () => {
	it('Should get a specific store', async () => {
		const res = await request(app)
									.get(`/api/v1/stores/${storeId}`);

	expect(res.statusCode).toEqual(200);
	expect(res.body.status).toEqual("Success");
	expect(res.body.data._id).toEqual(storeId);
	});
});


describe('update a specific store', () => {
	const storeUpdate ={
		businessName:"KPaul",
		location: "Kwata ka waya",
		town: "Kitui",
		county: "Kitui",
		ownerEmail:"lolEmail@gmail.com",
		ownerMobile:"023232232"
	  }

	it('Should update a specific store', async () => {
		const res = await request(app)
									.patch(`/api/v1/stores/${storeId}`)
									.send(storeUpdate);
		expect(res.statusCode).toEqual(200);
		expect(res.body.status).toEqual("Success");
	});
});

describe('delete a store', () => {
	it('Should delete a Store', async () => {
		const res = await request(app)
								.delete(`/api/v1/stores/${storeId}`);
		expect(res.statusCode).toEqual(204);
	});
});


const createStore = async () => {
	const store = await storeModel.create(storeItem);
	storeId = store.id;
}

let storeId; 

const storeItem ={
  businessName:"Kate & Paul",
  location: "Makongeni",
  town: "Thika",
  county: "Kiambu",
  ownerEmail:"lolEmail@gmail.com",
  ownerMobile:"023232232"
}
