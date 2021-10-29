const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  test('GET / responds with hi', async() => {
    const resp = await request(app).get('/');
    expect(resp.text).toEqual('hi');
  });

  test('POST /echo responses with the request body', async() => {
    const resp = await request(app)
      .post('/echo')
      .send('bob');

    expect(resp.text).toEqual('bob');
  });

  test('GET /red gets a big red', async() => {
    const resp = await request(app)
      .get('/red');
    expect(resp.text).toEqual('<h1>red</h1>');
  });

  test('GET /green gets a big green', async() => {
    const resp = await request(app)
      .get('/green');
    expect(resp.text).toEqual('<h1>green</h1>');
  });

  test('GET /blue gets a big blue', async() => {
    const resp = await request(app)
      .get('/blue');
    expect(resp.text).toEqual('<h1>blue</h1>');
  });

});
