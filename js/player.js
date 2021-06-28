/* Récupération du document pour sa largeur et les nodes à l'intèrieur */

/**
 * 
1 - Lancer une musique au clic sur le bouton.
    -- écouter un évènement déclenché par l'utilisateur -> Qui déclenchera la lecture de la musique,
2 - Animer des bares au lancement de la musique. (div)
    -- Générer leur hauteur aléatoirement
3 - Les bares sont créées à la volée.
    -- Les placer dans conteneur (div #bandeContainer),
    -- Diviser la largeur pour le nombre de 'div' (bares),
4 - Leurs nombres sont conditionnés par la taille du document (largeur).
*
*/

window.onload = function() {

    const player = document.querySelector('#player');
    const btnPlay = player.children[0];
    const audio = player.children[1];
    const container = document.querySelector('#bandeContainer');

    let startStop = false ; // Initialisation du Bouton
    let bandeArray = []; // On prépare un tableau dans lequel on stockera nos 'div'
    let timer; // Initialisation vide d'un timer pour le setInterval

    /**
     * Fonction qui calcul la largeur du conteneur et qui la divise par la largeur de la div. Ce qui nous retourne le nombre de div à injecter dans le contenu. 
     */
    function formatObj() { 
        let sizew = container.offsetWidth;
        return Math.floor(sizew/5);
    }
    
    /**
     * Fonction de création de bandes en fonction de la taille du conteneur.
     */
    function createBandes() {
        let nb = formatObj();
        for( let i = 0; i < nb; i++){
            let b = document.createElement('div'); // On crée nos div
            // b.style.opacity = 1;
            container.appendChild(b); // On les injecte dans le container
            bandeArray.push(b); // On les enregistre dans le tableau prévu
        }
    }

    /**
     * Fonction qui donne une hauteur aléatoire à chaque bande du tableau 'bandeArray'. 
     */
    function setFrequency(){
        bandeArray.forEach((band)=>{
            band.style.height = (Math.floor(Math.random()*300)) + 'px';
            band.style.opacity = 1;
            band.style.width = 3 + 'px';
            band.style.margin = 0 + ' 1px';
        });
    }

    /**
     * On fixe un interval qui va lancer la fonction setFrenquency toutes les '...ms'. 
     */
    function animateFrequency() {
        container.style.opacity = 1;
        timer = setInterval(function() {
            setFrequency();
        }, 100);
    }
    
    /**
     * Arrete la fonction animateFrequency() et change le style des bandes
     */
    function stopFrequency() {
        clearInterval(timer)
        bandeArray.forEach((band)=>{
            band.style.height = 0 + 'px';
            band.style.width = 5 + 'px';
            band.style.margin = 0 + 'px';
        });
    }

    /**
     * On pose un écouteur au 'click' qui lance ou stop l'animation.
     */
    createBandes();
    btnPlay.addEventListener('click', function(event){
        event.preventDefault();
        startStop = !startStop;
        if (startStop) {
            audio.play();
            animateFrequency();
            btnPlay.classList.replace('play','stop') // On remplace la class du bouton pour changer l'icone de lecture
        } else {
            audio.pause();
            audio.currentTime = 0; // Remet la musique à 0 (au départ)
            stopFrequency();
            btnPlay.classList.replace('stop','play') // On remplace la class du bouton pour changer l'icone de lecture
        }
    });

}