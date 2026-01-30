import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en-GB' | 'fr-FR' | 'ja-JP';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const en: Record<string, string> = {
  // TopBar
  'topbar.language': 'Language',
  'topbar.eventEdition': 'Event Edition',
  'topbar.companyName': 'Company name',
  'topbar.standNumber': 'Stand number',
  'topbar.digitalOffering': 'Digital offering',
  'topbar.exhibitorProfile': 'Exhibitor Profile',
  'topbar.upgrade': 'Upgrade',
  'topbar.editCompanyProfile': 'Edit company profile',
  'topbar.logout': 'Logout',
  
  // MainNav
  'nav.myShow': 'My show',
  'nav.myTeam': 'My team',
  'nav.leadCapture': 'Lead capture',
  'nav.analytics': 'Analytics',
  'nav.help': 'Help',
  'nav.home': 'Home',
  
  // My Show submenu
  'nav.adminMarketingOperations': 'Admin, Marketing & Operations',
  'nav.editCompanyProfile': 'Edit Company Profile',
  'nav.productListing': 'Product Listing',
  'nav.addProductOrService': 'Add Product or Service',
  'nav.manageMeetings': 'Manage Meetings',
  'nav.manageShares': 'Manage Shares',
  'nav.shop': 'Shop',
  'nav.exhibitorManual': 'Exhibitor Manual',
  
  // My Team submenu
  'nav.companyAdministrators': 'Company Administrators',
  'nav.allocateBadges': 'Allocate Badges',
  'nav.yourCompanyBadges': 'Your Company Badges',
  
  // Lead Capture submenu
  'nav.leadManagerApp': 'Lead Manager App',
  'nav.createOffer': 'Create Offer',
  'nav.inviteYourCustomers': 'Invite Your Customers',
  
  // Analytics submenu
  'nav.exhibitorDashboard': 'Exhibitor Dashboard',
  'nav.profileViewer': 'Profile Viewer',
  'nav.benchmarkAnalytics': 'Benchmark Analytics',
  
  // Help submenu
  'nav.homePageGuidedTour': 'Home Page Guided Tour',
  'nav.companyProfileHelp': 'Company Profile Help',
  'nav.leadManagerAppHelp': 'Lead Manager App Help',
  'nav.offerHelp': 'Offer Help',
  'nav.exhibitorDashboardHelp': 'Exhibitor Dashboard Help',
  
  // MobileNav
  'mobile.eventEdition': 'Event edition',
  
  // Home Page
  'home.taskProgress': 'Task progress',
  'home.tasksCompleted': '{completed} of {total} tasks completed',
  'home.completeYourTasks': 'Complete your tasks on time to maximise your success at the show.',
  'home.overdue': 'Overdue',
  'home.completed': 'Completed',
  'home.due': 'Due',
  'home.mandatory': 'mandatory',
  
  // Task titles
  'task.editCompanyProfile': 'Edit company profile',
  'task.manageSharers': 'Manage sharers',
  'task.adminMarketingOperations': 'Admin, marketing and operations',
  'task.inviteCustomers': 'Invite customers',
  'task.manageBadges': 'Manage badges',
  'task.createOfferToCapture': 'Create Offer to capture leads',
  'task.viewExhibitorManual': 'View Exhibitor manual',
  'task.customTaskOperations': 'Custom task for operations',
  'task.exploreTheShop': 'Explore the shop',
  'task.upgradePackage': 'Upgrade package',
  'task.setUpMeetings': 'Set up meetings',
  'task.uploadDocuments': 'Upload documents for Colleqt',
  'task.setUpLeadManagerApp': 'Set up Lead Manager App',
  
  // Recommended Actions
  'home.recommendedActions': 'Recommended actions',
  'home.profileCompletion': 'Profile Completion',
  'home.yourProfileIs': 'Your profile is {percentage}% complete',
  'home.profileViewsBoost': 'Do you know that completed profiles get an average of 17 times more views than incomplete profiles?',
  'home.editProfile': 'Edit profile',
  
  'home.captureMoreLeads': 'Capture more leads',
  'home.wantConnections': 'Want to make over 50 additional connections at the show?',
  'home.additionalCostApplies': '(additional cost applies)',
  'home.requestLeadBoosterInfo': 'Request Lead Booster Info',
  
  'home.inviteYourCustomers': 'Invite your customers',
  'home.invitesAllocated': 'Invites allocated',
  'home.customersViewed': 'Customers viewed',
  'home.customersRegistered': 'Customers registered',
  'home.ensureUseInvites': 'Ensure you use all your invites for maximum value',
  'home.inviteMoreCustomers': 'Invite more customers',
  'home.lookingInviteMore': 'Looking to invite more customers?',
  'home.buyMoreInvites': 'Buy more invites',
  
  'home.compareCompetitors': 'Compare with competitors',
  'home.yourProfileViews': 'Your Profile views',
  'home.averageProfileViews': 'Average Profile views',
  'home.answerPendingQuestions': 'Please answer a few pending profile questions to unlock your insights and get matched with the right benchmarks.',
  'home.unlockFullReport': 'Unlock full report',
  
  // Performance Snapshot
  'home.performanceSnapshot': 'Your performance snapshot',
  'home.profileViews': 'Profile views',
  'home.higherThanLastWeek': '↑ 15% higher than last week at this time',
  'home.weeksRemaining': 'Weeks remaining for the show',
  'home.viewFullReport': 'View full report',
  
  'home.boostVisibility': 'Boost your visibility',
  'home.standOutFromRest': 'Stand out from the rest to get your brand seen 5x more often.',
  'home.askAboutPriority': 'Ask about Priority plus Profile',
  
  'home.yourProfileViewers': 'Your profile viewers',
  'home.showing': 'Showing {shown} of {total}',
  'home.companyNameColumn': 'Company name',
  'home.contactNo': 'Contact no.',
  'home.more': '+ {count} more',
  'home.discoverMyViewers': 'Discover my viewers',
  
  // New Chart Translations
  'home.leadManagerApp': 'Lead Manager App',
  'home.delegatesLoggedIn': '5 of 10 delegates logged in',
  'home.customQuestionsCreated': '2 custom questions created',
  'home.addQualifyingQuestions': 'Add qualifying questions and notes to each lead for a better follow-up.',
  'home.setupLeadManagerApp': 'Setup Lead Manager App',
  'home.leadBooster': 'Lead Booster',
  'home.yourOffer': 'Your offer',
  'home.offerPlaceholder': 'Offer text Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem.',
  'home.setupLeadBooster': 'Setup Lead Booster',
  'home.leadsDownload': 'Leads Download',
  'home.unrated': 'Unrated',
  'home.threeStar': '3 star',
  'home.twoStar': '2 star',
  'home.fourStar': '4 star',
  'home.nudgeBoothTeam': 'Nudge your booth team to rate more leads for better follow up post show',
  'home.downloadMyLeads': 'Download my leads',
  'home.leadCapturePerformance': 'Lead capture performance',
  'home.day': 'Day',
  'home.leads': 'leads',
  'home.teamCapturedToday': 'Your team has captured 544 leads today',
  
  // Footer
  'footer.usefulLinks': 'Useful Links',
  'footer.help': 'Help',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.contactUs': 'Contact us',
  'footer.meetTheTeam': 'Meet the team',
  'footer.safetyAtEvent': 'Safety at Our Event',
  'footer.followUs': 'Follow Us',
  'footer.privacyOptions': 'Privacy Options',
  'footer.cookiePolicy': 'Cookie Policy',
  'footer.yourPrivacyChoices': 'Your Privacy Choices',
  'footer.rxGlobalPrivacyPolicy': 'RX Global Privacy Policy',
  
  // Login
  'login.usernameEmail': 'Username (email)',
  'login.username': 'Username',
  'login.enterPassword': 'Enter Password',
  'login.password': 'Password',
  'login.login': 'Login',
  'login.forgotPassword': 'Forgot Password',
  'login.termsConditions': 'Terms & Conditions of Use',
  'login.accessibility': 'Accessibility',
  'login.cookieSettings': 'Cookie Settings',
  
  // ProfileHeader
  'profile.editCompanyProfile': 'Edit company profile',
  'profile.complete': '% complete',
  'profile.preview': 'Preview',
  'profile.fillProfile': 'Complete profile',
  'profile.editCompanyName': 'Edit Company Name',
  'profile.companyName': 'Company Name',
  'profile.enterCompanyName': 'Enter company name',
  'profile.cancel': 'Cancel',
  'profile.save': 'Save',
  'profile.sectionsFulfilled': 'sections fulfilled',
  'profile.sectionsFulfilledTooltip': 'Complete all sections to maximize your profile visibility and attract more visitors.',
  
  // ExhibitorHub Tabs
  'exhibitor.companyProfile': 'Company Profile',
  'exhibitor.productListing': 'Product Listing',
  
  // AI Profile Setup
  'ai.autoFillProfile': 'Auto-fill with AI',
  'ai.autoFillDescription': 'Extract your company information automatically from your website.',
  'ai.enterWebsiteUrl': 'Enter your company website URL',
  'ai.consentScraping': 'I confirm I have rights to use this website content',
  'ai.consentDescription': 'By proceeding, you confirm that you have the necessary rights to extract and use content from the specified website.',
  'ai.startExtraction': 'Start Extraction',
  'ai.extractingDescription': 'We are extracting your company information...',
  'ai.pleaseWait': 'This may take a moment. Please do not close this window.',
  'ai.reviewDescription': 'Review the extracted information and validate each field.',
  'ai.completeDescription': 'All fields have been reviewed.',
  'ai.reviewingField': 'Reviewing field',
  'ai.noContentExtracted': 'No content could be extracted for this field.',
  'ai.noImageFound': 'No image was found.',
  'ai.notFound': 'Not found',
  'ai.noTagsFound': 'No tags were found.',
  'ai.noProductsFound': 'No products were found.',
  'ai.skip': 'Skip',
  'ai.edit': 'Edit',
  'ai.validate': 'Validate',
  'ai.saveEdit': 'Save Edit',
  'ai.extractionComplete': 'Extraction Complete!',
  'ai.reviewSummary': 'Here is a summary of your review.',
  'ai.validated': 'Validated',
  'ai.edited': 'Edited',
  'ai.skipped': 'Skipped',
  'ai.reviewAgain': 'Review Again',
  'ai.applyChanges': 'Apply Changes',
  'ai.profileUpdated': 'Profile updated successfully!',
  'ai.enableAIFeatures': 'Enable AI Features',
  'ai.enterWebsiteToExtract': 'Enter your company website to extract information automatically.',
  'ai.companyWebsite': 'Company Website',
  'ai.extracting': 'Extracting...',
  'ai.useAIDescription': 'Use AI description',
  'ai.undoAIDescription': 'Undo AI description',
  'ai.useAILogo': 'Use AI logo',
  'ai.undoAILogo': 'Undo AI logo',
  'ai.useAIImage': 'Use AI image',
  'ai.undoAIImage': 'Undo AI image',
  'ai.useAILinks': 'Use AI links',
  'ai.undoAILinks': 'Undo AI links',
  'ai.useAITags': 'Use AI tags',
  'ai.undoAITags': 'Undo AI tags',
  'ai.useAIProducts': 'Use AI products',
  'ai.undoAIProducts': 'Undo AI products',
  'ai.regenerate': 'Regenerate',
  'common.cancel': 'Cancel',
  'common.back': 'Back',
  'common.tryAgain': 'Try Again',
};

