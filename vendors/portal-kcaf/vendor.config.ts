import * as logo from './assets/logo.png'
import * as homeImage from './assets/home.jpg'

export default {
    name: "portal-kcaf",
    client_id: 62,
    style: {
        mapboxPrimaryColor: "#2657FF",
    },
    logo: logo,
    home: {
        title: "Wat doen we?",
        subtitle: "Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen.",
        content: "<p>KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken. KCAF is een stichting zonder winstoogmerk.</p><p>Bij dit loket kunt u een melding maken van een funderingsprobleem aan uw woning. Wij zullen u vrijblijvend van advies voorzien.</p>",
        image: homeImage
    },
    final: {
        content: "<p>Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld.</p><p>In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.</p>"
    }
}