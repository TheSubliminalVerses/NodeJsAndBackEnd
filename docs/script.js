/**
 * This webpage is written by Mani Gudvardarson and Michael Adrian Polesensky
 * for Assignment 3 in Web Technology at VU University Amsterdam.
 *
 * Coordinator: J.R . van Ossenbruggen
 * TA: Mithat Ozgun
 * Group: 109
 * Date: 27.1.2022
 */
$('header').on('click', (e) => {
  $(e.target).parent().closest('article').find('section').toggle('fade');
})

$('a[href="#object-product"]').on('click', (e) => {
  $('#object-product').find('section').show('fade');
})