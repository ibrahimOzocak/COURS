#[derive(Clone, Copy, Debug)]
enum ParfumSirop{
    Noisette,
    Chocolat,
    Caramel,
}

enum BaseBoisson {
    /// un café, le booléen indique si on y met du lait
    Cafe(lait: bool, sirop: Option<ParfumSirop>),
    The,
    Chocolat,
}

struct BoissonChaude {
    sucre: u32,
    bio_equitable: bool,
    base: BaseBoisson,
}

fn affiche_boisson(b: BoissonChaude){
    match b.base {
        BaseBoisson::Cafe(lait: avec_lait, sirop: _s) => {
            let mention_lait = if avec_lait {"au lait"} else {"noir"};
            let mention_sirop = match _s {
                Some(ParfumSirop::Noisette) => "à la noisette",
                Some(ParfumSirop::Chocolat) => "au chocolat",
                Some(ParfumSirop::Caramel) => "au caramel",
                None => "",
            };
            println!("Vous avez choisi un cofé")
        },
        BaseBoisson::The => {println!("Un petit thé?")},
        BaseBoisson::Chocolat => {
            println!("Vous avez choisi un chocolat");
        },
    }
    if b.sucre > 0 {
        println!("Avec {} sucre(s)", b.sucre);
    }else{
        println!("Sans sucre");
    }
    println!("Avec {} sucre(s)", b.sucre);

    if b.bio_equitable {
        println!("Bio et équitable");
    }
}

fn prix(b: BoissonChaude) -> f32 {
    let mut prix = 40;
    if b.bio_equitable {
        prix += 10;
    }
    match b.base{
        BaseBoisson::Chocolat | BaseBoisson::The => {},
        BaseBoisson::Cafe(lait: avec_lait, sirop: s) => {
            if avec_lait {
                prix += 5;
            }
            match s{
                None => {},
                Some(_) => prix += 10,
            }
        }
    }
    return prix;
}

fn main(){
    let thé_sucré_équitable = BoissonChaude {
        sucre: 10,
        bio_equitable: true,
        base: BaseBoisson::The,
    };

    let chocolat_simple = BoissonChaude {
        sucre: 0,
        bio_equitable: false,
        base: BaseBoisson::Chocolat,
    };

    let macchiote = BoissonChaude {
        sucre: 50,
        bio_equitable: false,
        base: BaseBoisson::Cafe{
            lait: true,
            sirop: Some(ParfumSirop::Caramel),
        },
    };
}