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
        title: "Opvragen Funderingsrisico",
        subtitle: "Het funderingsrisico geeft een indicatie van een indicatief te verwachten risico op funderingsproblematiek.",
        content: "<p>Het risico is tot stand gekomen door het combineren van landelijk beschikbare en openbare gegevens over panden en gegevens over ondergrond en grondwater.</p><p>Meer informatie over funderingsproblematiek, toetsingen en de bepaling over het funderingsrisico vindt u op de website van het onafhankelijk <a href='https://www.kcaf.nl/funderingslabel/' target='_blank'>Kennis Centrum Aanpak Funderingsproblematiek</a>.</p>",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}