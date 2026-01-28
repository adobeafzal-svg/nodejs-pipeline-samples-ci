const request = require('supertest');
const { app, add, multiply } = require('../app');

describe('Unit Tests', () => {
  // Test 1: Test the add function
  test('add function should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(10, 20)).toBe(30);
    expect(add(0, 0)).toBe(0);
  });

  // Test 2: Test the multiply function
  test('multiply function should correctly multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(5, 5)).toBe(25);
    expect(multiply(0, 10)).toBe(0);
  });
});

describe('API Integration Tests', () => {
  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.timestamp).toBeDefined();
  });

  test('POST /calculate/add should add two numbers', async () => {
    const response = await request(app)
      .post('/calculate/add')
      .send({ a: 5, b: 3 });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test('POST /calculate/multiply should multiply two numbers', async () => {
    const response = await request(app)
      .post('/calculate/multiply')
      .send({ a: 4, b: 5 });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(20);
  });

  test('POST /calculate/add should return error for invalid input', async () => {
    const response = await request(app)
      .post('/calculate/add')
      .send({ a: 'invalid', b: 3 });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Both a and b must be numbers');
  });
});
