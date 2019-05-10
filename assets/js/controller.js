    var opl = {};
    this.vectorLayers = [];
    var geolocation = new ol.Geolocation({
        tracking : true
    });

    opl.getLayer = function(name) {
        if (name == null) {
            name = "main";
        }

        return self.vectorLayers[name]? self.vectorLayers[name] : null;
    };

 function carregarMapa(){

 var object = setKml();
 var coords1 = ol.proj.transform([parseFloat(object.west), parseFloat(object.south)], "EPSG:4326", "EPSG:3857");
 var coords2 = ol.proj.transform([parseFloat(object.east), parseFloat(object.north)], "EPSG:4326", "EPSG:3857");
 var coordscenter = [(parseFloat(object.east) + parseFloat(object.west)) / 2, (parseFloat(object.north) + parseFloat(object.south)) / 2];

      var map = new ol.Map({
        target: 'map',
        layers: [
           new ol.layer.Tile({
            source: new ol.source.OSM()
           })
        ],
        view: carregarView(),
        interactions : carregarInteractions(),
        moveTolerance : 5,
        controls: carregarControls()
     });
      var vectorSource = carregarVectorSource(carregarPixelProjection(coords1, coords2), object);
      // self.map.addLayer(vectorLayer);
      map.getLayers().setAt(1, carregarVectorLayer(vectorSource, object));
}

 function setKml() {
     var objectoKml = {
         id: 1,
         descricao: "teste",
         east: "-54.5904758912788",
         north: "-20.6517650974851",
         south: "-20.6819818271086",
         west: "-54.6118412556591",
         image: "../assets/kml/MIABM_EC_00-20_A4.png"
     };

     return objectoKml;
 }

 function carregarGiroscopio(){

    var view = carregarView();
    var gn = new GyroNorm();

          gn.init().then(function() {
            gn.start(function(event) {
              var center = view.getCenter();
              var resolution = view.getResolution();
              var alpha = toRadians(event.do.beta);
              var beta = toRadians(event.do.beta);
              var gamma = toRadians(event.do.gamma);

              el('alpha').innerText = alpha + ' [rad]';
              el('beta').innerText = beta + ' [rad]';
              el('gamma').innerText = gamma + ' [rad]';

              center[0] -= resolution * gamma * 25;
              center[1] += resolution * beta * 25;

              view.setCenter(view.constrainCenter(center));
            });
          });
 }

 function carregarView(){
   var view = new ol.View({
     projection : 'EPSG:3857',
     center : ol.proj.transform([-49.2561293, -21.68105], "EPSG:4326", "EPSG:3857"),
     maxZoom : 18,
     minZoom : 5,
     zoom: 5
   });

   return view;
 }

 function carregarInteractions(){
   var interactions = new ol.interaction.defaults({
    pinchZoom : true,
    pinchRotate : false,
    dragPan : true,
    doubleClickZoom : true
   });

   return interactions;
 }

  function carregarControls(){
    var controls = new ol.control.defaults({
         zoom: true,
         attribution: false,
         rotate: false
    });

    return controls;
  }

 function carregarPixelProjection(coords1, coords2){
  var pixelProjection = new ol.proj.Projection({
      code: 'pixel',
      units: 'pixels',
      extent: coords1.concat(coords2)
  });

   return pixelProjection;
 }

 function carregarVectorSource(pixelProjection, object){
   var vectorSource = new ol.source.ImageStatic({
        url: object.image,
        projection: pixelProjection,
        imageExtent: pixelProjection.getExtent()
   });

   return vectorSource;
 }

 function carregarVectorLayer(vectorSource, object){
  var vectorLayer = new ol.layer.Image({
    title: object.descricao,
      source: vectorSource,
      opacity: 0.5
  });

  return vectorLayer;
 }

 function myFunction(x, y) {
    return x + y;
 }