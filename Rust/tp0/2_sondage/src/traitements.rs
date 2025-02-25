use std::collections::HashMap;

use crate::Histogramme;

/// Renvoie la valeur médiane d’un histogramme (le plus petit indice `i` tel que la somme
/// des valeurs avant `i` représente au moins la moitié de la somme de tout l’histogramme.)
pub fn mediane(h: Histogramme) -> Option<usize> {
    todo!()
}

/// Renvoie l’indice de l’histogramme avec la meilleure médiane 
pub fn meilleure_option(sondage: Vec<Histogramme>) -> Option<usize> {
    todo!()
}

// Ci-dessous, bonus sondages "Range" avec slider.


pub fn mediane_vec(v: &[f64]) -> Option<f64> {
    todo!()
}

/// Pour les sondages "Range", renvoie la clé avec la meilleure médiane.
pub fn meilleure_option_range(sondage: HashMap<String, Vec<f64>>) -> Option<String> {
    todo!()
}

pub fn nombre_dans_intervalle(sondage: &[f64], borne_inf: f64, borne_sup: f64) -> u32 {
    todo!()
}
