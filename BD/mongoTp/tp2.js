// Exercice 1
var pipeline = [
    {$match :{"capacite": {$gt: 50}}},
    {$project: {
        _id:0,
        ville:'$adresse.ville', 
        grande: {
            $cond: {if: {$gte:["$capacite", 1000]}, then: true, else: false}
            }
        }
    }   
]
db.sallesTpBom.aggregate(pipeline)

// Exercice 2
var pipeline2 = [
    {$match:{"adresse.codePostal":/^44/}},
    {$addFields:{"apres_extension":{$add:["$capacite", 100]}}},
    {$project:{_id:0, nom:1, avant_extension:"$capacite", apres_extension:1}}
]

// Exercice 3
var pipeline3 = [
    {$addFields: {departement: {$substrBytes: ["$adresse.codePostal", 0, 2]}}},
    {$group: {
        _id: {departement:"$departement"},
        totoalCap: {$sum: "$capacite"},}},
    {$sort: {_id: 1}}
]
db.sallesTpBom.aggregate(pipeline3)

// Exercice 4
var pipeline4 = [
    {$unwind: "$styles"},
    {$group: {
        _id: "$styles",
        nombreDeSalles: {$sum: 1}
    }},
    {$sort: {_id: 1}},
    {$project: {
        _id:0, 
        style: "$_id", 
        nombreDeSalles:1
    }}
]
db.sallesTpBom.aggregate(pipeline4)

// Exercice 5
var pipeline5 = [
    {$bucket: {
        groupBy: "$capacite",
        boundaries: [100, 500, 5000],
        default: "Autres",
        output: {
            nombreDeSalles: {$sum: 1}
        }
    }},
    {$project: {
        _id:0,
        capacite: "$_id",
        nombreDeSalles:1
    }}
]
db.sallesTpBom.aggregate(pipeline5)

// Exercice 6
var pipeline6 = [
    {$project: {
        _id: 0,
        nom: 1,
        avis_excellents: {
            $filter: {
                input: "$avis",
                as: "avis",
                cond: {$eq: ["$avis.note", 10]}
            }
        }
    }}
]
db.sallesTpBom.aggregate(pipeline6)

// Exercice 7
// Exercice 8

// Exercice 9
var pipeline9 = [
    {$addFields:{
        moyenne: {$avg: "$avis.note"}
    }},
    {$match: {moyenne: {$gt: 8}}},
    {$project: {
        _id:0,
        nom:1,
        moyenne:1
    }}
]
db.sallesTpBom.aggregate(pipeline9)

// Exercice 10
var pipeline10 = [
    {$match:{capacite: {$lt: 200}}},
    {$project: {
        _id:0,
        nom:1,
        capacite:1
    }}
]
db.sallesTpBom.aggregate(pipeline10)

// Exercice 11
var pipeline11 = [
    {$project: {
        _id:0,
        nom:1,
        capacite:1,
        taille:{
            $cond: {
                if: {$lt:["$capacite", 100]}, 
                then: "Petite", 
                else: {
                    $cond: {
                        if: {$lt:["$capacite", 500]}, 
                        then: "Moyenne", 
                        else: "Grande"
                    }
                }
            }
        }
    }}
]
db.sallesTpBom.aggregate(pipeline11)

// Exercice 12



// Écrivez le pipeline qui affichera le nom des salles ainsi qu’un tableau nommé avis_excellents qui
// contiendra uniquement les avis dont la note est de 10

/* -- {
--     _id: 2,
--     nom: 'La Scala 2',
--     adresse: {
--       numero: 31,
--       voie: 'Rue de la Musique',
--       codePostal: '33000',
--       ville: 'Lille',
--       localisation: {
--         type: 'Point',
--         coordinates: [ 48.67035928265153, -0.08714120672808079 ]
--       }
--     },
--     styles: [ 'jazz', 'soul', 'funk', 'blues' ],
--     avis: [
--       { date: '2024-07-29', note: 5 },
--       { date: '2024-01-01', note: 1 },
--       { date: '2024-10-18', note: 8 },
--       { date: '2024-10-29', note: 7 },
--       { date: '2024-05-30', note: 9 },
--       { date: '2024-04-15', note: 6 },
--       { date: '2024-05-22', note: 5 },
--       { date: '2024-04-27', note: 1 },
--       { date: '2024-12-08', note: 4 }
--     ],
--     capacite: 100,
--     smac: true
-- }, */