const request = require('supertest');
const app = require('../app'); // Assuming your Express app instance is exported from app.js

describe('Recipe Controller', () => {
    it('should return homepage with status 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Cooking Blog - Home'); // Assuming this text is present in your homepage
    });

    it('should return singup with status 200', async () => {
        const res = await request(app).get('/signup');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('signup'); // Assuming this text is present in your homepage
    });

    it('should return all recipe with status 200', async () => {
        const res = await request(app).get('/allrecipes');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('allrecipes'); // Assuming this text is present in your homepage
    });   
});
