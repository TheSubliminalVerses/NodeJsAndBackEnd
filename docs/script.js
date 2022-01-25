$('header').on('click', (e) => {
  $(e.target).parent().closest('article').find('section').toggle('fade');
})

$('a[href="#object-product"]').on('click', (e) => {
  $('#object-product').find('section').show('fade');
})