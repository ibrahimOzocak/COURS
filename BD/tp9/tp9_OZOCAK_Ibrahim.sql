CREATE (:Artiste {nom: 'Tarantino', prenom: 'Quentin', type: 'metteur en scène'});
CREATE (:Artiste {nom: 'Van Gogh', prenom: 'Vincent', type: 'peintre'});
CREATE (:Artiste {nom: 'Beethoven', prenom: 'Ludwig', type: 'compositeur'});
CREATE (:Artiste {nom: 'Shakespeare', prenom: 'William', type: 'dramaturge'});
CREATE (:Artiste {nom: 'Angelou', prenom: 'Maya', type: 'poétesse'});
CREATE (:Film {titre: 'Pulp Fiction', annee: 1994, genre: 'Crime', langue: 'Anglais', budget: 8000000, note: 8.9});
CREATE (:Film {titre: 'Reservoir Dogs', annee: 1992, genre: 'Crime', langue: 'Anglais', budget: 1200000, note: 8.3});
CREATE (:Tableau {titre: 'La Nuit étoilée', annee: 1889, style: 'Post-impressionnisme'});
CREATE (:Tableau {titre: 'Les Tournesols', annee: 1888, style: 'Post-impressionnisme'});
CREATE (:Serie {titre: 'Breaking Bad', annee: 2008, genre: 'Crime', langue: 'Anglais'});
CREATE (:Episode {titre: 'Pilot', saison: 1, numero: 1});
CREATE (:Episode {titre: 'Cat’s in the Bag...', saison: 1, numero: 2});
CREATE (:Utilisateur {id: 1, nom: 'Dupont'});
CREATE (:Utilisateur {id: 2, nom: 'Martin'});
CREATE (:Utilisateur {id: 3, nom: 'Durand'});
CREATE (:Pays {nom: 'États-Unis'});
CREATE (:Pays {nom: 'Pays-Bas'});
CREATE (:Pays {nom: 'Allemagne'});
CREATE (:Pays {nom: 'Royaume-Uni'});
CREATE (:Pays {nom: 'France'});
-- Artistes qui dirigent des films
MATCH (a:Artiste {nom: 'Tarantino', prenom: 'Quentin'}), (f:Film {titre: 'Pulp Fiction'})
CREATE (a)-[:DIRIGE]->(f);

MATCH (a:Artiste {nom: 'Tarantino', prenom: 'Quentin'}), (f:Film {titre: 'Reservoir Dogs'})
CREATE (a)-[:DIRIGE]->(f);

-- Artistes qui créent des tableaux
MATCH (a:Artiste {nom: 'Van Gogh', prenom: 'Vincent'}), (t:Tableau {titre: 'La Nuit étoilée'})
CREATE (a)-[:CREE]->(t);

MATCH (a:Artiste {nom: 'Van Gogh', prenom: 'Vincent'}), (t:Tableau {titre: 'Les Tournesols'})
CREATE (a)-[:CREE]->(t);

-- Un film est à l'origine d'une série
MATCH (f:Film {titre: 'Pulp Fiction'}), (s:Serie {titre: 'Breaking Bad'})
CREATE (f)-[:A_L_ORIGINE_DE]->(s);

-- Une série contient des épisodes
MATCH (s:Serie {titre: 'Breaking Bad'}), (e:Episode {titre: 'Pilot'})
CREATE (s)-[:CONTIENT]->(e);

-- Épisodes qui se suivent
MATCH (u:Episode {titre: 'Cat’s in the Bag...'}), (f:Episode {titre: 'Pilot'})
CREATE (u)-[:SUITE {id_Episode_1: 'Cat’s in the Bag...', id_Episode_2: 'Pilot'}]->(f);

-- Films associés à des pays
MATCH (f:Film {titre: 'Pulp Fiction'}), (p:Pays {nom: 'États-Unis'})
CREATE (f)-[:ASSOCIE_A]->(p);

MATCH (f:Film {titre: 'Reservoir Dogs'}), (p:Pays {nom: 'États-Unis'})
CREATE (f)-[:ASSOCIE_A]->(p);

MATCH (f:Film {titre: 'Reservoir Dogs'}), (p:Pays {nom: 'France'})
CREATE (f)-[:ASSOCIE_A]->(p);

-- Tableaux associés à des pays
MATCH (t:Tableau {titre: 'La Nuit étoilée'}), (p:Pays {nom: 'Pays-Bas'})
CREATE (t)-[:CREATION_ORIGINAIRE]->(p);

MATCH (t:Tableau {titre: 'Les Tournesols'}), (p:Pays {nom: 'Pays-Bas'})
CREATE (t)-[:CREATION_ORIGINAIRE]->(p);
-- Nationalités des artistes
MATCH (a:Artiste {nom: 'Van Gogh', prenom: 'Vincent'}), (p:Pays {nom: 'Pays-Bas'})
CREATE (a)-[:A_LA_NATIONALITE_DEPUIS {annee: 1853}]->(p);

