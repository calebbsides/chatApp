import Block from "./block";

export default class Blockchain {
    constructor( messages, reward, difficulty ) {
        this.chain = [this.createGenesis()];
        this.setPendingMessages(messages);
        this.setReward(reward);
        this.setDifficulty(difficulty);
    }

    getPendingMessages() {
        return this.pendingTransactions;
    }

    setPendingMessages(pendingMessages) {
        this.pendingMessages = pendingMessages;
    }

    getReward() {
        return this.reward;
    }

    setReward(reward) {
        this.reward = reward;
    }

    getDifficulty() {
        return this.difficulty;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    getChain() {
        return this.chain;
    }

    createGenesis() {
        return new Block();
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addMessage(message) {
        this.pendingMessages.push(message);
    }

    minePendingMessages() {
        let block = new Block(this.getPendingMessages(), this.getLastBlock().getHash());
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.setPendingMessages([]);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {

            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.getHash() !== currBlock.calculateHash()) {
                return false;
            }

            if (currBlock.getPreviousHash() !== prevBlock.getHash()) {
                return false;
            }
        }

        return true;
    }
}