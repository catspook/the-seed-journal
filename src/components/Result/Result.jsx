import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import PhBar from '../Chart/pHBar'
import PlantRadar from '../Chart/RadarChart'
import ClickToShow from './ClickToShow'
import '../../styles/scss/Result.scss'

const canina = require('./trefle-rosa-canina.json')
const daphne = require('./trefle-daphne-striata.json')
const hypericum = require('./trefle-hypericum-mutilum.json')

class Result extends React.Component{
    constructor(props) {
        super(props)

        var fav = this.getLocal('favorites');
        if (fav){
            if (fav.includes(((window.location.href).split("/"))[4])){
                fav = true;
            }
            else {
                fav = false;
            }
        }else {
            fav = false;
        }

        this.state = {
            favorite: fav,
            response_status: '',
            slug: '',
            image_url: null,
            common_name: '(No common name listed)',
            scientific_name: '(Species not found)',
            author: 'none listed',
            bibliography: 'none listed',
            main_common_name: 'none listed',
            main_scientific_name: 'none listed',
            duration: 'none listed',
            common_names: 'none listed',
            //distribution
            native: 'none listed',
            introduced: "none listed",
            //flower
            flower_color: "none listed",
            flower_conspicuous: "none listed",
            //foliage
            texture: "none listed",
            foliage_color: "unkown",
            leaf_retention: "none listed",
            //fruit_or_seed
            fruit_or_seed_conspicuous: "none listed",
            fruit_or_seed_color: "none listed",
            shape: "none listed",
            seed_persistence: "none listed",
            //specifications
            ligneous_type: "none listed",
            growth_form: "none listed",
            growth_habit: "none listed",
            growth_rate: "none listed",
            ave_height: "none listed",
            max_height: "none listed",
            nitrogen: "none listed",
            orientation: "none listed",
            toxicity: "none listed",
            //growth
            description: "none listed",
            sowing: "none listed",
            days_to_harvest: "none listed",
            row_spacing: "none listed",
            spread: "none listed",
            ph_max: "none listed",
            ph_min: "none listed",
            growth_months: "none listed",
            bloom_months: "none listed",
            fruit_months: "none listed",
            min_precip: "none listed",
            max_precip: "none listed",
            min_root_depth: "none listed",
            min_temp_f: "none listed",
            max_temp_f: "none listed",
            synonyms: "none listed",
            light: "none listed",
            atmospheric_humidity: "none listed",
            soil_salinity: "none listed",
            soil_nutriments: "none listed",
            soil_texture: "none listed",

            genus: "none listed",
            family_common: "none listed",
            family: "none listed",
            species: "none listed",
            subspecies: "none listed",
            varieties: "none listed",
            hybrids: "none listed",
            forms: "none listed",
            subvarieties: "none listed",
            trefleDown: false,
            load: false,
        }
    }

    setLocal(name, key){
        var ls = require('local-storage');
        return ls.set(name, key);
    }

    getLocal(name){
        return require('local-storage').get(name);
    }

    componentDidMount() {
        this.afterPageLoads()
    }

