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
        title: "Wat doen we?",
        subtitle: "Bij het funderingsloket van FunderMaps kunt u melding maken van funderingsschade aan panden.",
        content: "<p>Meldingen worden behandeld door het KCAF (Kennis Centrum Aanpak Funderingsproblematiek), een onafhankelijke stichting die tot doel heeft om kennis rond fundering te verzamelen, te verbeteren en te delen.</p><p>Het KCAF al sinds 2012 het landelijk funderingsloket waar meldingen en klachten worden gedaan en behandeld.</p>",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}