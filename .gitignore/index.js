
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
    member.guild.channels.get('608061468197388288').send({embed: {
        color: 3447003,
        author: {
            name: member.user.tag,
            icon_url: member.user.avatarURL,
        },
        fields: [{
            name: ":white_check_mark: Bienvenue sur __**Killer Frost Support**__.",
            value: "Nous vous remercions d'avoir rejoint le serveur.",
          },
        ],
    }});
});

client.on('guildMemberRemove', member => {
    // Paumés
    member.guild.channels.get('608061468197388288').send({embed: {
        color: 3447003,
        author: {
            name: member.user.tag,
            icon_url: member.user.avatarURL,
        },
        fields: [{
            name: ":no_entry_sign: __**Killer Frost Support**__ vous remercie de votre visite.",
            value: "Ce n'est qu'un au-revoir.",
          },
        ],
    }});
});

client.on('ready', () => {
    console.log("Connecter entant que " + client.user.username + client.user.tag)

});


    


client.on('message', message => {
    var args = message.content.split(" ").slice(1);
    const word = args.join(" ");    
    const config = require('./config.js')
    if(message.author.bot) return 
    if(message.content.indexOf(config.prefix) !== 0) return



    if (message.content === '§bug open') {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Support Staff")) return message.channel.send(`NO`);
        if (message.guild.channels.exists("name", "bug-" + message.author.username)) return message.channel.send(`Vous possedez actuellement un ticket`);
            message.guild.createChannel(`bug-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.delete();
            const embed2 = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setAuthor(`${message.author.tag}`, `${message.author.avatarURL} `)    
                .addField(`:white_check_mark: Ticket support ouvert. #${c.name}.`, `Commande: §ticket open`)
            message.channel.send({
                embed: embed2
            });
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setAuthor(`${message.author.tag}`, `${message.author.avatarURL} `)    
                .addField(`Bienvenue dans votre salon`, `Veuillez expliquer votre problème en détails pour qu'un membre du support s'en charge.`)
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console
    }

    // Close ticket command
    if (message.content === '§ticket close') {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Vous pouvez uniquement utiliser cette commande dans votre salon de support.`);
        // Confirm delete - with timeout (Not command)
        message.channel.delete();
    }



});





client.login(process.env.TOKEN) 
