/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');


async function myRead(fileType, fname){

    if(fname && fileType){
        if(fileType == 'url'){

            let res = await axios.get(fname);
            markovTest(res.data)
        }
        else{
    
            fs.readFile(fname, 'utf8', function(err,data){
    
                if(err){
            
                    console.log('ERROR: ',err);
                    process.exit(1);
                }
                else{
                    markovTest(data);
                }
            
            });
        }
    }
    else{
        console.log('File Data Missing. Please try again.')
    }
}

async function markovTest(rFileText){

    try{
        let eggMachine = new MarkovMachine(rFileText);
        eggMachine.makeText();
        console.log(eggMachine.text);
    }
    catch(e){
        console('Process failed. Error: ', e);
        process.exit(1);
    }
}

myRead(process.argv[2], process.argv[3]);
