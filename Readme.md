# Stop Aux Fenêtres Intrusives !

**Marre de ces sites web qui vous bombardent de nouvelles fenêtres à chaque clic ?** Vous n'êtes pas seuls ! Cette extension Edge est là pour mettre de l'ordre dans ce chaos numérique et vous offrir une navigation plus zen, sans les pop-ups surprises qui gâchent votre surf.

## Késako ? 🤔

Cette extension, c'est un peu votre **Marinette Dupain-Cheng du web** : discrète mais super efficace ! Elle surveille en douce les onglets qui s'ouvrent et, si l'onglet parent fait partie d'une liste noire de sites "pollueurs", elle ferme automatiquement le nouvel onglet indésirable. C'est aussi simple que ça, promis juré ! 😉

## Comment ça marche, Chat Noir ? 🐾

Le secret de cette extension réside dans son fichier `blocked_sites.csv`. C'est là que vous allez lister les noms de domaine des sites web que vous ne voulez plus voir ouvrir de nouvelles fenêtres automatiquement.

1.  **Installation :** Après avoir installé l'extension dans votre navigateur Edge (on vous explique comment faire juste en dessous 😉), elle se met en veilleuse.
2.  **Chargement de la liste noire :** Au démarrage de Edge et à l'installation de l'extension, elle va lire le contenu du fichier `blocked_sites.csv`.
3.  **Surveillance des onglets :** À chaque fois qu'un nouvel onglet est créé ou qu'un onglet existant change d'URL, l'extension regarde d'où il vient (l'onglet parent).
4.  **Action anti-nuisance :** Si l'URL de l'onglet parent contient un des sites listés dans votre `blocked_sites.csv`, et que le nouvel onglet n'est pas une page de nouvel onglet standard, **PAF !** L'onglet indésirable est fermé avant même que vous ayez eu le temps de dire "Aïe, encore une pub !".

## Mise en Place : Le Guide du Héros 🦸

1.  **Créez le fichier `blocked_sites.csv` :** À la racine de votre projet d'extension, créez un fichier texte nommé `blocked_sites.csv`.
2.  **Remplissez votre liste noire :** Dans ce fichier, ajoutez les noms de domaine des sites que vous souhaitez bloquer. **Un site par ligne, et rien d'autre !** Par exemple :
    ```csv
    site-spam-numero-1.com
    encore-un-site-plein-de-pubs.net
    le-roi-de-la-fenetre-popup.org
    ```
3.  **Chargez l'extension dans Edge :**
    * Ouvrez Edge et tapez `Edge://extensions` dans la barre d'adresse. Appuyez sur Entrée.
    * Activez le "Mode développeur" en haut à droite de la page.
    * Cliquez sur le bouton "Charger l'extension non empaquetée" en haut à gauche.
    * Sélectionnez le dossier contenant tout les fichiers de votre extension (y compris `background.js` et `blocked_sites.csv`).

Et voilà ! L'extension est installée et prête à vous débarrasser de ces fenêtres indésirables. Vous pouvez maintenant naviguer plus sereinement, un peu comme si vous aviez un super-pouvoir contre les spams ! 💪

## Contribuer, c'est chouette ! 😊

Vous avez des idées pour améliorer cette extension ? Une liste de sites particulièrement envahissants à partager ? N'hésitez pas à contribuer ! Les *coccinelles* et les *chats noirs* du développement sont toujours les bienvenus. 😉
