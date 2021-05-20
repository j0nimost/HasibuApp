const request = require("supertest");
const app = require('../../app');
const dataHandler = require('./datahandler');
const authSignUp = require('./authhandler');
const storeModel = require('../models/storesModel');
beforeAll(async () => {
	await dataHandler.openConnections();
	
});

beforeEach(async () => {
	await createStore();
});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());


describe('post a new store', () => {
  it('Should create a new store', async () => {
	const authToken = await authSignUp();
    const res = await request(app)
								.post('/api/v1/stores')
								.set('Authorization', 'Bearer ' + authToken)
								.send(storeItem);
	expect(res.statusCode).toEqual(201);
	expect(res.body.status).toEqual("Success");
  });
});

describe('get all the stores', () => {
	it('Should get all the stores', async () => {
		const authToken = await authSignUp();
		const res = await request(app)
									.get(`/api/v1/stores/user/${storeItem.userId}`)
									.set('Authorization', 'Bearer ' + authToken);

		expect(res.statusCode).toEqual(200);
		expect(res.body.status).toEqual("Success");
	});
});

describe('get a specific store', () => {
	it('Should get a specific store', async () => {
		const authToken = await authSignUp();
		const res = await request(app)
									.get(`/api/v1/stores/${storeId}`)
									.set('Authorization', 'Bearer ' + authToken);

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
		const authToken = await authSignUp();
		const res = await request(app)
									.patch(`/api/v1/stores/${storeId}`)
									.set('Authorization', 'Bearer '+ authToken)
									.send(storeUpdate);
		expect(res.statusCode).toEqual(200);
		expect(res.body.status).toEqual("Success");
	});
});

describe('delete a store', () => {
	it('Should delete a Store', async () => {
		const authToken = await authSignUp();
		const res = await request(app)
								.delete(`/api/v1/stores/${storeId}`)
								.set('Authorization', 'Bearer ' + authToken);
		expect(res.statusCode).toEqual(204);
	});
});


const createStore = async () => {
	const store = await storeModel.create(storeItem);
	storeId = store.id;
}

let storeId; 

const storeItem ={
  userId: "6093acb3cee35aaa60d44f23",
  businessName:"Kate & Paul",
  location: "Makongeni",
  town: "Thika",
  county: "Kiambu",
  ownerEmail:"lolEmail@gmail.com",
  ownerMobile:"023232232"
}

