import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import sinon from 'sinon';
import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago';
import { PLAN_IDS } from '/imports/constants';
import {
  MercadoPagoPlansCollection,
  ProductsCollection,
} from '/imports/api/subscriptions/collections';
import { MercadoPagoPlan } from '/imports/models/mercado-pago-plans';

describe('create-preapproval-plans', function () {
  let sandbox: sinon.SinonSandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    // Mock Meteor settings
    Meteor.settings = {
      public: {},
      mercadoPago: {
        accessToken: 'test_access_token',
      },
    };

    // Mock Collections
    sandbox.stub(ProductsCollection, 'find').returns({
      fetchAsync: sandbox.stub().returns([
        { _id: 'product1', name: 'Premium Monthly', active: true, createdAt: new Date(), updatedAt: new Date(), prices: [{ _id: 'price1', productId: 'product1', amount: 100, currency: 'BRL', interval: 'month', intervalCount: 1, active: true, createdAt: new Date(), updatedAt: new Date() }] },
        { _id: 'product2', name: 'Premium Yearly', active: true, createdAt: new Date(), updatedAt: new Date(), prices: [{ _id: 'price2', productId: 'product2', amount: 1000, currency: 'BRL', interval: 'year', intervalCount: 1, active: true, createdAt: new Date(), updatedAt: new Date() }] },
      ]),
    } as any);
    sandbox.stub(MercadoPagoPlansCollection, 'findOneAsync').resolves(null);
    sandbox.stub(MercadoPagoPlansCollection, 'insertAsync').resolves('newPlanId');

    // Mock MercadoPago API
    sandbox.stub(PreApprovalPlan.prototype, 'create').resolves({ id: 'mp_plan_id', api_response: {} } as any);

    // Mock console.log to suppress output during tests
    sandbox.stub(console, 'log');

    // Mock the environment variable to ensure the function runs
    sandbox.stub(process, 'env').value({ CREATE_MP_PLANS: '1' });
  });

  afterEach(function () {
    sandbox.restore();
    // Clean up environment variable after each test
    delete process.env.CREATE_MP_PLANS;
  });

  it('should create new pre-approval plans if they do not exist', async function () {
        const { createPreapprovalPlans } = await import('../server/setup/create-preapproval-plans');
        await createPreapprovalPlans();

    assert.isTrue((MercadoPagoPlansCollection.findOneAsync as sinon.SinonStub).calledWith({
      _id: 'plan_product1_price1',
    }));
    assert.isTrue((MercadoPagoPlansCollection.findOneAsync as sinon.SinonStub).calledWith({
      _id: 'plan_product2_price2',
    }));

    assert.isTrue((PreApprovalPlan.prototype.create as sinon.SinonStub).calledTwice);
        assert.strictEqual((MercadoPagoPlansCollection.insertAsync as sinon.SinonStub).callCount, 2);

    const firstPlanCall = (MercadoPagoPlansCollection.insertAsync as sinon.SinonStub).getCall(0).args[0];
    assert.strictEqual(firstPlanCall.mercadoPagoId, 'mp_plan_id');
    assert.strictEqual(firstPlanCall._id, 'plan_product1_price1');

    const secondPlanCall = (MercadoPagoPlansCollection.insertAsync as sinon.SinonStub).getCall(1).args[0];
    assert.strictEqual(secondPlanCall.mercadoPagoId, 'mp_plan_id');
    assert.strictEqual(secondPlanCall._id, 'plan_product2_price2');
  });

  it('should not create plans if they already exist', async function () {
        // Override findOneAsync to return an existing plan
        (MercadoPagoPlansCollection.findOneAsync as sinon.SinonStub).resolves({ _id: 'plan_product1_price1', mercadoPagoId: 'existing_mp_id' });

        const { createPreapprovalPlans } = await import('../server/setup/create-preapproval-plans');
        await createPreapprovalPlans();

    assert.isFalse((PreApprovalPlan.prototype.create as sinon.SinonStub).called);
    assert.isFalse((MercadoPagoPlansCollection.insertAsync as sinon.SinonStub).called);
    assert.isTrue((console.log as sinon.SinonStub).calledWith('✔ Plan plan_product1_price1 already exists.'));
    assert.isTrue((console.log as sinon.SinonStub).calledWith('✔ Plan plan_product2_price2 already exists.'));
  });

  it('should not run if CREATE_MP_PLANS environment variable is not set to "1"', async function () {
        delete process.env.CREATE_MP_PLANS;

        const { createPreapprovalPlans } = await import('../server/setup/create-preapproval-plans');
        await createPreapprovalPlans();

    assert.isFalse((PreApprovalPlan.prototype.create as sinon.SinonStub).called);
    assert.isFalse((MercadoPagoPlansCollection.insertAsync as sinon.SinonStub).called);
  });
});