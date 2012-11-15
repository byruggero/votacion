//creacion nuestra documento de Frameworks, en sql seria la tabla
var Frameworks = new Meteor.Collection("frameworks");

if (Meteor.isClient) { // detectamos si se trata del cliente
  Template.list.frameworks = function () { //traemos la lista de los frameworks
    return Frameworks.find({}, {sort : {score: -1, name: 1}});
  };
  //logica para agregar los Frameworks
  Template.addFramework.events({
    'click button' : function (e) {//cuando le damos click al boton
      var value = $('#f-name').val();
      e.preventDefault();
      if(value){
        if(Frameworks.find({ name : value }).count() === 0) {//si ya existe no lo agrega
          Frameworks.insert({ name : value, votes : 1});
        }else{
          alert('It has been already added!');
        }
      }
    }
  });
  //logica para votar
  Template.framework.events({
    'click button' :function() {
      // como estamos ejecutando el codigo para un framework en especifico tenemos
      // acceso a el mediante this._id
      Frameworks.update( { _id : this._id }, { $inc : { votes : 1 } } );
    }
  });
}