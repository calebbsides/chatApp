import hashFunction from 'crypto-js/sha256';

export default class Block {
    constructor(data, previousHash = '') {
        this.setTime(Date.now());
        this.setData(data);
        this.setPreviousHash(previousHash);
        this.setHash(this.calculateHash());
        this.nonce = 0;
    }

    getTime() {
        return this.time;
    }

    setTime(time) {
        this.time = time;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getPreviousHash() {
        return this.previousHash;
    }

    setPreviousHash(previousHash) {
        this.previousHash = previousHash;
    }

    getHash() {
        return this.hash;
    }

    setHash(hash) {
        this.hash = hash;
    }

    calculateHash() {
        return hashFunction(this.time + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }
    
    mineBlock(difficulty) {
        while (this.getHash().substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.setHash(this.calculateHash());
        }
        console.log('Mined block: ' + this.hash);
    }
}