    async makeApiCall(url, plantName) {
        let okayToSet = false
        let json = {}
        let response = {}

        if (plantName === 'rosa-canina') {
            okayToSet = true
            json = canina
        }
        else if (plantName === 'daphne-striata') {
            okayToSet = true
            json = daphne
        }
        else if (plantName === 'hypericum-mutilum') {
            okayToSet = true
            json = hypericum
        }
        else {
            response = await fetch(url);
            if (response.status === 200) {
                okayToSet = true
                json = await response.json()
            }
        }

        if (okayToSet) {
            let eng_common_names = "not listed"
            if (json.data.main_species.common_names.eng !== undefined) {
                eng_common_names = (json.data.main_species.common_names.eng).join(", ")
            }

            let flower_conspic = "not listed"
            if (json.data.main_species.flower.conspicuous != null) {
                flower_conspic = (json.data.main_species.flower.conspicuous ? "yes" : "no")
            }
            let leaf_ret = "not listed"
            if (json.data.main_species.foliage.leaf_retention != null) {
                leaf_ret = (json.data.main_species.foliage.leaf_retention ? "yes" : "no")
            }
            let fruit_conspic = "not listed"
            if (json.data.main_species.fruit_or_seed.conspicuous != null) {
                fruit_conspic = (json.data.main_species.fruit_or_seed.conspicuous ? "yes" : "no")
            }
            let seed_pers = "not listed"
            if (json.data.main_species.fruit_or_seed.seed_persistence != null) {
                seed_pers = (json.data.main_species.fruit_or_seed.seed_persistence ? "yes" : "no")
            }

            let synonymsList = "";
            if (json.data.main_species.synonyms !== []) {
                synonymsList = (json.data.main_species.synonyms).reduce((acc, element) => {
                    let this_name = (element.name != null ? element.name : "none listed")
                    acc.push(this_name)
                    return acc
                }, []);
            }
            synonymsList = synonymsList.join(", ")
            let speciesList = "none listed";
            if (json.data.species !== []) {
                speciesList = (json.data.species).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            speciesList = speciesList.join(", ")
            let subspeciesList = "none listed";
            if (json.data.subspecies !== []) {
                subspeciesList = (json.data.subspecies).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            subspeciesList = subspeciesList.join(", ")
            let varietiesList = "none listed";
            if (json.data.varieties !== []) {
                varietiesList = (json.data.varieties).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            varietiesList = varietiesList.join(", ")
            let hybridsList = "none listed";
            if (json.data.hybrids !== []) {
                hybridsList = (json.data.hybrids).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            hybridsList = hybridsList.join(", ")
            let formsList = "none listed";
            if (json.data.forms !== []) {
                formsList = (json.data.forms).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            formsList = formsList.join(", ")
            let subvarietiesList = "none listed";
            if (json.data.subvarieties !== []) {
                subvarietiesList = (json.data.subvarieties).reduce((acc, element) => {
                    let this_name = (element.common_name != null ? (element.common_name + " (" + element.scientific_name + ")") : element.scientific_name)
                    acc.push(this_name)
                    return acc
                }, []);
            }
            subvarietiesList = subvarietiesList.join(", ")

            this.setState(() => ({
                image_url: (json.data.image_url != null ? json.data.image_url : this.state.image_url),
                common_name: (json.data.common_name != null ? json.data.common_name : this.state.common_name),
                scientific_name: (json.data.scientific_name != null ? json.data.scientific_name : this.state.scientific_name),
                author: (json.data.author != null ? json.data.author : this.state.author),
                bibliography: (json.data.bibliography != null ? json.data.bibliography : this.state.bibliography),
                //main_species

                main_common_name: (json.data.main_species.common_name != null ? json.data.main_species.common_name : this.state.main_common_name),
                main_scientific_name: (json.data.main_species.scientific_name != null ? json.data.main_species.scientific_name : this.state.main_scientific_name),
                duration: (json.data.main_species.duration != null ? (json.data.main_species.duration).join(", ") : this.state.duration),
                common_names: eng_common_names,
                //distribution
                native: (json.data.main_species.distribution.native != null ? (json.data.main_species.distribution.native).join(", ") : this.state.native),
                introduced: (json.data.main_species.distribution.introduced != null ? (json.data.main_species.distribution.introduced).join(", ") : this.state.introduced),
                //flower
                flower_color: (json.data.main_species.flower.color != null ? (json.data.main_species.flower.color).join(", ") : this.state.flower_color),
                flower_conspicuous: flower_conspic,
                //foliage
                texture: (json.data.main_species.foliage.texture != null ? json.data.main_species.foliage.texture : this.state.texture),
                foliage_color: (json.data.main_species.foliage.color != null ? (json.data.main_species.foliage.color).join(", ") : this.state.foliage_color),
                leaf_retention: leaf_ret,
                //fruit_or_seed
                fruit_or_seed_conspicuous: fruit_conspic,
                fruit_or_seed_color: (json.data.main_species.fruit_or_seed.color != null ? (json.data.main_species.fruit_or_seed.color).join(", ") : this.state.fruit_or_seed_color),
                shape: (json.data.main_species.fruit_or_seed.shape != null ? json.data.main_species.fruit_or_seed.shape : this.state.shape),
                seed_persistence: seed_pers,
                //specifications
                ligneous_type: (json.data.main_species.specifications.ligneous_type != null ? json.data.main_species.specifications.ligneous_type : this.state.ligneous_type),
                growth_form: (json.data.main_species.specifications.growth_form != null ? json.data.main_species.specifications.growth_form : this.state.growth_form),
                growth_habit: (json.data.main_species.specifications.growth_habit != null ? json.data.main_species.specifications.growth_habit : this.state.growth_habit),
                growth_rate: (json.data.main_species.specifications.growth_rate != null ? json.data.main_species.specifications.growth_rate: this.state.growth_rate),
                ave_height: (json.data.main_species.specifications.average_height.cm != null ? json.data.main_species.specifications.average_height.cm : this.state.ave_height),
                max_height: (json.data.main_species.specifications.maximum_height.cm != null ? json.data.main_species.specifications.maximum_height.cm : this.state.max_height),
                nitrogen: (json.data.main_species.specifications.nitrogen_fixation != null ? json.data.main_species.specifications.nitrogen_fixation : this.state.nitrogen),
                orientation: (json.data.main_species.specifications.shape_and_orientation != null ? json.data.main_species.specifications.shape_and_orientation : this.state.orientation),
                toxicity: (json.data.main_species.specifications.toxicity != null ? json.data.main_species.specifications.toxicity : this.state.toxicity),
                //growth
                description: (json.data.main_species.growth.description != null ? json.data.main_species.growth.description : this.state.description),
                sowing: (json.data.main_species.growth.sowing != null ? json.data.main_species.growth.sowing : this.state.sowing),
                days_to_harvest: (json.data.main_species.growth.days_to_harvest != null ? json.data.main_species.growth.days_to_harvest : this.state.days_to_harvest),
                row_spacing: (json.data.main_species.growth.row_spacing.cm != null ? json.data.main_species.growth.row_spacing.cm : this.state.row_spacing),
                spread: (json.data.main_species.growth.spread.cm != null ? json.data.main_species.growth.spread.cm : this.state.spread),
                ph_max: (json.data.main_species.growth.ph_maximum != null ? json.data.main_species.growth.ph_maximum : this.state.ph_max),
                ph_min: (json.data.main_species.growth.ph_minimum != null ? json.data.main_species.growth.ph_minimum : this.state.ph_min),
                growth_months: (json.data.main_species.growth.growth_months != null ? 
                    ((json.data.main_species.growth.growth_months).map(word => word.charAt(0).toUpperCase() + word.slice(1))).join(', ') : this.state.growth_months),
                bloom_months: (json.data.main_species.growth.bloom_months != null ?
                    ((json.data.main_species.growth.bloom_months).map(word => word.charAt(0).toUpperCase() + word.slice(1))).join(', ') : this.state.bloom_months),
                fruit_months: (json.data.main_species.growth.fruit_months != null ? 
                    ((json.data.main_species.growth.fruit_months).map(word => word.charAt(0).toUpperCase() + word.slice(1))).join(', ') : this.state.fruit_months),
                min_precip: (json.data.main_species.growth.minimum_precipitation.mm != null ? json.data.main_species.growth.minimum_precipitation.mm : this.state.min_precip),
                max_precip: (json.data.main_species.growth.maximum_precipitation.mm != null ? json.data.main_species.growth.maximum_precipitation.mm : this.state.max_precip),
                min_root_depth: (json.data.main_species.growth.minimum_root_depth.cm != null ? json.data.main_species.growth.minimum_root_depth.cm : this.state.min_root_depth),
                min_temp_f: (json.data.main_species.growth.minimum_temperature.deg_f != null ? json.data.main_species.growth.minimum_temperature.deg_f : this.state.min_temp_f),
                max_temp_f: (json.data.main_species.growth.maximum_temperature.deg_f != null ? json.data.main_species.growth.maximum_temperature.deg_f : this.state.max_temp_f),
                synonyms: synonymsList,
                light: (json.data.main_species.growth.light != null ? json.data.main_species.growth.light : this.state.light),
                atmospheric_humidity: (json.data.main_species.growth.atmospheric_humidity != null ? json.data.main_species.growth.atmospheric_humidity : this.state.atmospheric_humidity),
                soil_nutriments: (json.data.main_species.growth.soil_nutriments != null ? json.data.main_species.growth.soil_nutriments : this.state.soil_nutriments),
                soil_salinity: (json.data.main_species.growth.soil_salinity != null ? json.data.main_species.growth.soil_salinity : this.state.soil_salinity),
                soil_texture: (json.data.main_species.growth.soil_texture != null ? json.data.main_species.growth.soil_texture : this.state.soil_texture),

                genus: (json.data.genus.name != null ? json.data.genus.name : this.state.genus),
                family_common: (json.data.family.common_name != null ? json.data.family.common_name : this.state.family_common),
                family: (json.data.family.name != null ? json.data.family.name : this.state.family),
                species: speciesList,
                subspecies: subspeciesList,
                varieties: varietiesList,
                hybrids: hybridsList,
                forms: formsList,
                subvarieties: subvarietiesList,
                trefleDown: false,
                load: false,
            }))
        }
        else {
            console.log(response.status)
            this.setState(() => ({
                trefleDown: true,
                response_status: response.status
            }))
        }
    }

    async afterPageLoads() {
        let cors_url = "https://cors-anywhere.herokuapp.com/"
        let plantName = ((window.location.href).split("/"))[4]
        let url = cors_url + "https://trefle.io/api/v1/plants/" + plantName + "?token=" + process.env.REACT_APP_TREFLE_API_TOKEN
        await this.makeApiCall(url, plantName)

        
        var fav = this.getLocal('favorites');

        if (fav === null){
            fav = false
        }else {
            if (fav.includes(((window.location.href).split("/"))[4])){
                fav = true;
            }else {
                fav = false;
            }
        }

        this.setState(() => ({
            favorite: fav,
            slug: ((window.location.href).split("/"))[4],
            load: true,
        }))
    }

    onFavorite = (e) => {
        // console.log("Adding favorite:");
        var fav = this.getLocal('favorites');

        if (fav === null){
            // console.log("\t - Favorites doesn't exist yet (creating)");
            fav = [];
        }

        if (!fav.includes(((window.location.href).split("/"))[4])){
            // console.log("\t - Favorites doesn't have [" + ((window.location.href).split("/"))[4] + "]");
            fav.push(((window.location.href).split("/"))[4]);
        }else {
            // console.log("\t - ERROR: Favorites already has [" + ((window.location.href).split("/"))[4] + "]");
        }

        this.setLocal('favorites', fav);
        // console.log("\t - setting favorites [" + fav + "]");

        // console.log("\t - Reading state was [" + this.state.favorite + "]");
        this.setState(() => ({
            favorite: true
        }))
        // console.log("\t - Setting state to [" + this.state.favorite + "]");
    }

    onUnFavorite = (e) => {
        // console.log("Removing favorite:");
        var fav = this.getLocal('favorites');

        if (fav === null){
            // console.log("\t - Favorites doesn't exist yet (creating)");
            fav = [];
        }else{
            if (fav.includes(((window.location.href).split("/"))[4])){
                // console.log("\t - Favorites has [" + ((window.location.href).split("/"))[4] + "]");
                const index = fav.indexOf(((window.location.href).split("/"))[4]);
                if (index > -1) {
                    fav.splice(index, 1);
                }
            }else{
                // console.log("\t - ERROR: Favorites doesn't have [" + ((window.location.href).split("/"))[4] + "]");
            }
        }

        this.setLocal('favorites', fav);
        // console.log("\t - setting favorites [" + fav + "]");

        // console.log("\t - Reading state was [" + this.state.favorite + "]");
        this.setState(() => ({
            favorite: false
        }))
        // console.log("\t - Setting state to [" + this.state.favorite + "]");
    }

    renderResults(){
        const showTrefleDown = this.state.trefleDown;

        const toggleShowTrefleDown = () => this.setState(() => ({
            trefleDown: false
        }));

        const has_image = (this.state.image_url != null ? true : false);

        var favorites;
        // console.log(this.state.favorite);

        if (this.state.favorite){
            favorites = <Button variant="btn secondary-background" id="fave-button" onClick={() => this.onUnFavorite()}><i aria-label='favoriteIcon' className="fa fa-heart accent" id='favoriteIcon'></i></Button>
        }else {
            favorites = <Button variant="btn secondary-background" id="fave-button" onClick={() => this.onFavorite()}><i aria-label='favoriteIcon' className="fa fa-heart primary" id='favoriteIcon'></i></Button>
        }

        return (
            <Container>
                <Toast show={showTrefleDown} onClose={toggleShowTrefleDown} className='toast'>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Data Sync Error</strong>
                        <small>Error: {this.state.response_status}</small>
                    </Toast.Header>
                    <Toast.Body>Our data source is currently unavailable. Please refresh this page in a few moments!</Toast.Body>
                </Toast>

                <Row className='result-row'>
                    <Col>
                        <Row className='d-flex justify-content-between align-items-center'>
                            <h1><b>{this.state.common_name}</b></h1>
                            <label htmlFor="fave-button" className='d-none'>Favorite</label>
                            {favorites}
                        </Row>
                        <h2><b>{this.state.scientific_name}</b></h2>
                        <p><b className='accent'>Genus</b> {this.state.genus}</p>
                        <p><b className='accent'>Family</b> {this.state.family}</p>
                        <p><b className='accent'>First recorded by</b> {this.state.author} <b className='accent'>in</b> {this.state.bibliography}</p>
                        <p><b className='accent'>Also known as</b> {this.state.common_names}</p>
                    </Col>
                </Row>
                <Row className='result-row'>
                    <Col xs={12} md={6}>
                        <h3><b>Appearance</b></h3>
                        <p><b className='accent'>Flower colors</b> {this.state.flower_color}</p>
                        <p><b className='accent'>Are flowers conspicuous?</b> {this.state.flower_conspicuous}</p>
                        <p><b className='accent'>Flowers bloom during</b> {this.state.bloom_months}</p>
                        <p><b className='accent'>Foliage texture</b> {this.state.texture}</p>
                        <p><b className='accent'>Foliage colors</b> {this.state.colors}</p>
                        <p><b className='accent'>Does foliage stay year-round?</b> {this.state.leaf_retention}</p>
                        <p><b className='accent'>Fruit or seed color</b> {this.state.fruit_or_seed_color}</p>
                        <p><b className='accent'>Fruit or seed shape</b> {this.state.shape}</p>
                        <p><b className='accent'>Are fruit or seeds conspicuous?</b> {this.state.fruit_or_seed_conspicuous}</p>
                        <p><b className='accent'>Fruit grows during</b> {this.state.fruit_months}</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className='image-holder' height='500px'>
                            {has_image ? <img src={this.state.image_url} height='100%' width='100%' alt={this.state.scientific_name}></img> : null}
                        </div>
                    </Col>
                </Row>

                <Row className='result-row'>
                    <Col xs={12} md={6}>
                        <h3><b>Specifications</b></h3>
                        <p><b className='accent'>Shape and orientation</b> {this.state.orientation}</p>
                        <p><b className='accent'>Ligneous type</b> {this.state.ligneous_type}</p>
                        <p><b className='accent'>Growth form</b> {this.state.growth_form}</p>
                        <p><b className='accent'>Growth rate</b> {this.state.growth_rate}</p>
                        <p><b className='accent'>Average height (cm)</b> {this.state.ave_height}</p>
                        <p><b className='accent'>Maximum height (cm)</b> {this.state.max_height}</p>
                        <p><b className='accent'>Nitrogen fixation</b> {this.state.nitrogen}</p>
                        <p><b className='accent'>Toxicity</b> {this.state.toxicity}</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <PlantRadar>
                            light={this.state.light}
                            humidity={this.state.atmospheric_humidity}
                            salinity={this.state.soil_salinity}
                            nutriments={this.state.soil_nutriments}
                            texture={this.state.soil_texture}
                        </PlantRadar>
                    </Col>
                </Row>   

                <Row className='result-row'>
                    <Col xs={12} md={6}>
                        <h3><b>Agricultural Information</b></h3>
                        <p><b className='accent'>Duration</b> {this.state.duration}</p>
                        <p><b className='accent'>Description</b> {this.state.description}</p>
                        <p><b className='accent'>Plant grows during</b> {this.state.growth_months}</p>
                        <p><b className='accent'>Sowing</b> {this.state.sowing}</p>
                        <p><b className='accent'>Days to harvest</b> {this.state.days_to_harvest}</p>
                        <p><b className='accent'>Row spacing (cm)</b> {this.state.row_spacing}</p>
                        <p><b className='accent'>Spread (cm)</b> {this.state.spread}</p>
                        <p><b className='accent'>Precipitation needed (mm)</b> {this.state.min_precip} to {this.state.max_precip}</p>
                        <p><b className='accent'>Minimum root depth (cm)</b> {this.state.min_root_depth}</p>
                        <p><b className='accent'>Temperature range (degrees Fahrenheight)</b> {this.state.min_temp_f} to {this.state.max_temp_f}</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <PhBar>
                            max={this.state.ph_max}
                            min={this.state.ph_min}
                        </PhBar>
                    </Col>
                </Row>
                <Row className='result-row'>
                    <Col>
                        <ClickToShow 
                            header={"Distribution"}
                            category={["Native To", "Introduced To"]}
                            data={[
                                this.state.native,
                                this.state.introduced
                            ]}
                            open={false}
                        />
                    </Col>
                </Row>

                <Row className='result-row'>
                    <Col>
                        <ClickToShow
                            header={'Related Plants'}
                            category={["Synonyms", "Species", "Subspecies", "Varieties",
                                       "Subvarieties", "Hybrids", "Forms"]}
                            data={[
                                this.state.synonyms, 
                                this.state.species, 
                                this.state.subspecies,
                                this.state.varieties,
                                this.state.subvarieties,
                                this.state.hybrids,
                                this.state.forms
                                ]
                            }
                            open={false}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

    render(){
        return(
            this.state.load && this.renderResults()
        )
    }
}

export default Result