MATCH (a:Artiste {nom: 'Tarantino', prenom: 'Quentin'}), (p:Pays {nom: 'États-Unis'})
CREATE (a)-[:A_LA_NATIONALITE_DEPUIS {annee: 1963}]->(p);

-- Utilisateurs qui regardent des films
MATCH (u:Utilisateur {id: 1}), (f:Film {titre: 'Pulp Fiction'})
CREATE (u)-[:REGARDE {note: 9}]->(f);

MATCH (u:Utilisateur {id: 2}), (f:Film {titre: 'Reservoir Dogs'})
CREATE (u)-[:REGARDE {note: 8}]->(f);

-- Utilisateurs qui regardent des tableaux
MATCH (u:Utilisateur {id: 2}), (t:Tableau {titre: 'La Nuit étoilée'})
CREATE (u)-[:REGARDE {note: 10}]->(t);

MATCH (u:Utilisateur {id: 3}), (t:Tableau {titre: 'Les Tournesols'})
CREATE (u)-[:REGARDE {note: 7}]->(t);

-- Films similaires en genre, langue et note
MATCH (f1:Film), (f2:Film)
WHERE f1 <> f2 AND f1.genre = f2.genre AND f1.langue = f2.langue AND f1.note > 8 AND f2.note > 8
CREATE (f1)-[:SIMILAIRE_A]->(f2);

-- Séries associées à un pays
MATCH (s:Serie {titre: 'Breaking Bad'}), (p:Pays {nom: 'États-Unis'})
CREATE (s)-[:ASSOCIE_A]->(p);

-- Beethoven crée une œuvre musicale
CREATE (:Oeuvre {titre: 'Symphonie n°9', annee: 1824, type: 'Musique'});
CREATE (:Oeuvre {titre: 'Symphonie n°5', annee: 1808, type: 'Musique'});

MATCH (a:Artiste {nom: 'Beethoven', prenom: 'Ludwig'}), (o:Oeuvre {titre: 'Symphonie n°9'})
CREATE (a)-[:CREE]->(o);

MATCH (a:Artiste {nom: 'Beethoven', prenom: 'Ludwig'}), (o:Oeuvre {titre: 'Symphonie n°5'})
CREATE (a)-[:CREE]->(o);

-- Shakespeare crée des œuvres dramatiques
CREATE (:Oeuvre {titre: 'Hamlet', annee: 1603, type: 'Théâtre'});
CREATE (:Oeuvre {titre: 'Roméo et Juliette', annee: 1597, type: 'Théâtre'});

MATCH (a:Artiste {nom: 'Shakespeare', prenom: 'William'}), (o:Oeuvre {titre: 'Hamlet'})
CREATE (a)-[:CREE]->(o);

MATCH (a:Artiste {nom: 'Shakespeare', prenom: 'William'}), (o:Oeuvre {titre: 'Roméo et Juliette'})
CREATE (a)-[:CREE]->(o);

-- Maya Angelou crée des poèmes
CREATE (:Oeuvre {titre: 'Phenomenal Woman', annee: 1978, type: 'Poésie'});
CREATE (:Oeuvre {titre: 'And Still I Rise', annee: 1978, type: 'Poésie'});

MATCH (a:Artiste {nom: 'Angelou', prenom: 'Maya'}), (o:Oeuvre {titre: 'Phenomenal Woman'})
CREATE (a)-[:CREE]->(o);

MATCH (a:Artiste {nom: 'Angelou', prenom: 'Maya'}), (o:Oeuvre {titre: 'And Still I Rise'})
CREATE (a)-[:CREE]->(o);