// French translations
const fr: Record<string, string> = {
  // TopBar
  'topbar.language': 'Langue',
  'topbar.eventEdition': 'Édition de l\'événement',
  'topbar.companyName': 'Nom de l\'entreprise',
  'topbar.standNumber': 'Numéro de stand',
  'topbar.digitalOffering': 'Offre numérique',
  'topbar.exhibitorProfile': 'Profil exposant',
  'topbar.upgrade': 'Mettre à niveau',
  'topbar.editCompanyProfile': 'Modifier le profil de l\'entreprise',
  'topbar.logout': 'Déconnexion',
  
  // MainNav
  'nav.myShow': 'Mon salon',
  'nav.myTeam': 'Mon équipe',
  'nav.leadCapture': 'Capture de leads',
  'nav.analytics': 'Analytique',
  'nav.help': 'Aide',
  'nav.home': 'Accueil',
  
  // My Show submenu
  'nav.adminMarketingOperations': 'Admin, Marketing & Opérations',
  'nav.editCompanyProfile': 'Modifier le profil de l\'entreprise',
  'nav.productListing': 'Liste des produits',
  'nav.addProductOrService': 'Ajouter un produit ou service',
  'nav.manageMeetings': 'Gérer les réunions',
  'nav.manageShares': 'Gérer les partages',
  'nav.shop': 'Boutique',
  'nav.exhibitorManual': 'Manuel de l\'exposant',
  
  // My Team submenu
  'nav.companyAdministrators': 'Administrateurs de l\'entreprise',
  'nav.allocateBadges': 'Attribuer des badges',
  'nav.yourCompanyBadges': 'Badges de votre entreprise',
  
  // Lead Capture submenu
  'nav.leadManagerApp': 'Application Lead Manager',
  'nav.createOffer': 'Créer une offre',
  'nav.inviteYourCustomers': 'Inviter vos clients',
  
  // Analytics submenu
  'nav.exhibitorDashboard': 'Tableau de bord exposant',
  'nav.profileViewer': 'Visualiseur de profil',
  'nav.benchmarkAnalytics': 'Analyse comparative',
  
  // Help submenu
  'nav.homePageGuidedTour': 'Visite guidée de la page d\'accueil',
  'nav.companyProfileHelp': 'Aide sur le profil de l\'entreprise',
  'nav.leadManagerAppHelp': 'Aide Lead Manager App',
  'nav.offerHelp': 'Aide sur les offres',
  'nav.exhibitorDashboardHelp': 'Aide tableau de bord exposant',
  
  // MobileNav
  'mobile.eventEdition': 'Édition de l\'événement',
  
  // Home Page
  'home.taskProgress': 'Progression des tâches',
  'home.tasksCompleted': '{completed} sur {total} tâches terminées',
  'home.completeYourTasks': 'Complétez vos tâches à temps pour maximiser votre succès au salon.',
  'home.overdue': 'En retard',
  'home.completed': 'Terminé',
  'home.due': 'Échéance',
  'home.mandatory': 'obligatoire',
  
  // Task titles
  'task.editCompanyProfile': 'Modifier le profil de l\'entreprise',
  'task.manageSharers': 'Gérer les partageurs',
  'task.adminMarketingOperations': 'Admin, marketing et opérations',
  'task.inviteCustomers': 'Inviter des clients',
  'task.manageBadges': 'Gérer les badges',
  'task.createOfferToCapture': 'Créer une offre pour capturer des leads',
  'task.viewExhibitorManual': 'Voir le manuel de l\'exposant',
  'task.customTaskOperations': 'Tâche personnalisée pour les opérations',
  'task.exploreTheShop': 'Explorer la boutique',
  'task.upgradePackage': 'Mettre à niveau le forfait',
  'task.setUpMeetings': 'Configurer les réunions',
  'task.uploadDocuments': 'Télécharger des documents pour Colleqt',
  'task.setUpLeadManagerApp': 'Configurer Lead Manager App',
  
  // Recommended Actions
  'home.recommendedActions': 'Actions recommandées',
  'home.profileCompletion': 'Complétion du profil',
  'home.yourProfileIs': 'Votre profil est complété à {percentage}%',
  'home.profileViewsBoost': 'Saviez-vous que les profils complets obtiennent en moyenne 17 fois plus de vues que les profils incomplets ?',
  'home.editProfile': 'Modifier le profil',
  
  'home.captureMoreLeads': 'Capturer plus de leads',
  'home.wantConnections': 'Voulez-vous établir plus de 50 connexions supplémentaires au salon ?',
  'home.additionalCostApplies': '(coût supplémentaire)',
  'home.requestLeadBoosterInfo': 'Demander des infos Lead Booster',
  
  'home.inviteYourCustomers': 'Invitez vos clients',
  'home.invitesAllocated': 'Invitations attribuées',
  'home.customersViewed': 'Clients ayant consulté',
  'home.customersRegistered': 'Clients inscrits',
  'home.ensureUseInvites': 'Assurez-vous d\'utiliser toutes vos invitations pour une valeur maximale',
  'home.inviteMoreCustomers': 'Inviter plus de clients',
  'home.lookingInviteMore': 'Vous souhaitez inviter plus de clients ?',
  'home.buyMoreInvites': 'Acheter plus d\'invitations',
  
  'home.compareCompetitors': 'Comparer avec les concurrents',
  'home.yourProfileViews': 'Vos vues de profil',
  'home.averageProfileViews': 'Vues de profil moyennes',
  'home.answerPendingQuestions': 'Veuillez répondre à quelques questions de profil en attente pour débloquer vos informations et être mis en relation avec les bons benchmarks.',
  'home.unlockFullReport': 'Débloquer le rapport complet',
  
  // Performance Snapshot
  'home.performanceSnapshot': 'Votre aperçu de performance',
  'home.profileViews': 'Vues du profil',
  'home.higherThanLastWeek': '↑ 15% plus élevé que la semaine dernière à la même heure',
  'home.weeksRemaining': 'Semaines restantes avant le salon',
  'home.viewFullReport': 'Voir le rapport complet',
  
  'home.boostVisibility': 'Boostez votre visibilité',
  'home.standOutFromRest': 'Démarquez-vous des autres pour que votre marque soit vue 5 fois plus souvent.',
  'home.askAboutPriority': 'Renseignez-vous sur Priority plus Profile',
  
  'home.yourProfileViewers': 'Vos visiteurs de profil',
  'home.showing': 'Affichage de {shown} sur {total}',
  'home.companyNameColumn': 'Nom de l\'entreprise',
  'home.contactNo': 'N° de contact',
  'home.more': '+ {count} de plus',
  'home.discoverMyViewers': 'Découvrir mes visiteurs',
  
  // New Chart Translations
  'home.leadManagerApp': 'Application Lead Manager',
  'home.delegatesLoggedIn': '5 sur 10 délégués connectés',
  'home.customQuestionsCreated': '2 questions personnalisées créées',
  'home.addQualifyingQuestions': 'Ajoutez des questions de qualification et des notes à chaque lead pour un meilleur suivi.',
  'home.setupLeadManagerApp': 'Configurer Lead Manager App',
  'home.leadBooster': 'Lead Booster',
  'home.yourOffer': 'Votre offre',
  'home.offerPlaceholder': 'Texte de l\'offre Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem.',
  'home.setupLeadBooster': 'Configurer Lead Booster',
  'home.leadsDownload': 'Téléchargement des leads',
  'home.unrated': 'Non évalué',
  'home.threeStar': '3 étoiles',
  'home.twoStar': '2 étoiles',
  'home.fourStar': '4 étoiles',
  'home.nudgeBoothTeam': 'Encouragez votre équipe de stand à évaluer plus de leads pour un meilleur suivi après le salon',
  'home.downloadMyLeads': 'Télécharger mes leads',
  'home.leadCapturePerformance': 'Performance de capture de leads',
  'home.day': 'Jour',
  'home.leads': 'leads',
  'home.teamCapturedToday': 'Votre équipe a capturé 544 leads aujourd\'hui',
  
  // Footer
  'footer.usefulLinks': 'Liens utiles',
  'footer.help': 'Aide',
  'footer.privacyPolicy': 'Politique de confidentialité',
  'footer.contactUs': 'Nous contacter',
  'footer.meetTheTeam': 'Rencontrer l\'équipe',
  'footer.safetyAtEvent': 'Sécurité à notre événement',
  'footer.followUs': 'Suivez-nous',
  'footer.privacyOptions': 'Options de confidentialité',
  'footer.cookiePolicy': 'Politique de cookies',
  'footer.yourPrivacyChoices': 'Vos choix de confidentialité',
  'footer.rxGlobalPrivacyPolicy': 'Politique de confidentialité RX Global',
  
  // Login
  'login.usernameEmail': 'Nom d\'utilisateur (email)',
  'login.username': 'Nom d\'utilisateur',
  'login.enterPassword': 'Entrer le mot de passe',
  'login.password': 'Mot de passe',
  'login.login': 'Connexion',
  'login.forgotPassword': 'Mot de passe oublié',
  'login.termsConditions': 'Conditions générales d\'utilisation',
  'login.accessibility': 'Accessibilité',
  'login.cookieSettings': 'Paramètres des cookies',
  
  // ProfileHeader
  'profile.editCompanyProfile': 'Modifier le profil de l\'entreprise',
  'profile.complete': '% terminé',
  'profile.preview': 'Aperçu',
  'profile.fillProfile': 'Compléter le profil',
  'profile.editCompanyName': 'Modifier le nom de l\'entreprise',
  'profile.companyName': 'Nom de l\'entreprise',
  'profile.enterCompanyName': 'Entrer le nom de l\'entreprise',
  'profile.cancel': 'Annuler',
  'profile.save': 'Enregistrer',
  'profile.sectionsFulfilled': 'sections remplies',
  'profile.sectionsFulfilledTooltip': 'Complétez toutes les sections pour maximiser la visibilité de votre profil et attirer plus de visiteurs.',
  
  // ExhibitorHub Tabs
  'exhibitor.companyProfile': 'Profil de l\'entreprise',
  'exhibitor.productListing': 'Liste des produits',
  
  // AI Profile Setup
  'ai.autoFillProfile': 'Remplir avec l\'IA',
  'ai.autoFillDescription': 'Extrayez automatiquement les informations de votre entreprise depuis votre site web.',
  'ai.enterWebsiteUrl': 'Entrez l\'URL de votre site web',
  'ai.consentScraping': 'Je confirme avoir les droits d\'utiliser ce contenu',
  'ai.consentDescription': 'En procédant, vous confirmez que vous avez les droits nécessaires pour extraire et utiliser le contenu du site web spécifié.',
  'ai.startExtraction': 'Démarrer l\'extraction',
  'ai.extractingDescription': 'Nous extrayons les informations de votre entreprise...',
  'ai.pleaseWait': 'Cela peut prendre un moment. Veuillez ne pas fermer cette fenêtre.',
  'ai.reviewDescription': 'Vérifiez les informations extraites et validez chaque champ.',
  'ai.completeDescription': 'Tous les champs ont été vérifiés.',
  'ai.reviewingField': 'Vérification du champ',
  'ai.noContentExtracted': 'Aucun contenu n\'a pu être extrait pour ce champ.',
  'ai.noImageFound': 'Aucune image n\'a été trouvée.',
  'ai.notFound': 'Non trouvé',
  'ai.noTagsFound': 'Aucun tag n\'a été trouvé.',
  'ai.noProductsFound': 'Aucun produit n\'a été trouvé.',
  'ai.skip': 'Passer',
  'ai.edit': 'Modifier',
  'ai.validate': 'Valider',
  'ai.saveEdit': 'Enregistrer',
  'ai.extractionComplete': 'Extraction terminée !',
  'ai.reviewSummary': 'Voici un résumé de votre révision.',
  'ai.validated': 'Validé',
  'ai.edited': 'Modifié',
  'ai.skipped': 'Passé',
  'ai.reviewAgain': 'Revoir',
  'ai.applyChanges': 'Appliquer les modifications',
  'ai.profileUpdated': 'Profil mis à jour avec succès !',
  'ai.enableAIFeatures': 'Activer les fonctionnalités IA',
  'ai.enterWebsiteToExtract': 'Entrez votre site web pour extraire automatiquement les informations.',
  'ai.companyWebsite': 'Site web de l\'entreprise',
  'ai.extracting': 'Extraction...',
  'ai.useAIDescription': 'Utiliser IA description',
  'ai.undoAIDescription': 'Annuler IA description',
  'ai.useAILogo': 'Utiliser IA logo',
  'ai.undoAILogo': 'Annuler IA logo',
  'ai.useAIImage': 'Utiliser IA image',
  'ai.undoAIImage': 'Annuler IA image',
  'ai.useAILinks': 'Utiliser IA liens',
  'ai.undoAILinks': 'Annuler IA liens',
  'ai.useAITags': 'Utiliser IA tags',
  'ai.undoAITags': 'Annuler IA tags',
  'ai.useAIProducts': 'Utiliser IA produits',
  'ai.undoAIProducts': 'Annuler IA produits',
  'ai.regenerate': 'Régénérer',
  'common.cancel': 'Annuler',
  'common.back': 'Retour',
  'common.tryAgain': 'Réessayer',
};

