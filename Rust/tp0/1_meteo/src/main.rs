/// COMPILER : cargo build
/// COMPILER + LANCER : cargo run
/// TESTER : cargo tests (nom du ficher sans .rs)
/// CREER LE DOC : cargo doc ( utilise les commentaires ///)

mod tests;

#[derive(Clone, Copy, Debug)]
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
#[derive(Clone, Copy, Debug)]
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

struct Meteo {
    temperature: f32,
    ciel: Ciel,
    alerte: Option<Alerte>
}

fn que_porter(temperature: f32) -> &'static str {
    if temperature < -5.0 {
        return "un anorak";
    } else if temperature < 0.0 {
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
        Ciel::Brouillard => "Il'y a du brouillard, on’y voit rie,",
        Ciel::Neige(_) | Ciel::Pluie(_) => "risque d’intempéries",
    }
}

fn print_meteo(m: Meteo) {
    println!("La météo d’aujourd’hui");

    let tenue = que_porter(m.temperature);
    println!("Il fera {} degrés, on vous conseille de mettre {tenue}",
	     m.temperature);

    println!("{}", decrit_ciel(m.ciel));
    match m.ciel {
        Ciel::Clair | Ciel::Nuageux | Ciel::Brouillard => (),
        Ciel::Pluie(hauteur) => println!("Hauteur de pluie: {}mm", hauteur),
        Ciel::Neige(hauteur) => println!("Hauteur de neige: {}cm", hauteur),
    }
    
    match m.alerte {
	None => println!("Rien à signaler"),
	Some(a) => println!("{}", affiche_alerte(a))
    }

}
/// Convertit une température en degrés Celsius en degrés Farenheit
fn to_farenheit(t_celsius: f32) -> f32 {
    (t_celsius * 5.0 / 9.0) + 32.0
}

fn main() {
    let meteojourdhui = Meteo {
	temperature: 12.0,
	ciel: Ciel::Brouillard,
	alerte: Some(Alerte::Vent)
    };

    print_meteo(meteojourdhui);
}