-- Musique de Beethoven associée à l'Allemagne
MATCH (o:Oeuvre {titre: 'Symphonie n°9'}), (p:Pays {nom: 'Allemagne'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

MATCH (o:Oeuvre {titre: 'Symphonie n°5'}), (p:Pays {nom: 'Allemagne'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

-- Œuvres de Shakespeare associées au Royaume-Uni
MATCH (o:Oeuvre {titre: 'Hamlet'}), (p:Pays {nom: 'Royaume-Uni'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

MATCH (o:Oeuvre {titre: 'Roméo et Juliette'}), (p:Pays {nom: 'Royaume-Uni'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

-- Poèmes de Maya Angelou associés aux États-Unis
MATCH (o:Oeuvre {titre: 'Phenomenal Woman'}), (p:Pays {nom: 'Pays-Bas'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

MATCH (o:Oeuvre {titre: 'And Still I Rise'}), (p:Pays {nom: 'Pays-Bas'})
CREATE (o)-[:CREATION_ORIGINAIRE]->(p);

-- Dupont regarde des œuvres
MATCH (u:Utilisateur {id: 1}), (o:Oeuvre {titre: 'Symphonie n°9'})
CREATE (u)-[:REGARDE {note: 9}]->(o);

MATCH (u:Utilisateur {id: 1}), (o:Oeuvre {titre: 'Hamlet'})
CREATE (u)-[:REGARDE {note: 8}]->(o);

-- Martin regarde des œuvres
MATCH (u:Utilisateur {id: 2}), (o:Oeuvre {titre: 'Symphonie n°5'})
CREATE (u)-[:REGARDE {note: 7}]->(o);

MATCH (u:Utilisateur {id: 2}), (o:Oeuvre {titre: 'Phenomenal Woman'})
CREATE (u)-[:REGARDE {note: 10}]->(o);

-- Durand regarde des œuvres
MATCH (u:Utilisateur {id: 3}), (o:Oeuvre {titre: 'Roméo et Juliette'})
CREATE (u)-[:REGARDE {note: 6}]->(o);

MATCH (u:Utilisateur {id: 3}), (o:Oeuvre {titre: 'And Still I Rise'})
CREATE (u)-[:REGARDE {note: 9}]->(o);

-- NOTE
MATCH (u:Utilisateur {nom: 'Martin'}), (f:Film {titre: 'Reservoir Dogs'})
CREATE (u)-[:NOTE {nom_User: 'Martin', id_film: 'Reservoir Dogs', note: 9}]->(f);

MATCH (u:Utilisateur {nom: 'Martin'}), (f:Film {titre: 'Pulp Fiction'})
CREATE (u)-[:NOTE {nom_User: 'Martin', id_film: 'Pulp Fictions', note: 7}]->(f);

MATCH (u:Utilisateur {nom: 'Dupont'}), (f:Film {titre: 'Pulp Fiction'})
CREATE (u)-[:NOTE {nom_User: 'Dupont', id_film: 'Pulp Fictions', note: 5}]->(f);

-- User nationnalité
MATCH (u:Utilisateur {nom: 'Martin'}), (p:Pays {nom: 'France'})
CREATE (u)-[:A_LA_NATIONALITE_DEPUIS {annee:2010}]->(p);

MATCH (u:Utilisateur {nom: 'Durand'}), (p:Pays {nom: 'France'})
CREATE (u)-[:A_LA_NATIONALITE_DEPUIS {annee:2015}]->(p);

MATCH (u:Utilisateur {nom: 'Dupont'}), (p:Pays {nom: 'France'})
CREATE (u)-[:A_LA_NATIONALITE_DEPUIS {annee:2015}]->(p);


-- Contraintes Question 1
CREATE CONSTRAINT artiste_nom_prenom_unique FOR (a:Artiste)
REQUIRE (a.nom, a.prenom) IS UNIQUE;

CREATE CONSTRAINT oeuvre_titre_annee_unique FOR (o:Oeuvre)
REQUIRE (o.titre, o.anneeParution) IS UNIQUE;

CREATE CONSTRAINT utilisateur_numero_unique FOR (u:Utilisateur)
REQUIRE u.numeroUtilisateur IS UNIQUE;

CREATE CONSTRAINT pays_nom_unique FOR (p:Pays)
REQUIRE p.nom IS UNIQUE;

CREATE CONSTRAINT serie_titre_unique FOR (s:Serie)
REQUIRE s.titreSerie IS UNIQUE;

CREATE CONSTRAINT episode_titre_saison_numero_unique FOR (e:Episode)
REQUIRE (e.titreEpisode, e.saison, e.numeroEpisode) IS UNIQUE;

-- Requete Quesiton 2
match(x:Utilisateur)-[n:NOTE]->(f:Film) return x.nom,f.titre
match(x:Artiste)-[n:A_LA_NATIONALITE_DEPUIS]->(p:Pays) return x.nom, x.prenom, p.nom
match(n:Artiste)-[d:DIRIGE]->(f:Film) return n.nom, n.prenom, n.type, f.titre
match(n:Artiste)-[d:CREE]->(t:Tableau) return n.nom, n.prenom, n.type, t.titre
match(n:Film)-[:A_L_ORIGINE_DE]->(s:Serie) return n.titre, s.titre

-- Requete Question 3
--a

--b

--c
MATCH (u:Utilisateur)-[:NOTE]->(f:Film)
WITH u, COUNT(f) AS nb_notes
ORDER BY nb_notes DESC
LIMIT 5
RETURN u.nom AS Utilisateur, nb_notes AS NombreDeFilmsNotes

--d
MATCH (u:Utilisateur)-[:NOTE]->(f:Film)
WITH f, COUNT(u) AS nb_notes
ORDER BY nb_notes DESC
LIMIT 5
RETURN f.titre AS Film, nb_notes AS NombreDeNotes

--e
MATCH (u:Utilisateur)-[n:NOTE]->(f:Film)
WITH f, AVG(n.note) as moyenneNote
ORDER BY moyenneNote ASC
LIMIT 5
RETURN f.titre AS titre, moyenneNote AS Moyenne_Notes

--f
match(p:Pays)<-[:A_LA_NATIONALITE_DEPUIS]-(a)
with p, COUNT(a) as nbrPersonne
order by nbrPersonne DESC
return p.nom, nbrPersonne

--g
MATCH (p:Pays)<-[:ASSOCIE_A]-(f:Film)
RETURN p.nom, COLLECT(f.titre) AS listeFilms

--h
MATCH (p:Pays)<-[:ASSOCIE_A]-(f:Film)
RETURN f.titre, count(p.nom) as nbrPaysAssocie, COLLECT(p.nom) AS listePays

--g