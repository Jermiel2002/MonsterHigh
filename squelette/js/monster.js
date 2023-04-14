/************************************************************/
/**
 * Université Sorbonne Paris Nord, Programmation Web
 * Auteurs                       : KOUNOUHO Kpessou (12001045) et Ouicem
 * Création                      : 2023/03/31
 * Dernière modification         :
 */
/************************************************************/

//'use strict'
/* use strict =
*   Les variables doivent être déclarées avant leur utilisation.
*   L'attribution à une variable non définie est interdite.
*   L'attribution à des propriétés en lecture seule est interdite.
*   Les noms de variable ne peuvent pas être dupliqués dans la même portée.
*   Les fonctions ne peuvent pas être déclarées dans une instruction conditionnelle ou dans une boucle.
*   Le mot clé "eval" ne peut pas être utilisé comme nom de variable ou comme argument de fonction.
*   Les mots clés réservés, tels que "delete" et "arguments", ne peuvent pas être utilisés comme noms de variables.
* */

/************************************************************/
// Variables globales
/************************************************************/

// variables globales décrivant l'état du monstre
let name = prompt("Comment va s'appeler le monstre : ");
let life = prompt("De combien de vie dispose t-il au départ : ");
if(life == 0)
{
    alert("le monstre ne peut être mort au debut");
    life = prompt("De combien de vie dispose t-il au départ : ");
}
let money = prompt("Combien de sous a t-il en poche : ");
let awake = true;



//définition et initialisation de variables permettant de stocker les différents objets du DOM recevant
//des évènements (une variable par bouton)
let run, fight, work, sleep, eat, show, NewLife, kill, boite;

//variable globale gardant en mémoire le noeud ou se trouve #actionbox pour la fonction logBoite(message)
let ActionBox;

//variable globale pointant vers le noeud statut de la liste d'identifiant statut de l'interface
let status;

//Constante à utiliser pour la fonction auhasard qui exécute une action chaque 7 secondes
const temps = 7000;

//variable globale pour le tableau d'auditeurs
let tabAuditeur;

//Initialisation des variables
run = document.querySelector('#run');

fight = document.querySelector('#fight');

work = document.querySelector('#work');

sleep = document.querySelector('#sleep');

eat = document.querySelector('#eat');

show = document.querySelector('#show');

NewLife = document.querySelector('#new');

kill = document.querySelector('#kill');

ActionBox = document.querySelector('#actionbox');

status = document.querySelectorAll('#statut li');

boite = document.querySelector('div #monster');

/************************************************************/
// Auditeurs et évènement associés
/************************************************************/

show.addEventListener('click', afficheMonstre, false);
run.addEventListener('click', courir, false);
fight.addEventListener('click', sebattre, false);
work.addEventListener('click', travailler, false);
eat.addEventListener('click', manger, false);
sleep.addEventListener('click', dormir, false);
kill.addEventListener('click', killmonster, false);
NewLife.addEventListener('click',newLifemonster,false);

/************************************************************/
// Fonctions
/************************************************************/

/*la fonction initMonstre (nom, vie, argent) initialise l'état du monstre avec les valeurs reçues en paramètres*/
function initMonstre(nom, vie, argent)
{
    name = nom;
    life = vie;
    money = argent;
}

/*version 1: la fonction afficheMonstre() affiche toutes les propriétés du monstre sur une seule ligne dans la console
* version 2: la fonction affiche non seulement un message dans la console
*            mais en plus ajoute un message dans la boite #actionbox*/
function  afficheMonstre()
{
    console.log('Je suis le monstre '+ name + 'je dispose de '+ life + ' vie et j\'ai '+ money + 'euros');
    logBoite('Je suis le monstre '+ name + ' je dispose de '+ life + ' vie(s) et j\'ai '+ money + ' euros');
}

/*la fonction go() initialise le monstre en appelant initMonstre() puis enregistre
* la fonction afficheMonstre() en tant qu'auditeur de l'évènement clic sur le bouton
* show */
function go()
{
    initMonstre(name, life, money);
    updateStatus();
    afficheMonstre();
    apparence();
}

/*la fonction logBoite(message) permet d'ajouter un message dans la boite #actionbox
* de l'interface*/
function logBoite(message)
{
    //création de l'élément paragraphe p à insérer
    let par = document.createElement('p');
    //création du texte à insérer dans le paragraphe;
    let texte = document.createTextNode(message);
    //ajouter le texte au paragraphe
    par.appendChild(texte);
    //ajouter le paragraphe au body
    ActionBox.appendChild(par);
    //positionnement du focus sur le nouveau texte ajouté
    ActionBox.screenTop = ActionBox.scrollHeight;
}

