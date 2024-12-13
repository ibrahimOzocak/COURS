use crate::{Ciel, decrit_ciel, to_farenheit, que_porter};

#[test]
fn test_decrit_ciel() {
    let b = decrit_ciel(Ciel::Brouillard);
    assert!(b.contains("░"));
    let n = decrit_ciel(Ciel::Nuageux);
    assert!(!n.contains("░"));
}


#[test]
fn test_conversion_farenheit() {
    let t = 0.0;
    assert_eq!(to_farenheit(t), 32.0);
}

#[test]
fn test_que_porter() {
    let mut t = 30.0;
    assert_eq!(que_porter(t), "un T-shirt");
    t = 20.0;
    assert_eq!(que_porter(t), "une chemise");    
    t = -15.0;
    assert_eq!(que_porter(t), "un anorak");
}
