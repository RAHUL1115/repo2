const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// ? repo1 path and repo1 object path
const REPO1PATH = path.join('/home/rahul/dev/rahul/Task1/repo1')
const REPO1OBJECTPATH = path.join(REPO1PATH,'object/repo1.json')


// * pre prcoess arguments function
function processArgs(){
    program.option('-k1, --key1 <int>')
    program.option('-k2, --key2 <int>');
    program.parse();
    const options = program.opts();
    return options;
}

// * main function
async function main(){
    const options = processArgs();
    try {
        let result = await fs.readFile(REPO1OBJECTPATH,'utf8')
        result = JSON.parse(result);
        result.key1 = options.key1 || result.key1;
        result.key2 = options.key2 || result.key2;
        await fs.writeJSON(REPO1OBJECTPATH,result)
        exec(`cd ${REPO1PATH} && git commit -am 'pre relese' && npm version patch && git push origin master`, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

main()