/*la fonction update status() affiche l'état du monstre dans la liste d'identifiant
* statut de l'interface*/
function updateStatus()
{
    //tous les éléments en javascripts sont des objets. Ce principe nous aidera
    //à avoir accès au contenu des listes
    status[0].textContent = `Vie : ${life}`;
    status[1].textContent = `Argent : ${money}`;
    if(awake==true)
    {
        status[2].textContent = 'Éveillé';
    }
    else
    {
        status[2].textContent = 'Endormit';
    }

    if (life==0)
    {
        status[2].textContent = 'Mort';
    }

}

/*Actions que peut réaliser le monstre*/
function courir()
{
    if(life >= 1 && awake == true)
    {
        life--;
        updateStatus();
        logBoite('Le monstre prend ses jambes à son cou et court !');
    }
    else
    {
        if (life > 0)
            logBoite('Pitié, j\'ai besoin d\'une vie au moins égal à 1 pour courir !');
    }
    apparence();
    }

function sebattre()
{
    if(life >= 3 && awake == true)
    {
        life -= 3;
        updateStatus();
        apparence();
        logBoite('Le monstre commence à se battre avec une fureur dévastatrice !');

    }
    else
    {
        if (life > 0)
            logBoite('Je n\'ai plus de force. J\'ai besoin de 3 points de vie au minimum pour le combat.');
        }
    //apparence();
}

function travailler()
{
    if(life >= 1 && awake == true)
    {
        life --;
        money = parseInt(money);
        money += 2;
        updateStatus();
        logBoite('Il me faut bien travailler pour survivre dans ce monde !');
    }
    else
    {
        if (life > 0)
            logBoite('Je n\ai pas de force pour aller travailler. Je suis à plat.');
    }
    apparence();

}

function manger() {
    if (money >= 3 && awake === true) {
        life = parseInt(life);
        life += 2;
        money -= 3;
        logBoite('Miam miam, je prends des forces');
        updateStatus();
    } else {
        if(life>0)
            logBoite('J\'ai mais j\'ai pas d\'argent !' );
        }
    apparence();
}

/*la fonction dormir endort le monstre et programme son réveil 5 secondes plus
* tard. Lorsqu'il dort il ne peut ni courir, ni se battre, ni manger.*/
function dormir() {
    if (awake == true) {
        awake = false;
        logBoite('Chut! On risque de réveiller le monstre');
    }
    //réveil programmer
    setTimeout(() => {
         awake = true;
         life++;
         updateStatus();
         logBoite('Oups! Il est réveillé !');
    }, 5000);
    apparence();
}

/*la fonction exécute une de ses actions au hasard. Une exécution est faite chaque 7 secondes
* au chargement de la page*/
function actionauhasard() {
    //tableau d'auditeurs
    tabAuditeur = [dormir, manger, sebattre, courir, /*go,*/ travailler];

    //choisir aléatoirement une valeur dans le tableau construite
    const auditeurAleatoire = Math.floor(Math.random() * tabAuditeur.length);

    //exécuter la fonction choisi dans le tableau
    if (life > 0)
    {
        tabAuditeur[auditeurAleatoire]();
        updateStatus();
    }


}

/*Fonctions gérant la mort du monstre*/
function killmonster() {
    if (awake == true && life > 0) {
        awake = false;
        life = 0;
        kill.disable = true;
        work.disable=true;
        sleep.disable=true;
        eat.disable=true;
        fight.disable=true;
        show.disable=true;
        updateStatus();
        apparence();

    }
    else
        logBoite(' vous ne pouvez pas effectuer cette action car le monstre est déja mort');





}

/*Fonctions gérant la réssurection du monstre*/

function newLifemonster() {


    if (life === 0) {
        awake = true;
        life++;
        kill.disable = false;
        work.disable=false;
        sleep.disable=false;
        eat.disable=false;
        fight.disable=false;
        show.disable =false;
        updateStatus();
        apparence();

    }
    else
        logBoite('vous ne pouvez pas faire cette action le monstre est n\'est pas mort');



}

/*la fonction apparence change l'apparence de la boite #monster
* la couleur varie progressivement de rouge (si le monstre a 1 point de vie)
* à vert (si 10 points de vie) puis à bleu (si >= 20 points de vie).*/
function apparence()
    {
        if(life == 1)
        {
            boite.style.background = 'red';
        }
        if(life == 10)
        {
            boite.style.background = 'grey';
        }
        if (life >= 20)
        {
            boite.style.background = 'blue';
        }
        //la largeur de la bordure doit être proportionnelle au nombre d'unités d'argent.
        boite.style.borderWidth = money;
    }
    

/************************************************************/
// Programme principal
/************************************************************/

/* Exercice 1: question 4: enregistrement de la fonction go() comme auditeur de
l'évènement load de la fenêtre au lancement.*/
window.addEventListener('load', go,false);



window.addEventListener('load', () => {
        setInterval(actionauhasard, temps);
    }, false);
//actionauhasard();
/*La fonction kill ne fonctionne pas encore comme i faut: s'il est mort les autre fonctions tournent quznd même après 7 secondes*/
