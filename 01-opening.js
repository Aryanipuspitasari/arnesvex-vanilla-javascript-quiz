// UI opening

// IMPORT PACKAGE

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import {
  loadBeginnerQuestions,
  loadIntermediateQuestions,
  loadAdvancedQuestions,
} from "./03-question.js";
import { handleQuiz } from "./02-handlequiz.js";
import { befüllen } from "./pyramidFunction.js";
import { farbenArray } from "./farbenArray.js";

/*
Die mainMenu-Funktion zeigt ein Hauptmenü für das Spiel an. Sie beginnt und sie definiert eine Reihe von Auswahlmöglichkeiten, aus denen der Benutzer wählen kann. Diese Auswahl umfasst "Anfänger", "Fortgeschrittene", "Fortgeschrittene" und "Beenden"

*/

function mainMenu() {
  console.log(
    chalk.bold.blueBright(
      "***************************************************\n          ARNESVEX GAME - Main Menu\n***************************************************\n"
    )
  );

  const choices = [
    { name: "Beginner", value: "1" },
    { name: "Intermediate", value: "2" },
    { name: "Advanced", value: "3" },
    { name: "Exit", value: "4" },
  ];

  /* aus inquirer library 
  Es verwendet inquirer.prompt, um eine Aufforderung im Stil einer Liste zu erstellen, aus der der Benutzer die gewünschte Stufe auswählen kann. Wenn der Benutzer eine Auswahl trifft, wird der .then-Block ausgeführt, wobei die ausgewählte Stufe in answers.level gespeichert wird.
  
  */

  inquirer
    .prompt([
      {
        type: "list",
        name: "level",
        message: chalk.redBright.bold("Please select your level."),
        choices: choices,
      },
    ])
    .then((answers) => {
      handleSelectedLevel(answers.level);
    });
}

/*
Die Funktion handleSelectedLevel nimmt die vom Benutzer gewählte Stufe als Parameter an. Sie löscht die Konsole und gibt eine Meldung aus, die den Beginn eines bestimmten Levels entsprechend der Auswahl des Benutzers anzeigt.

*/

function handleSelectedLevel(choice) {
  let questions;
  switch (choice) {
    case "1":
      console.clear();
      console.log("Starting with Beginner Level...");
      // the function for beginner level will be placed here
      questions = loadBeginnerQuestions();
      break;
    case "2":
      console.clear();
      console.log("Starting with Intermediate Level...");
      // the function for intermediate level will be placed here
      questions = loadIntermediateQuestions();
      break;
    case "3":
      console.clear();
      console.log("Starting with Advanced Level...");
      // the function for advanced level will be placed here
      questions = loadAdvancedQuestions();
      break;
    case "4":
      console.clear();
      console.log("Closing the Pyramid...");
      console.log(chalk.bold.redBright("\nThank you for playing with us !"));
      console.log(
        chalk.bold.redBright(`
        ____               _  
       |  _ \\             | | 
       | |_) |_   _  ___  | | 
       |  _ <| | | |/ _ \\ | | 
       | |_) | |_| |  __/ |_| 
       |____/ \\__, |\\___| (_) 
               __/ |          
              |___/           
      `)
      );
      process.exit(0);
    /**
       https://stackoverflow.com/questions/43147330/what-is-difference-between-method-process-exit1-and-process-exit0-in-node-js


       Der Aufruf von process.exit() ohne Argumente, als leerer Funktionsaufruf, beendet den Node.js-Prozess effektiv. Es wird kein Exit-Statuscode angegeben.
Wenn Sie process.exit() ohne einen Exit-Statuscode verwenden, wird der Node.js-Prozess sofort beendet, und das Betriebssystem erhält keine spezifischen Informationen über den Grund für den Abbruch.
process.exit(0):

Der Aufruf von process.exit(0) gibt explizit einen Exit-Statuscode von 0 an.
Der Exit-Statuscode 0 zeigt normalerweise ein erfolgreiches oder normales Beenden des Programms an. Diese Konvention wird oft verwendet, um zu signalisieren, dass das Programm seine Ausführung ohne Fehler beendet hat.
       */
  }
  handleQuiz(questions);
}

// Add a global variable to store the username.
let username = "Guest";

