-- 1
db.articles.find({"categorie":"Electronique"}, {"titre":1,"prix":1,"vendeur.nom":1, "_id":0});
-- 2
db.articles.find({"prix":{"$gt": 500}}, {"titre":1,"description":1,"_id":0});
-- 3
db.articles.updateOne({titre:"Montre Rolex Submariner"}, {$set:{prix:9500}});
-- 4
db.articles.update({"localisation.ville":"Paris"}, {$set:{etatLivraison:"En stock"}})
-- 5
db.articles.update({categorie:"Luxe"},{$inc:{nombreVues:50}});
-- 6
db.articles.deleteOne({titre:"Chaise de bureau ergonomique"});
-- 7
db.articles.deleteMany({prix:{$lt:100}});
-- 8
