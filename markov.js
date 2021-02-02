/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.distinctWords = [...(new Set(this.words))];
    this.makeChains();
    this.getCapitalWords(this.distinctWords);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let chains = {};

    for(let word of this.distinctWords){

      chains[word] = this.words.filter(function(currentValue, index, arr){

        return arr[index-1] == word;
      });

      let setWordChain = new Set(chains[word]);
      chains[word] = [...setWordChain];
    }

    let lastWord = this.words[this.words.length-1];
    chains[lastWord].push(null);
    this.chains = chains;
  }

  /** return random text from chains */
  makeText(numWords = 100){

    let minWords = this.words.length>=10 ? 10:1; 
    let nextWord = this.selectRandomWord(this.capitalWords)
    let text = [nextWord];

    while(nextWord != null && numWords>0 && !(this.checkEnd(nextWord) && text.length > minWords)){

      numWords--;
      nextWord = this.selectRandomWord(this.chains[nextWord]);
      text.push(nextWord);
    }

    text = text.join(' ');
    this.text = text;
  }

  selectRandomWord(wordArr){

    let maxIndex = wordArr.length-1;
    let randIndex = Math.floor(Math.random() * (maxIndex + 1));
    return wordArr[randIndex];
  }

  getCapitalWords(words){

    this.capitalWords =  words.filter((word) => {
      if(word >= 'A' && word <= 'Z'){
        return word;
      }
    });
  }

  checkEnd(word){

    let endChars = ['?','.','!'];

    for( let endChar of endChars){

      if( word.includes(endChar)){
        return true;
      }
    }
    return false;
  }
}


module.exports = {

  MarkovMachine:MarkovMachine
}