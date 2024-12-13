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

// Ci-dessous, partie sondages "Range" avec slider.

/// Renvoie la médiane d’un vecteur de flottants
pub fn mediane_vec(v: &[u32]) -> Option<u32> {
    todo!()
}

/// Renvoie la clé associée à la valeur avec la meilleure médiane.
pub fn meilleure_option_range(sondage: HashMap<String, Vec<u32>>) -> Option<String> {
    todo!()
}

/// indique combien de valeurs dans le tableau v sont comprises entre les bornes
pub fn nombre_dans_intervalle(sondage: &[u32], borne_inf: u32, borne_sup: u32) -> u32 {
    todo!()
}