// Japanese translations
const ja: Record<string, string> = {
  // TopBar
  'topbar.language': '言語',
  'topbar.eventEdition': 'イベント版',
  'topbar.companyName': '会社名',
  'topbar.standNumber': 'ブース番号',
  'topbar.digitalOffering': 'デジタル提供',
  'topbar.exhibitorProfile': '出展者プロフィール',
  'topbar.upgrade': 'アップグレード',
  'topbar.editCompanyProfile': '会社プロフィールを編集',
  'topbar.logout': 'ログアウト',
  
  // MainNav
  'nav.myShow': 'マイショー',
  'nav.myTeam': 'マイチーム',
  'nav.leadCapture': 'リード獲得',
  'nav.analytics': '分析',
  'nav.help': 'ヘルプ',
  'nav.home': 'ホーム',
  
  // My Show submenu
  'nav.adminMarketingOperations': '管理、マーケティング & オペレーション',
  'nav.editCompanyProfile': '会社プロフィールを編集',
  'nav.productListing': '製品リスト',
  'nav.addProductOrService': '製品またはサービスを追加',
  'nav.manageMeetings': 'ミーティング管理',
  'nav.manageShares': '共有管理',
  'nav.shop': 'ショップ',
  'nav.exhibitorManual': '出展者マニュアル',
  
  // My Team submenu
  'nav.companyAdministrators': '会社管理者',
  'nav.allocateBadges': 'バッジの割り当て',
  'nav.yourCompanyBadges': '会社のバッジ',
  
  // Lead Capture submenu
  'nav.leadManagerApp': 'リードマネージャーアプリ',
  'nav.createOffer': 'オファーを作成',
  'nav.inviteYourCustomers': '顧客を招待',
  
  // Analytics submenu
  'nav.exhibitorDashboard': '出展者ダッシュボード',
  'nav.profileViewer': 'プロフィール閲覧者',
  'nav.benchmarkAnalytics': 'ベンチマーク分析',
  
  // Help submenu
  'nav.homePageGuidedTour': 'ホームページガイドツアー',
  'nav.companyProfileHelp': '会社プロフィールヘルプ',
  'nav.leadManagerAppHelp': 'リードマネージャーアプリヘルプ',
  'nav.offerHelp': 'オファーヘルプ',
  'nav.exhibitorDashboardHelp': '出展者ダッシュボードヘルプ',
  
  // MobileNav
  'mobile.eventEdition': 'イベント版',
  
  // Home Page
  'home.taskProgress': 'タスク進捗',
  'home.tasksCompleted': '{total}件中{completed}件のタスクが完了',
  'home.completeYourTasks': 'ショーでの成功を最大化するために、タスクを期限内に完了してください。',
  'home.overdue': '期限切れ',
  'home.completed': '完了',
  'home.due': '期限',
  'home.mandatory': '必須',
  
  // Task titles
  'task.editCompanyProfile': '会社プロフィールを編集',
  'task.manageSharers': '共有者を管理',
  'task.adminMarketingOperations': '管理、マーケティング、オペレーション',
  'task.inviteCustomers': '顧客を招待',
  'task.manageBadges': 'バッジを管理',
  'task.createOfferToCapture': 'リード獲得用オファーを作成',
  'task.viewExhibitorManual': '出展者マニュアルを見る',
  'task.customTaskOperations': 'オペレーション用カスタムタスク',
  'task.exploreTheShop': 'ショップを探索',
  'task.upgradePackage': 'パッケージをアップグレード',
  'task.setUpMeetings': 'ミーティングを設定',
  'task.uploadDocuments': 'Colleqt用ドキュメントをアップロード',
  'task.setUpLeadManagerApp': 'リードマネージャーアプリを設定',
  
  // Recommended Actions
  'home.recommendedActions': 'おすすめのアクション',
  'home.profileCompletion': 'プロフィール完成度',
  'home.yourProfileIs': 'プロフィールは{percentage}%完成しています',
  'home.profileViewsBoost': '完成したプロフィールは、未完成のプロフィールより平均17倍多くの閲覧数を獲得することをご存知ですか？',
  'home.editProfile': 'プロフィールを編集',
  
  'home.captureMoreLeads': 'より多くのリードを獲得',
  'home.wantConnections': 'ショーで50以上の追加のコネクションを作りたいですか？',
  'home.additionalCostApplies': '（追加費用がかかります）',
  'home.requestLeadBoosterInfo': 'リードブースター情報をリクエスト',
  
  'home.inviteYourCustomers': '顧客を招待',
  'home.invitesAllocated': '割り当てられた招待',
  'home.customersViewed': '閲覧した顧客',
  'home.customersRegistered': '登録した顧客',
  'home.ensureUseInvites': '最大限の価値を得るために、すべての招待を使用してください',
  'home.inviteMoreCustomers': 'さらに顧客を招待',
  'home.lookingInviteMore': 'もっと多くの顧客を招待したいですか？',
  'home.buyMoreInvites': '招待を追加購入',
  
  'home.compareCompetitors': '競合他社と比較',
  'home.yourProfileViews': 'あなたのプロフィール閲覧数',
  'home.averageProfileViews': '平均プロフィール閲覧数',
  'home.answerPendingQuestions': 'インサイトを解放し、適切なベンチマークとマッチングするために、保留中のプロフィール質問にお答えください。',
  'home.unlockFullReport': '完全なレポートを解放',
  
  // Performance Snapshot
  'home.performanceSnapshot': 'パフォーマンススナップショット',
  'home.profileViews': 'プロフィール閲覧数',
  'home.higherThanLastWeek': '↑ 先週の同時刻より15%高い',
  'home.weeksRemaining': 'ショーまでの残り週数',
  'home.viewFullReport': '完全なレポートを見る',
  
  'home.boostVisibility': '可視性を向上',
  'home.standOutFromRest': '他社から際立って、ブランドが5倍見られるようにしましょう。',
  'home.askAboutPriority': 'プライオリティプラスプロフィールについて問い合わせる',
  
  'home.yourProfileViewers': 'プロフィール閲覧者',
  'home.showing': '{total}件中{shown}件を表示',
  'home.companyNameColumn': '会社名',
  'home.contactNo': '連絡先',
  'home.more': '+ {count}件',
  'home.discoverMyViewers': '閲覧者を発見',
  
  // New Chart Translations
  'home.leadManagerApp': 'リードマネージャーアプリ',
  'home.delegatesLoggedIn': '10人中5人の代理人がログイン',
  'home.customQuestionsCreated': '2つのカスタム質問を作成',
  'home.addQualifyingQuestions': 'より良いフォローアップのために、各リードに適格な質問とメモを追加してください。',
  'home.setupLeadManagerApp': 'リードマネージャーアプリを設定',
  'home.leadBooster': 'リードブースター',
  'home.yourOffer': 'あなたのオファー',
  'home.offerPlaceholder': 'オファーテキスト Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem.',
  'home.setupLeadBooster': 'リードブースターを設定',
  'home.leadsDownload': 'リードダウンロード',
  'home.unrated': '未評価',
  'home.threeStar': '3つ星',
  'home.twoStar': '2つ星',
  'home.fourStar': '4つ星',
  'home.nudgeBoothTeam': 'ショー後のより良いフォローアップのために、ブースチームにより多くのリードを評価するよう促してください',
  'home.downloadMyLeads': 'リードをダウンロード',
  'home.leadCapturePerformance': 'リード獲得パフォーマンス',
  'home.day': '日',
  'home.leads': 'リード',
  'home.teamCapturedToday': 'あなたのチームは今日544件のリードを獲得しました',
  
  // Footer
  'footer.usefulLinks': '便利なリンク',
  'footer.help': 'ヘルプ',
  'footer.privacyPolicy': 'プライバシーポリシー',
  'footer.contactUs': 'お問い合わせ',
  'footer.meetTheTeam': 'チームに会う',
  'footer.safetyAtEvent': 'イベントでの安全',
  'footer.followUs': 'フォローする',
  'footer.privacyOptions': 'プライバシーオプション',
  'footer.cookiePolicy': 'クッキーポリシー',
  'footer.yourPrivacyChoices': 'プライバシーの選択',
  'footer.rxGlobalPrivacyPolicy': 'RXグローバルプライバシーポリシー',
  
  // Login
  'login.usernameEmail': 'ユーザー名（メール）',
  'login.username': 'ユーザー名',
  'login.enterPassword': 'パスワードを入力',
  'login.password': 'パスワード',
  'login.login': 'ログイン',
  'login.forgotPassword': 'パスワードを忘れた',
  'login.termsConditions': '利用規約',
  'login.accessibility': 'アクセシビリティ',
  'login.cookieSettings': 'クッキー設定',
  
  // ProfileHeader
  'profile.editCompanyProfile': '会社プロフィールを編集',
  'profile.complete': '%完了',
  'profile.preview': 'プレビュー',
  'profile.fillProfile': 'プロフィールを完成',
  'profile.editCompanyName': '会社名を編集',
  'profile.companyName': '会社名',
  'profile.enterCompanyName': '会社名を入力',
  'profile.cancel': 'キャンセル',
  'profile.save': '保存',
  'profile.sectionsFulfilled': 'セクション完了',
  'profile.sectionsFulfilledTooltip': 'すべてのセクションを完了して、プロフィールの可視性を最大化し、より多くの訪問者を引き付けましょう。',
  
  // ExhibitorHub Tabs
  'exhibitor.companyProfile': '会社プロフィール',
  'exhibitor.productListing': '製品リスト',
  
  // AI Profile Setup
  'ai.autoFillProfile': 'AIで自動入力',
  'ai.autoFillDescription': 'ウェブサイトから会社情報を自動的に抽出します。',
  'ai.enterWebsiteUrl': '会社のウェブサイトURLを入力',
  'ai.consentScraping': 'このウェブサイトのコンテンツを使用する権利があることを確認します',
  'ai.consentDescription': '続行することで、指定されたウェブサイトからコンテンツを抽出して使用する権利があることを確認します。',
  'ai.startExtraction': '抽出を開始',
  'ai.extractingDescription': '会社情報を抽出しています...',
  'ai.pleaseWait': 'しばらくお待ちください。このウィンドウを閉じないでください。',
  'ai.reviewDescription': '抽出された情報を確認し、各フィールドを検証してください。',
  'ai.completeDescription': 'すべてのフィールドが確認されました。',
  'ai.reviewingField': 'フィールドを確認中',
  'ai.noContentExtracted': 'このフィールドのコンテンツを抽出できませんでした。',
  'ai.noImageFound': '画像が見つかりませんでした。',
  'ai.notFound': '見つかりません',
  'ai.noTagsFound': 'タグが見つかりませんでした。',
  'ai.noProductsFound': '製品が見つかりませんでした。',
  'ai.skip': 'スキップ',
  'ai.edit': '編集',
  'ai.validate': '検証',
  'ai.saveEdit': '編集を保存',
  'ai.extractionComplete': '抽出完了！',
  'ai.reviewSummary': 'レビューの概要です。',
  'ai.validated': '検証済み',
  'ai.edited': '編集済み',
  'ai.skipped': 'スキップ済み',
  'ai.reviewAgain': '再確認',
  'ai.applyChanges': '変更を適用',
  'ai.profileUpdated': 'プロフィールが正常に更新されました！',
  'ai.enableAIFeatures': 'AI機能を有効にする',
  'ai.enterWebsiteToExtract': '会社のウェブサイトを入力して自動的に情報を抽出します。',
  'ai.companyWebsite': '会社のウェブサイト',
  'ai.extracting': '抽出中...',
  'ai.useAIDescription': 'AI説明を使用',
  'ai.undoAIDescription': 'AI説明を元に戻す',
  'ai.useAILogo': 'AIロゴを使用',
  'ai.undoAILogo': 'AIロゴを元に戻す',
  'ai.useAIImage': 'AI画像を使用',
  'ai.undoAIImage': 'AI画像を元に戻す',
  'ai.useAILinks': 'AIリンクを使用',
  'ai.undoAILinks': 'AIリンクを元に戻す',
  'ai.useAITags': 'AIタグを使用',
  'ai.undoAITags': 'AIタグを元に戻す',
  'ai.useAIProducts': 'AI製品を使用',
  'ai.undoAIProducts': 'AI製品を元に戻す',
  'ai.regenerate': '再生成',
  'common.cancel': 'キャンセル',
  'common.back': '戻る',
  'common.tryAgain': '再試行',
};

const translations: Record<Language, Record<string, string>> = {
  'en-GB': en,
  'fr-FR': fr,
  'ja-JP': ja,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en-GB');

  const t = (key: string): string => {
    return translations[language][key] || translations['en-GB'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
