const request = require("supertest");
const app = require('./apptesthandler');
const dataHandler = require('./datahandler');
const storeModel = require('../models/storesModel');
const catalogueModel = require('../models/catalogueModel');

beforeAll(async () => await dataHandler.openConnections());

beforeEach(async () => {
  await createStore();
});

afterEach(async () => await dataHandler.clearDatabase());

afterAll(async () => await dataHandler.closeConnections());


describe('post a new catalogue', () => {
  it('Should create a new catalogue', async () => {
    const res = await request(app).post(`/api/v1/catalogues/store/${storeId}`)
                                  .send(catalogueItem);

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("Success");
  });
});

describe('get a specific catalogue', () => {
  it('Should get a specific catalogue', async() => {
    const res = await request(app)
                                .get(`/api/v1/catalogues/${storeId}/catalogue/${catalogueId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Success");
  });
});

describe('get all the stores catalogues', () => {
  it('Should get all the stores Catalogues', async () => {
    const res = await request(app)
                                .get(`/api/v1/catalogues/store/${storeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Success");
  });
});

describe('update a catalogue', () => {

  // declare update body
  const catalogueUpdate = {
    item: "Yves Saint Laurent Sneakers",
    unitCost: 18500.00,
    stockSize: 15
  };


  it('Should update a catalogue', async () => {
    const res = await request(app)
                                    .patch(`/api/v1/catalogues/${storeId}/catalogue/${catalogueId}`)
                                    .send(catalogueUpdate);

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("Success");

  });
});

describe('delete a catalogue item', () => {
  it('Should delete a catalogue', async () => {

    const res  = await request(app)
                                  .delete(`/api/v1/catalogues/${storeId}/catalogue/${catalogueId}`);


    expect(res.statusCode).toEqual(204);
  });
});



const createStore = async () => {
  const store = await storeModel.create(storeItem);
  storeId = store.id;
  catalogueId = store.catalogues[0].id;
}

let storeId;
let catalogueId;


const catalogueItem ={
  item: "Calvin Klein Sneakers",
  unitCost: 5000.00,
  stockSize: 14
}

const storeItem = {
  businessName:"Kate & Paul",
  location: "Makongeni",
  town: "Thika",
  county: "Kiambu",
  ownerEmail:"kgici@gmail.com",
  ownerMobile:"023232232",
  catalogues: [catalogueItem]
};

