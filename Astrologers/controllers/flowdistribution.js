const lodash = require("lodash");

function distributeUsers(users, astrologers) {
    const numAstro = astrologers.length;
    const numUsers = users.length;
    const usersPerAstro = Math.floor(numUsers / numAstro);

    astrologers.forEach((astrologer, index) => {
        const startIndex = index * usersPerAstro;
        const assignedUsers = users.slice(startIndex, startIndex + usersPerAstro);
        if (!astrologer.users) {
            astrologer.users = [];
        }
        astrologer.users.push(...assignedUsers);
    });

    return astrologers; 
}

module.exports = distributeUsers;
