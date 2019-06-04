import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorService } from './../src/doctor-service.js';
import './../src/styles.css';

function nameLogic(docName){
  let nameService = new DoctorService();
  let promise = nameService.getDoctorByName_Seattle(docName);
  tablePopulate(promise);
}

function afflictionLogic(afflicName){
  let afflictionService = new DoctorService();
  let promise = afflictionService.getDoctorByMedicalIssue_Seattle(afflicName);
  tablePopulate(promise);
}

function tablePopulate(promise){
  promise.then(function(response){
    let body = JSON.parse(response);
    if(body.data.length === 0){
      alert("No doctors in Seattle found based on your search. Please try again.");
      return;
    }
    for(var i = 0; i < body.data.length; i++){
      let appendString = "";
      let firstNameStr = "<td>" + `${body.data[i].profile.first_name}` + "</td>";
      let lastNameStr = "<td>" + `${body.data[i].profile.last_name}` + "</td>";
      let addressStr = "<td>" + `${body.data[i].practices[0].visit_address.street}` + " " + `${body.data[i].practices[0].visit_address.city}` + ", " + `${body.data[i].practices[0].visit_address.state}` + "</td>";
      let phoneStr = "<td>" + `${body.data[i].practices[0].phones[0].number}` + "</td>";
      let websiteStr = "<td>" + `${body.data[i].practices[0].website}` + "</td>";
      let newPatientsStr = "";
      if(`${body.data[i].practices[0].accepts_new_patients}`){
        newPatientsStr = "<td>Yes</td>";
      }else{
        newPatientsStr = "<td>No</td>";
      }
      appendString = "<tr>" + firstNameStr + lastNameStr + addressStr + phoneStr + websiteStr + newPatientsStr + "</tr>";
      $("#doctorReturn").append(appendString);
    }
  });
}
function dataClear(){
  $("#nameVal").val("");
  $("#afflictionVal").val("");
}
function tableClear(){
  $("#doctorReturn td").remove();
}

//Front-End JS
$(document).ready(function(){
  $("#nameForm").submit(function(event){
    event.preventDefault();
    tableClear();
    let docName = $("#nameVal").val();
    nameLogic(docName);
    dataClear();
  });
  $("#afflictionForm").submit(function(event){
    event.preventDefault();
    tableClear();
    let afflicName = $("#afflictionVal").val();
    afflictionLogic(afflicName);
    dataClear();
  });
});
