import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/customers', () => {

    it('should respond with a JSON array', () => {
        return chai.request(app).get('/api/v1/customers')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.length(250);
            })
    });

    it('should include Towney Sandyford', () => {
        return chai.request(app).get('/api/v1/customers')
            .then(res => {
                let towneySandyford = res.body.find(customer => customer.last_name === 'Sandyford');
                expect(towneySandyford).to.exist;
                expect(towneySandyford).to.have.all.keys([
                    'customer_uuid',
                    'first_name',
                    'last_name',
                    'gender',
                    'date_of_birth',
                    'street_address',
                    'country',
                    'email',
                    'phone'
                ]);
            });
    });

});

describe('GET api/v1/customers/:uuid', () => {

    it('should respond with single JSON object', () => {
        return chai.request(app).get('/api/v1/customers/6e183825-4250-459f-8639-2e15e3bd0300')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });

    it('should return Abby Dufoure', () => {
        return chai.request(app).get('/api/v1/customers/6e183825-4250-459f-8639-2e15e3bd0300')
            .then(res => {
                expect(res.body.customer.first_name).to.equal('Abby');
                expect(res.body.customer.last_name).to.equal('Dufoure');
            });
    });

});
