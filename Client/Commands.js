const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'group2',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
            args: [
                {
                    key: 'command',
                    prompt: 'Which command is not working as intended?',
                    type: 'string'
                },
                {
                    key: 'bug',
                    prompt: 'What seems to be the bug?',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { command, bug }) {
        return user.send(content);
    }
};