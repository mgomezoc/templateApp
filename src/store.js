//ANCHOR STORE
import Xhr from "./xhr";
import localforage from "localforage";

const API_STP = "https://ocsi.mx/Extranet/Services/WebApi_STP/";

export default {
  // NOTE Login
  Login(data) {
    var settings = {
      "path": "token",
      "type": "POST",
      "data": data,
      "error": false
    }
    return Xhr.ajax(settings);
  },
  // NOTE Registrar
  /*
  "data": {
        "Email": "cbonilla@onecard.mx",
        "CellPhone": "8112451220",
        "Password": "Carlos1!",
        "ConfirmPassword": "Carlos1!",
        "TwoFactorType": "1",
        "Device": "1234567",
        "System": "iOs",
        "IMEI": "7896541"
      }
  */
  Register(data) {
    var settings = {
      "path": "api/account/Register",
      "type": "POST",
      "data": data
    };

    return Xhr.ajax(settings);
  },
  // NOTE Verificar Celular
  /*
  "data": {
        "CellPhone": "8112451220",
        "Code": "411588"
      }
   */
  VerifyPhoneNumber(data) {
    var settings = {
      "path": "api/Account/Cellphone/Verify",
      "method": "POST",
      "data": data
    };

    return Xhr.ajax(settings);
  },
  // NOTE Combo Paises
  GetCountries() {
    var settings = {
      "path": "api/onboarding/GetCountries"
    }

    return Xhr.ajax(settings);
  },
  // NOTE Combo Estados
  GetStates() {
    var settings = {
      "path": "api/onboarding/GetStates"
    }

    return Xhr.ajax(settings);
  },
  // NOTE Combo Colonias
  GetColonies(ZipCode) {
    var settings = {
      "path": "api/onboarding/GetColonies",
      "method": "GET",
      "data": {
        "ZipCode": ZipCode
      }
    }

    return Xhr.ajax(settings);
  },
  GetProfile() {
    var settings = {
      "path": "api/onboarding/GetProfile"
    }

    return Xhr.ajax(settings);
  },
  SetData(data) {
    var settings = {
      "path": "api/onboarding/SetData",
      "type": "POST",
      "data": data
    }

    return Xhr.ajax(settings);
  },
  // NOTE Cliente
  /*
  "CountryBirth": "2",
  "StateBirth": "4",
  "CountryResidence": "4",
  "Names": "Carlos Antonio",
  "FirstLastName": "Bonilla",
  "SecondLastName": "Martinez",
  "Birthday": "1989-03-17",
  "Gender": "1"
  */
  SetClient(data) {
    return Promise.resolve({
      Success: true
    });
    var settings = {
      "path": "api/onboarding/setclient",
      "type": "POST",
      "data": data
    };

    return Xhr.ajax(settings);
  },
  // NOTE Combo Parentesco
  GetRelationship() {
    var settings = {
      "path": "api/onboarding/GetRelationship",
    }

    return Xhr.ajax(settings);
  },
  // NOTE Obtiene los beneficiarios de una cuenta
  GetBeneficiaries() {
    var settings = {
      "path": "api/onboarding/GetBeneficiaries",
      "method": "GET"
    };

    return Xhr.ajax(settings);
  },
  // NOTE Guarda Beneficiario
  /*
    "Relationship": "3",
    "Names": "Carlos Antonio",
    "FirstLastName": "Bonilla",
    "SecondLastName": "Martinez",
    "Birthday": "1989-03-17",
    "Percentage": "40",
    "Latitude": "2222222222222",
    "Length": "6666666666666"
  */
  setBeneficiary(data) {
    var settings = {
      "path": "api/onboarding/setBeneficiary",
      "type": "POST",
      "data": data
    }
    return Xhr.ajax(settings);
  },
  // NOTE Imagen de perfil
  SetPhoto(b64_Photo) {
    var settings = {
      "path": "api/onboarding/SetPhoto",
      "type": "POST",
      "data": {
        "b64_Photo": b64_Photo
      }
    }

    return Xhr.ajax(settings);
  },
  // NOTE Obtener token
  LoginSTP(data) {
    data = {
      Grant_type: "password",
      Username: "Manuel Gomez",
      Password: "Rrasec13!"
    };

    return Xhr.ajax({
      type: "POST",
      SERVER_URL: API_STP,
      path: "token",
      data: data
    });
  },
  // NOTE Obtener CLABE STP
  GetClabeSTP(data) {
    data.iInterface = 4;
    data.vcReferencia = "OC123";

    return $.ajax({
      type: "POST",
      url: "https://ocsi.mx/Extranet/Services/WebApi_STP/Api/Clabes/GetClabe",

      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "bearer " + data.access_token,
        "Cache-Control": "no-cache"
      }
    });
  },
  // NOTE Obtener CLABE
  GetClabe(data) {
    var settings = {
      "path": "api/stp/GetCLABE",
      "data": {
        "LinkId": "14",
        "TypeId": "7"
      }
    }

    return Xhr.ajax(settings);
  },
  // NOTE Obtener Instituciones
  Instituciones(data) {
    var settings = {
      "path": "api/onboarding/GetInstitutions",
    }

    return Xhr.ajax(settings);
  },
  // NOTE Obtener TipoCuentas
  TipoCuentas(data) {
    var settings = {
      "path": "api/onboarding/GetAccountTypes",
    }

    return Xhr.ajax(settings);
  },
  // CompareByBase64
  // face1 , face2
  CompareByBase64(data) {
    var settings = {
      "path": "api/face/compareByBase64",
      "method": "POST",
      "data": data
    };

    return Xhr.ajax(settings);
  },
  // NOTE Manda mensaje push
  async Push(data) {
    var deviceId = await localforage.getItem('deviceId');

    if (deviceId) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fcm.googleapis.com/fcm/send",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "key=AAAAOg9Xx2M:APA91bES7zcox0BTDrszJgn3ou4cBNDHMs_d3QfYo57DLJoHpPzDqU3bjj7PP7Xy_fZ6Ti41lys1vV05F9xbVl2ktTmQaKnsVVUcMtU3yXr2p5-UtKIWKBeX0u4ray8-RWW_Qm6ybK9g"
        },
        "data": "{\r\n \"to\" : \"" + deviceId + "\",\r\n \"collapse_key\" : \"type_a\",\r\n \"notification\" : {\r\n     \"body\" : \"" + data + "\",\r\n     \"title\": \"MLPS\",\r\n },\r\n \"data\" : {\r\n     \"body\" : \"" + data + "\",\r\n     \"title\": \"ONECARD\"\r\n }\r\n}"
      }

      return $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }

  }
};
