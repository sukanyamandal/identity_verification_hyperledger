'use strict';

const { Contract } = require('fabric-contract-api');

class IdentityVerification extends Contract {
    async initLedger(ctx) {
        console.info('Initializing the ledger...');
    }

    async createIdentity(ctx, id, firstName, lastName, dob, ssn) {
        const identity = {
            firstName,
            lastName,
            dob,
            ssn,
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
        return JSON.stringify(identity);
    }

    async verifyIdentity(ctx, id, ssn) {
        const identityAsBytes = await ctx.stub.getState(id);
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`Identity with ID ${id} does not exist.`);
        }

        const identity = JSON.parse(identityAsBytes.toString());

        return identity.ssn === ssn;
    }

    async updateIdentity(ctx, id, newFirstName, newLastName, newDob, newSsn) {
        const identityAsBytes = await ctx.stub.getState(id);
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`Identity with ID ${id} does not exist.`);
        }

        const updatedIdentity = {
            firstName: newFirstName,
            lastName: newLastName,
            dob: newDob,
            ssn: newSsn,
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedIdentity)));
        return JSON.stringify(updatedIdentity);
    }

    async deleteIdentity(ctx, id) {
        const identityAsBytes = await ctx.stub.getState(id);
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`Identity with ID ${id} does not exist.`);
        }

        await ctx.stub.deleteState(id);
    }

    async getIdentity(ctx, id) {
        const identityAsBytes = await ctx.stub.getState(id);
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`Identity with ID ${id} does not exist.`);
        }

        return identityAsBytes.toString();
    }
}

module.exports = IdentityVerification;
