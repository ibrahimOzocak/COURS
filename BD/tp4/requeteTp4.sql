match(n:User)-[x:FOLLOWS]->(p:Me) return n.name
match(n:User)-[x:FOLLOWS]->(p:Me) return n.name, n.location
match(n:User) where n.location CONTAINS 'France' return n.name, n.location
match(n:Me)-[p:POSTS]->(t:Tweet)-[x:TAGS]-(h:Hashtag) where h.name='apoc' return t.text -- Me = Neo4J
match(n:User)-[p:POSTS]->(t:Tweet)-[x:USING]-(s:Source) where s.name="Twitter Web App" return n.name
match(n:User) where n.location contains 'England' return count(n) as nbrUsers
match(n:Tweet) where tolower(n.text) contains 'neo4j' and date(n.created_at) < date('2021-06-15') return count(n) as nbrTweets
MATCH (n:Me)-[p:POSTS]->(t:Tweet) RETURN date(t.created_at).year AS Year,date(t.created_at).month AS Month, count(t) AS nbrTweets ORDER BY nbrTweets
