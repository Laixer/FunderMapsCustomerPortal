import * as logo from './assets/logo.svg'
import * as homeImage from './assets/home.jpg'
import * as background from './assets/background.jpg'

export default {
    name: "portal-fundermaps",
    client_id: 61,
    style: {
        mapboxPrimaryColor: "#2657FF",
    },
    background: background,
    logo: logo,
    home: {
        title: "Opvragen Funderingslabel",
        subtitle: "Het Funderingslabel geeft een indicatie van het te verwachten risico op funderingsproblematiek.",
        content: "<p>Het label is tot stand gekomen door het combineren van pandgegevens en gegevens over ondergrond en grondwater. Toetsingen worden uitgevoerd voor; schimmelaantasting door droogstand van houten palen (paalrot), bacteriële aantasting (palenpest), gebrek aan draagkracht/negatieve kleef, bodemdaling/bodeminklinking en verschilzakking voor niet onderheide panden.</p><p>Meer informatie over funderingsproblematiek en de toetsingen vindt u op de website van het onafhankelijk <a href='https://www.kcaf.nl/funderingslabel/' target='_blank'>Kennis Centrum Aanpak Funderingsproblematiek</a>.</p>",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}