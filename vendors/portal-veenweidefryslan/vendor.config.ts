import * as logo from './assets/logo.png'
import * as homeImage from './assets/home.jpg'

export default {
    name: "portal-fundermaps",
    client_id: 63,
    style: {
        mapboxPrimaryColor: "#2657FF",
    },
    logo: logo,
    home: {
        title: "Schademelding maken",
        subtitle: "Bij het funderingsloket Veenweide Fryslân kunt u melding maken van funderingsschade aan panden in het Veenweidegebied van Fryslân. Meldingen worden behandeld door het KCAF (Kennis Centrum Aanpak Funderingsproblematiek), een onafhankelijke stichting voor Funderingsproblematiek.",
        content: "Uw melding wordt door een funderingsdeskundige van het KCAF op afstand bekeken en voorziet u vervolgens van een advies. Het loket is een initiatief van de provincie Fryslân, Wetterskip Fryslân en de gemeenten Leeuwarden, Heerenveen, Smallingerland, Opsterland, Weststellingwerf, De Fryske Marren en Súdwest-Fryslân.",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}