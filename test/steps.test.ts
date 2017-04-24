import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/steps/:uuid', () => {

    it('should respond with a JSON array', () => {
        return chai.request(app).get('/api/v1/steps/5bf46fca-0dd7-4e77-8ec6-f55dbac415ed')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data.Items).to.be.a('array');
                expect(res.body.data.Items).to.have.length(7);
            })
    });

    it('should include an initiated status step', () => {
        return chai.request(app).get('/api/v1/steps/5bf46fca-0dd7-4e77-8ec6-f55dbac415ed')
            .then(res => {
                let step = res.body.data.Items.find(step => step.status === 'initiated');
                expect(step).to.exist;
                expect(step).to.have.all.keys([
                    'trip_instance_uuid',
                    'timestamp',
                    'status'
                ]);
            });
    });

});
