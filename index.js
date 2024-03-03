
let prodocts = [];
let digikala=[] ;
window.onload = function () {
  fetch('https://api.digikala.com/v1/categories/tv2/search/?brands%5B0%5D=11349&has_selling_stock=1&sort=1&seo_url=%2Fcategory-tv2%2F%3Fbrands%255b0%255d%3D11349%26has_selling_stock%3D1%26sort%3D1&page=1')
    .then(response => response.json())
    .then(data1 =>
      data1.data.products.forEach(item => {
        item.id=item.default_variant.id
        document.getElementById('prList').innerHTML +=

          "<div class='cardprdc'>" +
          "<div class='thumbnail'>" +
          "<img src='" + item.images.main.url[0] + "' class='img-fluid prdctImg'>" +
          "</div>" +
          "      <div class='caption'>" +
          "<p class='prdctTitle'>" + item.title_fa + "</p>" +
          "<p class='prdctTitle'>" + item.default_variant.price.selling_price + "</p>" +
          "<div>" +
          "<button id='prdctAdd' onclick='increment(\"" + item.title_fa +"\",\""+item.images.main.url[0]+"\")' class=' btn btn-success'>افزودن به سبد خرید</button>" +
          // "<button id='prdctCount'  class=' btn btn-light'> 0 </button>" +
          "<button id='prdctRemove' onclick='decrement(\"" + item.title_fa +","+item.images.main.url[0]+ "\")' class=' btn btn-outline-danger'>-</button>" +

          "</div>" +
          "</div>" +
          "</div>"
          digikala.push(item)
        })
        
        );
        console.log(digikala)
}
function resetMenu() {
  let cx = 0
  document.getElementById('tbd').innerHTML = "";
  prodocts.forEach(item => {

    cx = item.count + cx;

      document.getElementById('tbd').innerHTML += '<tr style="font-size:12px"><td>' + item.title + '</td><td>' + item.count + '</td></tr>'


  })
  document.getElementById("counter").innerHTML = cx;

  // modal-body
}
function increment(title,image) {
  let flag = 0
  digikala.forEach(item => {
    if (item.title === title) flag = 1;
  })
  if (flag == 0) prodocts.push({ "title": title, "count": 1 ,"link":image})
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