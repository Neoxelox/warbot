"use strict";
const fs = require('fs');
const {promisify} = require('util');
const colors = require('colors');

const deleteFile = promisify(fs.unlink);
const deleteDir = promisify(fs.rmdir);
const existsFile = promisify(fs.exists);

async function remove(message, args, parties) {
    if(args[1] != undefined) {
       try {
            parties.find({$or: [{ id: parseInt(args[1]) }, { name: args[1] }]}, async (err, docs) => {
                if(docs.length == 1) {
                    if((docs[0].password === null) || (docs[0].password === args[2])) {
                        if(await existsFile(docs[0].map.path + "/map.svg")) await deleteFile(docs[0].map.path + "/map.svg");
                        if(await existsFile(docs[0].map.path)) await deleteDir(docs[0].map.path);

                        let remId = docs[0].id;
                        let remName = docs[0].name;
                        parties.remove({_id: docs[0]._id}, (err, nRemoved) => {
                            if(!err) message.channel.send(`**Successfully deleted party** \`${remName}\` **with id** \`${remId}\`**.** 💥`);
                        });
                    } else {
                        message.channel.send("**Wrong password for the party!** 🤨");
                    }
                } 
                else if(docs.length > 1) {
                    let msg = "**Multiple parties found!** 🧐 Please specify with the \`id\`: \n";
                    for (let i in docs) { // MAYBE PUT ALSO THE PLAYERS TO HELP SEARCHING
                        msg += `\`> delete ${docs[i].id}\` **Created at** \`${docs[i].createdAt.toLocaleString()}\` **Status** \`${docs[i].status}\` \n`;
                    }
                    message.channel.send(msg);
                } else message.channel.send("No party found with that \`name\` or \`id\` 🤔");
            });   
       } catch (error) {
            console.log(colors.bgRed.white.bold(" ERROR ") + colors.bgMagenta.white("", message.createdAt.toLocaleString(), "") + colors.bgCyan.white(" TO ") + colors.bgGreen.white("", message.author.username,"") + colors.bgBlack.white(` ${error} `));
            message.channel.send("Sorry, something went wrong 😓");
       }
    }
    else {
        message.channel.send(`No \`[Party name/id]\` specified for ***> delete*** order! <@${message.author.id}>, type ** *> help* ** .`);
    }
}

module.exports = remove;