
let prodocts = [];
window.onload = function () {

  fetch('https://api.digikala.com/v1/categories/tv2/search/?brands%5B0%5D=11349&has_selling_stock=1&sort=1&seo_url=%2Fcategory-tv2%2F%3Fbrands%255b0%255d%3D11349%26has_selling_stock%3D1%26sort%3D1&page=1')
    .then(response => response.json())
    .then(data =>
      data.data.products.forEach(item => {
        document.getElementById('prList').innerHTML += "<div class='col-sm-6 col-md-4'>" +
          "<div class='thumbnail' >" +
          "<img src='" + item.images.main.url[0] + "' class='img-responsive'>" +
          "<div class='caption'>" +

          "<div >" +
          "<button onclick='decrement(\"" + item.title_fa + "\")'  class='col-md-6 btn btn-warning'>-</button>" +
          "<button onclick='increment(\"" + item.title_fa + "\")' class='col-md-6 btn btn-success'>+</button>" +
          "</div>" +

          "<div class='row'>" +
          "<div class='col-md-6 col-xs-6'>" +
          "<h6>" + item.default_variant.rank + "</h6>" +
          "</div><div class='col-md-6 col-xs-6 price'>" +
          "<h3><label>" + item.default_variant.price.selling_price + "</label></h3>" +
          "</div></div>" +
          "<p>" + item.title_fa + "</p>" +
          "</div></div>";

      })

    );
}
function resetMenu() {
  let cx = 0
  document.getElementById('modalBody').innerHTML = "";
  prodocts.forEach(item => {
    cx = item.count + cx;
    document.getElementById('modalBody').innerHTML += "title:" + item.title + "<br/>" + "count:" + item.count + "<br/>" +
      "<div >" +
      "<button onclick='decrement(\"" + item.title + "\")'  class='col-md-6 btn btn-warning'>-</button>" +
      "<button onclick='increment(\"" + item.title + "\")' class='col-md-6 btn btn-success'>+</button>" +
      "</div>" + "<hr/>"
  })
  document.getElementById("counter").innerHTML = cx;
  // modal-body
}
function increment(title) {
  let flag = 0
  prodocts.forEach(item => {
    if (item.title === title) flag = 1;
  })
  if (flag == 0) prodocts.push({ "title": title, "count": 1 })
  if (flag == 1) prodocts.forEach(item => {
    if (item.title === title) {
      item.count += 1;
    }
  }
  );
  console.log(prodocts)
  resetMenu()
}
function decrement(title) {
  let flag = 0
  prodocts.forEach(item => {
    if (item.count > 1 && item.title === title) {
      console.log(item.count)
      flag = 1
    }
  })
  if (flag == 0) {
    console.log("hzf")
      ; prodocts.pop({ "title": title })
  }
  if (flag == 1) {
    console.log("kam")
    prodocts.forEach(item => {
      if (item.title === title) {
        item.count -= 1;
      }
    })
  }
  ;
  console.log(prodocts)
  resetMenu()
}