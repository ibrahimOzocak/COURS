-- 1
match(n:STATION)-[b:byTrain]-(n1:STATION) where n1.name contains "Paris" return n.name, n1.name
-- 2
MATCH (n:STATION)-[r]-(n1:STATION)
where n1.name contains 'Paris' and type(r) IN ['byTrain', 'byBus', 'byCar']
return n.name, n1.name, r.type
-- 3
MATCH p = (n:STATION)-[r*]-(n1:STATION)
WHERE n.name='Orleans' and  n1.name='Tours'
RETURN n.name, n1.name, type(r[0]), length(p) AS long
LIMIT 4
-- 4
MATCH p = (orleans:STATION)-[r:byTrain|byCar*]->(tours:STATION)
WHERE orleans.name = 'Orleans' and tours.name ='Tours'
RETURN orleans.name, tours.name, length(p) AS long, [rel IN relationships(p) | type(rel)] AS types
LIMIT 4
-- 5
MATCH p = (orleans:STATION)-[r:byTrain|byCar*]->(bourges:STATION)
WHERE orleans.name = 'Orleans' and bourges.name ='Bourges'
RETURN orleans.name, bourges.name, length(p) AS long, [rel IN relationships(p) | type(rel)] AS types, [station IN nodes(p) | station.name] AS stations
LIMIT 4