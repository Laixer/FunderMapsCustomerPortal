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
        title: "Indicatief Funderingsrisico",
        subtitle: "In tegenstelling tot enkele media uitingen de afgelopen 2 weken is de inschatting van het funderingsrisico geen verplicht label volgend jaar. Het doel van de risicoschatting is het verhogen van de waakzaamheid voor de funderingsproblematiek in Nederland.",
        content: "<p>Op het moment is het model achter het funderingsrisico en de ontsluiting hiervan via de website in een testfase. Dit werd aanvankelijk beoogd tot eind december door te zetten. Door het hogere aantal bezoekers en daarmee ook het hoger aantal meldingen is er besloten de testfase vervroegd te beëindigen. De komende maanden wordt het model, mede op basis van de meldingen aangepast en verbeterd.</p><p>Voor meer informatie wordt verwezen naar de website van <a href='https://www.kcaf.nl/funderingsrisico/'>Kennis Centrum Aanpak Funderingsproblematiek</a>.</p>",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}