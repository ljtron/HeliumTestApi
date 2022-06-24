const { exec } = require("child_process");
var Regex = require("regex");


//var regex = new Regex(/(a|b)*abb/);
const re = new RegExp('/[]/');
const res = new RegExp("/\[(.*?)\]/")
const pattern = /\[(.*?)\]/gi;
exec("python3 ../mqps/config_decoder.py -p 012a30", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    var text = "This is a test string [more or less], [more] and [less] [\n{\n'name': 'Reporting Period',\n'value': '21600'}]";
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    stdout = stdout.replace(/(\r\n|\n|\r)/gm, "");
    console.log(`stdout: \n${stdout.match(pattern)}`);
    console.log(`stdout: \n${stdout}`);
});
