use std::{fs::File, path::Path};

use rand::Rng;
use serde::Deserialize;
mod tests;

#[derive(Clone, Copy, Debug, Deserialize)]
enum Alerte {
    Vent,
    Inondation,
}

fn affiche_alerte(a: Alerte) -> &'static str{
    match a {
	Alerte::Vent => "Alerte vent fort",
	Alerte::Inondation => "Alerte inondation, vagues ou submersion"
    }
}

/// L’état du ciel un jour donné
#[derive(Clone, Copy, Debug, Deserialize)]
enum Ciel {
    /// Ciel clair
    Clair,

    /// Ciel nuageux
    Nuageux,

    /// Pluie, avec un entier (non-signé sur 32 bits) indiquant le quantité de pluie prévue (en mm)
    Pluie(f32),

    /// Neige, avec un entier indiquant la hauteur de neige prévue (en cm)
    Neige(f32),

    /// Brouillard
    Brouillard
}

#[derive(Deserialize, Debug)]
struct Meteo {
    temperature: f32,
    ciel: Ciel,
    alerte: Option<Alerte>
}

fn que_porter(temperature: f32) -> &'static str {
    if temperature < 0.0 {
	return "un bon manteau";
    } else if temperature < 15.0 {
	return "un petit pull";
    } else if temperature < 25.0 {
	return "une chemise";
    } else {
	return "un T-shirt";
    }
}

fn decrit_ciel(c: Ciel) -> &'static str {
    match c {
	Ciel::Clair => "il fait beau, youpi!",
	Ciel::Nuageux => "il y a des nuages :-(",
	Ciel::Brouillard => "Il░y a d░░brouillard, on░░’y v░░t rie░",
	Ciel::Neige(_) | Ciel::Pluie(_) => "risque d’intempéries",
    }
}

fn print_meteo(m: Meteo) {
    println!("La météo d’aujourd’hui");

    let tenue = que_porter(m.temperature);
    println!("Il fera {} degrés, on vous conseille de mettre {tenue}",
	     m.temperature);

    println!("{}", decrit_ciel(m.ciel));

    match m.alerte {
	None => println!("Rien à signaler"),
	Some(a) => println!("{}", affiche_alerte(a))
    }

    match m.ciel {
	Ciel::Neige(hauteur) => println!("Il va neiger, hauteur de neige attendue: {}cm", hauteur),
	Ciel::Pluie(hauteur) => println!("Il va pleuvoir, cumul de pluie attendu: {}mm", hauteur),
	_ => ()
    }
}

fn to_farenheit(t_celsius: f32) -> f32 {
    t_celsius * 5.0 / 9.0
}

fn meteo_aleatoire() -> Meteo {
    let mut rng = rand::thread_rng();
    let temperature: f32 = rng.gen_range(-15.0..40.0);
    let ciel = match rng.gen_range(0..5) {
        0 => Ciel::Brouillard,
        1 => Ciel::Clair,
        2 => {
            let hauteur = rng.gen_range(0.0..20.0);
            Ciel::Neige(hauteur)
        },
        3 => Ciel::Nuageux,
        4 => {
            let hauteur = rng.gen_range(0.0..15.0);
            Ciel::Pluie(hauteur)
        }
        _ => unreachable!()
    };
    let alerte = if rng.gen_range(0.0..100.0) < 20.0 {
        if rng.gen_range(0.0..100.0) < 50.0 {
            Some(Alerte::Inondation)
        } else {
            Some(Alerte::Vent)
        }
    } else {
        None
    };
    Meteo {
        temperature,
        ciel,
        alerte,
    }
}

fn lit_csv_meteo(path: &Path) -> Vec<Meteo> {
    let csv_file = File::open(path).unwrap();
    let mut reader = csv::Reader::from_reader(csv_file);
    let mut res = vec![];
    for r in reader.records() {
        let r = r.expect("Erreur de format csv");
        let temperature: f32 = r[0].parse().expect("erreur de format numérique champ 0");
        let ciel = 
            if &r[1] == "Clair" {
                Ciel::Clair
            } else if &r[1] == "Nuageux" {
                Ciel::Nuageux
            } else if &r[1] == "Pluie" {
                let hauteur = r[2].parse().expect("erreur de format numérique champ 2");
                Ciel::Pluie(hauteur)
            } else if &r[1] == "Neige" {
                let hauteur = r[2].parse().expect("erreur de format numérique champ 2");
                Ciel::Neige(hauteur)
            } else {
                Ciel::Brouillard
            };
        let alerte: Option<Alerte> =
            match r[3].parse().ok() {
                None => None,
                Some(0) => Some(Alerte::Vent),
                Some(1) => Some(Alerte::Inondation),
                Some(_) => panic!("Erreur de format d’alerte"),
            };

        let meteo: Meteo = Meteo {
            temperature,
            ciel,
            alerte,
        };
        res.push(meteo);
    }
    res
}

fn temperature_moyenne(archives_meteo: &[Meteo]) -> f32 {
    let mut somme = 0.0;
    let n = archives_meteo.len();
    for meteo_jour in archives_meteo {
        somme += meteo_jour.temperature;
    }
    somme / (n as f32)
}

fn proba_alerte(archives_meteo: &[Meteo]) -> f32 {
    let mut nb_jour_avec_alerte: f32 = 0.0;
    for meteo_jour in archives_meteo {
        if meteo_jour.alerte.is_some() {
            nb_jour_avec_alerte += 1.0;
        }
    }
    return nb_jour_avec_alerte / (archives_meteo.len() as f32);
}

fn amplitude_thermique(archives_meteo:&[Meteo]) -> f32{

    if archives_meteo.len() == 0 {
        return None;
    }

    let mut tmin: f32 = archives_meteo[0].temperature;
    let mut tmax: f32 = archives_meteo[0].temperature;
    for meteo_jour in archives_meteo {
        let t = meteo_jour.temperature;
        if t < tmin{
            tmin = t;
        }
        if t > tmax{
            tmax = t;
        }
    }
    return Some(tmax - tmin);
}

fn main() {
    let meteojourdhui = Meteo {
	temperature: 12.0,
	ciel: Ciel::Brouillard,
	alerte: Some(Alerte::Vent)
    };

    print_meteo(meteojourdhui);

    let archive_meteo_orleans: Vec<Meteo> = lit_csv_meteo(Path::new("./meteo_orleans.csv"));
    
    for m in  archive_meteo_orleans {
        print_meteo(m);
    }
}
