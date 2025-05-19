console.log(`[${new Date().toLocaleTimeString()}] Début de l'exécution du script background.js`);

let blockedSites = [];
let isBlockedSitesLoaded = false; // Ajout d'un indicateur de chargement

async function loadBlockedSites() {
    try {
        const response = await fetch(chrome.runtime.getURL('blocked_sites.csv'));
        if (!response.ok) {
            console.error(`[${new Date().toLocaleTimeString()}] Erreur lors du chargement du fichier CSV: Statut ${response.status}`);
            return;
        }
        const csvData = await response.text();
        blockedSites = csvData.split('\n').map(site => site.trim()).filter(site => site !== '');
        console.log(`[${new Date().toLocaleTimeString()}] Liste des sites bloqués chargée :`, blockedSites);
        isBlockedSitesLoaded = true; // Marquer comme chargé
    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] Erreur lors du chargement du fichier CSV:`, error);
        isBlockedSitesLoaded = false;
    }
}

chrome.runtime.onStartup.addListener(loadBlockedSites);
chrome.runtime.onInstalled.addListener(loadBlockedSites);

chrome.tabs.onCreated.addListener(async (tab) => {
    console.log(`[${new Date().toLocaleTimeString()}] Événement onCreated déclenché pour l'onglet ID: ${tab.id}, URL: ${tab.url}`);

    // S'assurer que la liste est chargée avant de continuer
    if (!isBlockedSitesLoaded) {
        await loadBlockedSites();
        if (!isBlockedSitesLoaded) {
            console.warn(`[${new Date().toLocaleTimeString()}] (onCreated) La liste des sites bloqués n'a pas pu être chargée.`);
            return;
        }
    }

    if (tab.openerTabId) {
        try {
            let openerTab = await chrome.tabs.get(tab.openerTabId);
            const openerUrl = openerTab.url;

            if (tab.url && (tab.url.startsWith("chrome://newtab/") || tab.url.startsWith("edge://newtab/"))) {
                console.log(`[${new Date().toLocaleTimeString()}] (onCreated) L'onglet (ID: ${tab.id}) est une page de nouvel onglet, la fermeture automatique est ignorée.`);
                return;
            }

            for (const blockedSite of blockedSites) {
                if (openerUrl && openerUrl.includes(blockedSite)) {
                    console.log(`[${new Date().toLocaleTimeString()}] (onCreated) Fermeture de l'onglet (ID: ${tab.id}) car ouvert automatiquement par le site bloqué: ${blockedSite} (URL parent: ${openerUrl})`);
                    chrome.tabs.remove(tab.id);
                    return;
                }
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleTimeString()}] (onCreated) Erreur lors de la vérification de l'onglet parent (ID: ${tab.openerTabId}) lors de la création de l'onglet (ID: ${tab.id}):`, error);
        }
    } else {
        console.log(`[${new Date().toLocaleTimeString()}] (onCreated) Onglet (ID: ${tab.id}) créé sans onglet parent, potentiellement ouvert manuellement.`);
    }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log(`[${new Date().toLocaleTimeString()}] Événement onUpdated déclenché pour l'onglet ID: ${tabId}, URL: ${tab.url}, Changements:`, changeInfo);

    // S'assurer que la liste est chargée avant de continuer
    if (!isBlockedSitesLoaded) {
        await loadBlockedSites();
        if (!isBlockedSitesLoaded) {
            console.warn(`[${new Date().toLocaleTimeString()}] (onUpdated) La liste des sites bloqués n'a pas pu être chargée.`);
            return;
        }
    }

    if (tab.url && (tab.url.startsWith("chrome://newtab/") || tab.url.startsWith("edge://newtab/"))) {
        return;
    }

    if (changeInfo.url) {
        console.log(`[${new Date().toLocaleTimeString()}] (onUpdated) Mise à jour de l'onglet (ID: ${tabId}), nouvelle URL: ${changeInfo.url}`);

        if (tab.openerTabId) {
            try {
                let openerTab = await chrome.tabs.get(tab.openerTabId);
                const openerUrl = openerTab.url;

                for (const blockedSite of blockedSites) {
                    if (openerUrl && openerUrl.includes(blockedSite)) {
                        console.log(`[${new Date().toLocaleTimeString()}] (onUpdated) Fermeture de l'onglet (ID: ${tabId}) car ouvert automatiquement par le site bloqué: ${blockedSite} (URL parent: ${openerUrl})`);
                        chrome.tabs.remove(tabId);
                        return;
                    }
                }
            } catch (error) {
                console.error(`[${new Date().toLocaleTimeString()}] (onUpdated) Erreur lors de la vérification de l'onglet parent (ID: ${tab.openerTabId}) lors de la mise à jour de l'onglet (ID: ${tabId}):`, error);
            }
        } else {
            console.log(`[${new Date().toLocaleTimeString()}] (onUpdated) Onglet (ID: ${tabId}) mis à jour sans onglet parent, potentiellement ouvert manuellement.`);
        }
    }
});

console.log(`[${new Date().toLocaleTimeString()}] Fin (apparente) du script background.js`);
