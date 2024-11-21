-- query 1
MATCH p = (s:STATION)-[:byTrain*]->(s1:STATION)
WITH s, p, length(p) as cycle
WHERE s.ville=s1.ville
RETURN cycle as Longueur, 
       [station in nodes(p) | station.ville] as ListStations
ORDER BY cycle
-- query 2
MATCH p = (s:STATION)-[:byTrain*]->(s1)
WHERE s.ville=s1.ville
WITH s.ville as Ville, count(p) as nbrCycles
RETURN Ville, nbrCycles
ORDER BY Ville
-- query 3
MATCH p = (s:STATION)-[:byTrain*]-(s1)
WHERE (s.ville="Orleans" or s1.ville="Orleans") and s.ville<>s1.ville
WITH s, s1, p
RETURN s.ville AS DEPART,
       s1.ville AS ARRIVE,
       [station IN nodes(p)[1..-1] | station.name] AS ListStations
-- query 4
