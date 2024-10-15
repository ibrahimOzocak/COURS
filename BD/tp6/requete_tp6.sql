-- Query 1
match(u:User)-[p:POSTS]->(t:Tweet) where t.text contains 'neo4j' or t.text contains 'graph' return u.name, t.text
-- Query 2
match(t:Tweet) return t order by t.favorites desc
-- Query 3
match(u:Me)-[p:POSTS]->(t:Tweet) where t.created_at.year = 2021 return count(t) as nbrTweets
-- Query 4
match(u:User)-[p:POSTS]->(tw:Tweet)-[t:TAGS]->(h:Hashtag) return h.name, COLLECT(distinct u.name) as UserList
-- Query 5
match (u:User)<-[:FOLLOWS]-(u1:User)
with u, count(u1) as follower
where follower > 2
return u.name
-- Query 6
MATCH (u:User)<-[:FOLLOWS]-(u1:User) where u.name <> 'Neo4j' return distinct u1.name
-- Query 7
match(u:User) where not (:Me)-[:FOLLOWS]->(u) return distinct u.name
-- Query 8
MATCH (u:User)-[p:POSTS]->(tw:Tweet)-[us:USING]->(s:Source) where s.name <> "Twitter Web App" return distinct u.name
-- Query 9
match(l:Link) where not l.url starts with 'https' return l
-- Query 10
match(u:User)-[p:POSTS]->(tw:Tweet)-[c:CONTAINS]->(l:Link) where l.url contains 'github' with u, count(l) as nbrLinkGithub return u.name, nbrLinkGithub
-- Query 11
match(u:User)-[f:FOLLOWS]->(u1:User) return distinct u.name, Case when u1.name="Neo4J" then "True" Else "False" end as SuivieOuPas
-- Query 12
match(tw:Tweet)-[us:USING]->(s:Source) where s.name in ["Twitter for iPhone","TweetDeck","TweetApp"] return tw.text, s.name
-- Query 13
match (u:User)<-[:FOLLOWS]-(u1:User)
with u, count(u1) as follower
match(u)-[p:POSTS]->(tw:Tweet)-[t:TAGS]->(h:Hashtag)
where follower > 2 and h.name = 'ml'
return u.name
-- Query 14
match(u:User)-[p:POSTS]->(tw:Tweet)-[t:TAGS]->(h:Hashtag) where u.followers>5000 return distinct u.name,Collect([id(tw), h.name]) as Resultat
-- Query 15
match(u:User) where u.name in ["Pierre Lindenbaum","Michael Hunger","Eva Agrawal"] set u.domain = "DS" return u