/* code allow it to pause and wait for the user to enter their name using the inquirer library while still permitting the program to run other tasks or maintain its responsiveness.

https://stackoverflow.com/questions/54529471/javascript-async-and-await


async function obtainedUserName(): Dies ist eine asynchrone Funktion, die es erlaubt, asynchrone Operationen in ihr auszuführen. Sie prüft, ob die globale Variable username anfänglich auf "Guest" gesetzt ist. Ist dies der Fall, ermittelt die Funktion den Namen des Benutzers.

await inquirer.prompt([...]): Dieser Code verwendet die inquirer-Bibliothek, um den Benutzer zur Eingabe seines Namens aufzufordern. Es wird eine Nachricht in Rot angezeigt und der Benutzer wird aufgefordert, seinen Namen einzugeben. Der Standardwert für die Eingabe ist "Gast".
*/

async function obtainedUserName() {
  if (username === "Guest") {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "userName",
        message: chalk.redBright(
          "Welcome to Arnesvex Game! Please enter your name: "
        ),
        default: "Guest",
      },
    ]);

    username = answers.userName.trim() === "" ? "Guest" : answers.userName;
  }

  return username;
}

/*
function obtainUserName() {
  if (username === "Guest") {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "userName",
          message: chalk.redBright(
            "Welcome to Arnesvex Game! Please enter your name: "
          ),
          default: "Guest",
        },
      ])
      .then((answers) => {
        username = answers.userName.trim() === "" ? "Guest" : answers.userName;
        return username;
      });
  }
}


*/

// BANNER OPENING FUNCTION

function bannerOpening() {
  const bannerArt = `
  _  _              _       _                        _       _    
 | || |    ___     | |     | |     ___      o O O   | |     | |   
 | __ |   / -_)    | |     | |    / _ \\    o        |_|     |_|   
 |_||_|   \\___|   _|_|_   _|_|_   \\___/   TS__[O]  _(_)_   _(_)_  
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| {======|_| """ |_| """ | 
\`-0-0-'\`-0-0-'\`-0-0-'\`-0-0-'\`-0-0-'./o--000'"\`-0-0-'\`-0-0-' 
  `;

  console.log(chalk.yellow(bannerArt));
}

bannerOpening();

obtainedUserName().then((playerName) => {
  console.log(playerName);
  console.clear();
  console.log(chalk.redBright(`Hello, ${playerName}!👋\nLet's get started.\n`));

  /*
  mit async und await function, 
  kann der Benutzer seinen Namen über eine Operation eingibt, während gleichzeitig ein strukturierter und lesbarer Codefluss erhalten bleibt
  
  */

  mainMenu();
});

export { mainMenu, obtainedUserName, username };

/*
Synchron-ähnlicher Code: async und await werden verwendet, um asynchronen Code wie synchronen Code aussehen zu lassen, wodurch er leichter zu lesen und zu warten ist. Ohne async und await müssten Sie Callbacks oder Versprechensverkettungen verwenden, was zu einer tief verschachtelten oder Callback-Hölle führen kann.

Benutzereingabe: In Ihrer Funktion ist der kritische Teil das Warten auf die Benutzereingabe über die Funktion inquirer.prompt. Dieser Eingabevorgang ist asynchron, da er eine Benutzerinteraktion beinhaltet und einige Zeit in Anspruch nehmen kann. await ermöglicht es dem Code, an diesem Punkt zu pausieren, bis das Versprechen aufgelöst wird, wenn der Benutzer seine Eingabe macht.



Handling Promises: await wird verwendet, um die Ausführung der Funktion anzuhalten, bis die asynchrone Operation (in diesem Fall die Abfrage des Benutzernamens) abgeschlossen ist. Es vereinfacht die Arbeit mit Versprechen, indem es Ihnen erlaubt, Code zu schreiben, der linearer erscheint, als ob Sie synchrone Operationen verwenden würden.

Zusammenfassend lässt sich sagen, dass die Verwendung von async und await in Ihrer Funktion von entscheidender Bedeutung ist, um sicherzustellen, dass das Programm darauf warten kann, dass der Benutzer seinen Namen über eine asynchrone Operation eingibt, während gleichzeitig ein strukturierter und lesbarer Codefluss erhalten bleibt. Es verbessert das Benutzererlebnis, indem es das Programm reaktionsschneller und interaktiver macht.

*/
