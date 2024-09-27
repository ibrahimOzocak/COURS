match (n:Drinker) return n
match (n:Drinker) return n.name
match (n:Drinker) return ID(n)
match (n:Drinker)-[:FriendOf]-(p:Drinker) return n
match (n:Drinker)-[d:FriendOf]-(p:Drinker) return id(n), id(p), id(d)
match (n:Drinker)-[d:FriendOf*]->(p:Drinker) return n.name, p.name
match (n:Beer) where n.type="pilsen" return n
match (n:Drinker)-[a:FriendOf*]->(p:Drinker) where n.name <> p.name return n.name, p.name
match (n:Drinker)-[a:Likes]->(b:Beer) where b.name="Corona" return n,b
match (n:Bar) where n.city="Paris" return n
match (n:Bar)-[s:Sells]->(b:Beer) where n.city="Paris" and b.name="Corona" return n
match (n:Bar)-[s:Sells]->(b:Beer) where n.city="Paris" and (b.name="Corona" or b.name="Antarctica") return distinct n.name
match (n:Drinker)-[s:Goes]->(b:Bar) where b.city="Paris" and n.sexe="F" return DISTINCT n.name
match (p:Beer)<-[a:Likes]-(n:Drinker)-[s:Goes]->(b:Bar) where b.city="Paris" and n.sexe="F" and p.name="Bohemia" return DISTINCT n.name
match (n:Bar) where n.rating_hygiene>3 or n.rating_service>3 return DISTINCT n
match (n:Bar) return n.name, (n.rating_hygiene+n.rating_service)/2 as ratingMoyen
match (n:Bar) where (n.rating_hygiene+n.rating_service)/2>4 return n.name
match (n:Drinker) return n order by n.age, n.sexe
match (n:Drinker)-[g:Goes]->(b:Bar) return n,b order by g.startYear
match (n:Drinker)-[g:Goes]->(b:Bar) where g.startYear=2022 return n
match (n:Drinker)-[g:Goes]->(b:Bar)<-[g1:Goes]-(p:Drinker) return DISTINCT n.name, p.name
match (n:Drinker)-[f:FriendOf*]->(p:Drinker)-[l:Likes]->(b:Beer) where b.name="Antarctica" and n<>p return n
match (p:Drinker)<-[f:FriendOf]-(n:Drinker)-[g:Goes]->(b:Bar) where b.name="Brasil" return n
match (p:Drinker)<-[f:FriendOf]-(n:Drinker)-[g:Goes]->(b:Bar) where b.name="Brasil" return n,p
MATCH (n:Drinker) WHERE n.name =~'^B.*b.*' RETURN n.name