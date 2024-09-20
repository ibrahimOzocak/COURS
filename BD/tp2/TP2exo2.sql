LOAD CSV WITH HEADERS FROM 'file:///Movie.csv' AS movie
WITH movie 
WHERE movie.boxOffice IS NOT NULL AND movie.class IS NOT NULL
WITH toInteger(movie.idMovie) AS idMovie,
     movie.movieName AS movieName,
     toInteger(movie.year) AS movieYear,
     movie.director AS movieDirector,
     toInteger(movie.boxOffice) AS movieBoxOffice
WHERE movieBoxOffice < 700
CREATE (m:Movie{idMovie : idMovie, title : movieName, year: movieYear, boxOffice: movieBoxOffice})
MERGE (d:Director {directorName: movieDirector})
MERGE (box:BoxOffice)
MERGE (d)-[liaison1:REALISER]->(m)
MERGE (m)-[liaison2:PLACER]->(box)
