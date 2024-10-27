let playersArray = [];

function handleSubmit(event) {
    event.preventDefault();
    const playerInput = document.getElementById('playerInput').value;
    const players = playerInput.split(',');
    players.forEach(player => {
        const trimmedPlayer = player.trim();
        if (trimmedPlayer) {
            playersArray.push(trimmedPlayer);
            displayPlayers();
        }
    });
    document.getElementById('playerInput').value = '';
    printPlayersArray();
}

function displayPlayers() {
    const playersList = document.getElementById('players');
    playersList.innerHTML = '';
    playersArray.forEach(player => {
        const playerElement = document.createElement('li');
        playerElement.textContent = player;
        playerElement.classList.add('player');
        playersList.appendChild(playerElement);
    });
}

function printPlayersArray() {
    console.log(playersArray);
}

function shufflePlayers() {
    playersArray.sort(() => Math.random() - 0.5);
    displayPlayers();
    const team1 = playersArray.slice(0, playersArray.length / 2);
    const team2 = playersArray.slice(playersArray.length / 2);
    console.log('Team 1:', team1);
    console.log('Team 2:', team2);

    const team1Element = document.getElementById('team-1');
    const team2Element = document.getElementById('team-2');
    team1Element.innerHTML = '';
    team2Element.innerHTML = '';
    team1.forEach(player => {
        const playerElement = document.createElement('p');
        playerElement.textContent = player;
        team1Element.appendChild(playerElement);
    });
    team2.forEach(player => {
        const playerElement = document.createElement('p');
        playerElement.textContent = player;
        team2Element.appendChild(playerElement);
    });

    // Display the download button after shuffling teams
    document.getElementById('download').style.display = 'inline';
}

document.getElementById('clear').addEventListener('click', () => {
    playersArray = [];
    displayPlayers();
    printPlayersArray();
});

document.getElementById('shuffle').addEventListener('click', shufflePlayers);

function generateTeamImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    ctx.fillStyle = '#3b3b3b'; // Background color of .result
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate center positions
    const centerX = canvas.width / 2;

    // Team 1
    ctx.fillStyle = '#2c2c2c'; // Background color for team 1
    ctx.fillRect(centerX - 150, 40, 300, 240); // Centered rectangle for team 1
    ctx.fillStyle = '#ffffff'; // Text color for team 1
    ctx.font = '24px Segoe UI, Tahoma, Geneva, Verdana, sans-serif'; // Font style of .result
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000'; // Red color for team 1 title
    ctx.fillText('Team 1:', centerX, 120); // Centered Team 1 title
    ctx.font = '18px Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
    playersArray.slice(0, playersArray.length / 2).forEach((player, index) => {
        ctx.fillText(player, centerX, 160 + index * 20); // Centered Team 1 players
    });

    // Team 2
    ctx.fillStyle = '#2c2c2c'; // Background color for team 2
    ctx.fillRect(centerX - 150, 320, 300, 240); // Centered rectangle for team 2
    ctx.fillStyle = '#ffffff'; // Text color for team 2
    ctx.fillText('Team 2:', centerX, 400); // Centered Team 2 title
    playersArray.slice(playersArray.length / 2).forEach((player, index) => {
        ctx.fillText(player, centerX, 440 + index * 20); // Centered Team 2 players
    });

    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'teams.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('download').addEventListener('click', generateTeamImage);

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            teamResult: "Team Result",
            team1: "Team 1",
            team2: "Team 2",
            control: "Control",
            shuffle: "Shuffle",
            clear: "Clear",
            download: "Download",
            teamSelection: "Team Selection",
            enterPlayerNames: "Enter Player Names (comma separated):",
            submit: "Submit",
            playerList: "Player List",
            selectLanguage: "Select Language:"
        },
        fr: {
            teamResult: "Résultat de l'équipe",
            team1: "Équipe 1",
            team2: "Équipe 2",
            control: "Contrôle",
            shuffle: "Mélanger",
            clear: "Effacer",
            download: "Télécharger",
            teamSelection: "Sélection de l'équipe",
            enterPlayerNames: "Entrez les noms des joueurs (séparés par des virgules):",
            submit: "Soumettre",
            playerList: "Liste des joueurs",
            selectLanguage: "Choisir la langue:"
        },
        es: {
            teamResult: "Resultado del Equipo",
            team1: "Equipo 1",
            team2: "Equipo 2",
            control: "Control",
            shuffle: "Mezclar",
            clear: "Limpiar",
            download: "Descargar",
            teamSelection: "Selección de Equipo",
            enterPlayerNames: "Ingrese los nombres de los jugadores (separados por comas):",
            submit: "Enviar",
            playerList: "Lista de Jugadores",
            selectLanguage: "Seleccionar Idioma:"
        }
    };

    function languageSystem() {
        const languageSelect = document.getElementById('language-select');
        const language = languageSelect.value;
        const texts = translations[language];

        document.querySelector('.result.side h2').textContent = texts.teamResult;
        document.querySelector('.team:nth-of-type(1) h3:nth-of-type(1)').textContent = texts.team1;
        document.querySelector('.team:nth-of-type(2) h3:nth-of-type(1)').textContent = texts.team2;
        document.querySelector('.control.side h2').textContent = texts.control;
        document.getElementById('shuffle').textContent = texts.shuffle;
        document.getElementById('clear').textContent = texts.clear;
        document.getElementById('download').textContent = texts.download;
        document.querySelector('.team.side h2').textContent = texts.teamSelection;
        document.querySelector('label[for="playerInput"]').textContent = texts.enterPlayerNames;
        document.querySelector('button[type="submit"]').textContent = texts.submit;
        document.querySelector('#playerList h3').textContent = texts.playerList;
        document.querySelector('label[for="language-select"]').textContent = texts.selectLanguage;

        document.documentElement.lang = language;
    }

    document.getElementById('language-select').addEventListener('change', languageSystem);
    languageSystem();
});
