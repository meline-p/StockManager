# Stock Manager

Application full-stack pour gérer un inventaire de produits, avec **ASP.NET Core** pour le backend et **React** pour le frontend.

---

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
  - [1. Cloner le projet](#1-cloner-le-projet)
  - [2. Installer le backend (ASP.NET Core)](#2-installer-le-backend-aspnet-core)
  - [3. Installer le frontend (React + Vite)](#3-installer-le-frontend-react--vite)
  - [4. Configurer la communication Frontend ↔ Backend](#4-configurer-la-communication-frontend--backend)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Base de données](#base-de-données)
- [Comment utiliser l’application](#comment-utiliser-lapplication)

---

## Prérequis

- .NET 9 SDK : https://dotnet.microsoft.com/en-us/download
- Node.js (>= 18) : https://nodejs.org/en/download/
  et npm
- Un éditeur de code (ex: Visual Studio Code)

---

## Installation

1. Cloner le projet

```bash
git clone https://github.com/meline-p/StockManager.git
cd StockManager/V2Web
```

2. Installer le backend (ASP.NET Core)

- Aller dans le dossier StockManagerAPI :

```bash
cd StockManagerAPI
```

- Restaurer les dépendances NuGet :

```bash
dotnet restore
```

- Vérifier la compilation :

```bash
dotnet build
```

- Lancer le serveur API :

```bash
dotnet run
```

- L’API sera accessible sur `http://localhost:5260`

- Swagger UI est disponible sur `http://localhost:5260/swagger`

- L’API expose des endpoints RESTful sous `/api/products.`

3. Installer le frontend (React + Vite)

- Aller dans le dossier clientapp :

```bash
cd ../clientapp
```

- Installer les dépendances npm :

```bash
npm install
```

- Lancer le serveur React :

```bash
npm run dev
```

- L’application sera accessible sur `http://localhost:5173`

4. Configurer la communication Frontend ↔ Backend

Dans clientapp/src/api.js, s’assurer que toutes les URLs pointent vers le bon endpoint de l’API, par exemple :

```bash
const BASE_URL = "http://localhost:5260/api/products";
```

Cela garantit que `getProducts`, `addProduct`, `updateProduct`, `deleteProduct` fonctionnent correctement.

---

## Fonctionnalités

- Liste des produits : Affiche tous les produits de l’inventaire

- Ajouter un produit : Formulaire pour créer un nouveau produit

- Mettre à jour un produit : Formulaire pour modifier un produit existant

- Supprimer un produit : Supprime un produit directement depuis la liste

---

## Structure du projet

```bash
V2Web/
    StockManagerAPI/         # Backend ASP.NET Core
        Controllers/         # Controllers REST
        Models/              # Modèles C#
        Data/                # DbContext
        Program.cs           # Configuration de l’application
    clientapp/               # Frontend React + Vite
        src/
            components/      # ProductList, AddProduct, UpdateProduct
            api.js           # Fonctions API fetch
            App.jsx          # Composant principal
```

---

### Base de données

La base de données est gérée via Entity Framework Core / SQLite.

Pour voir la base de données SQLite :

```bash
cd StockManagerAPI
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

### Comment utiliser l’application

1. Ouvrir http://localhost:5173 dans un navigateur.

2. La liste des produits s’affiche automatiquement.

3. Pour ajouter un produit :

- Remplir le formulaire “Ajouter un produit”

- Cliquer sur Ajouter

4. Pour modifier un produit :

- Cliquer sur "Editer" à côté du produit

- Modifier le nom ou la quantité

- Cliquer sur Mettre à jour ou Annuler

5. Pour supprimer un produit :

- Cliquer sur "Supprimer" à côté du produit

- Le produit disparaît de la liste
