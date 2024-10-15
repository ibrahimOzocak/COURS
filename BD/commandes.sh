ssh -J o22204518@acces-tp.iut45.univ-orleans.fr -o StrictHostKeyChecking=no o22204518@172.16.2.115
SU05W7
ssh -L 7474:172.16.2.115:7474 -L 7687:172.16.2.115:7687 -N o22204518@acces-tp.iut45.univ-orleans.fr
localhost:7474

match(n)-[r]-(m) delete r
match(n) delete n