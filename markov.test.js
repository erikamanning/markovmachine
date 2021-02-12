const { MarkovMachine } = require('./markov');

const text =  
    `Oh, I'm being eaten By a boa constrictor. Yes, a boa constrictor.`;

const testMachine = new MarkovMachine(text);
describe('Get words', () => {

    test("Gets correct count of words from input text", async function(){

        expect(testMachine.words.length).toEqual(12);
    });
});

describe('Get word chaine', () => {

    test("Gets correct count of word chains", async function(){

        expect(Object.keys(testMachine.chains).length).toEqual(9);
        console.log(testMachine.chains);
        expect(testMachine.chains).toEqual({
            'Oh,': [ "I'm" ],
            "I'm": [ 'being' ],
            being: [ 'eaten' ],
            eaten: [ 'By' ],
            By: [ 'a' ],
            a: [ 'boa' ],
            boa: [ 'constrictor.' ],
            'constrictor.': [ 'Yes,', null ],
            'Yes,': [ 'a' ]
          });
    });
});

describe('Get unique words', () => {

    test("Gets correct count of unique words from input text", async function(){

        expect(testMachine.distinctWords.length).toEqual(9);
    });
});

describe('Word selection utility functiont tests', () => {

    test("Selects capitals words from array of words", async function(){

        expect(testMachine.capitalWords.length).toEqual(4);
    });

    test('checkEnd function finds if current word ends a sentence', () => {

        expect(testMachine.checkEnd('constrictor.')).toBeTruthy();
        expect(testMachine.checkEnd('boa')).toBeFalsy();
    });
});

