import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'

class Result extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            slug: '',
            image_url: "http://placekitten.com/g/200/300",
            common_name: 'none listed',
            scientific_name: 'none listed',
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
        }
    }

    componentDidMount() {
        this.afterPageLoads()
    }

    async makeApiCall(url) {
        let response = await fetch(url);

        if (response.status === 200) {
            let json = await response.json();

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
                common_names: (json.data.main_species.common_names.eng !== [] ? (json.data.main_species.common_names.eng).join(", ") : this.state.common_names),
                //distribution
                native: (json.data.main_species.distribution.native !== [] ? (json.data.main_species.distribution.native).join(", ") : this.state.native),
                introduced: (json.data.main_species.distribution.introduced !== [] ? (json.data.main_species.distribution.introduced).join(", ") : this.state.introduced),
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
                growth_months: (json.data.main_species.growth.growth_months != null ? (json.data.main_species.growth.growth_months).join(", ") : this.state.growth_months),
                bloom_months: (json.data.main_species.growth.bloom_months != null ? (json.data.main_species.growth.bloom_months).join(", ") : this.state.bloom_months),
                fruit_months: (json.data.main_species.growth.fruit_months != null ? (json.data.main_species.growth.fruit_months).join(", ") : this.state.fruit_months),
                min_precip: (json.data.main_species.growth.minimum_precipitation.mm != null ? json.data.main_species.growth.minimum_precipitation.mm : this.state.min_precip),
                max_precip: (json.data.main_species.growth.maximum_precipitation.mm != null ? json.data.main_species.growth.maximum_precipitation.mm : this.state.max_precip),
                min_root_depth: (json.data.main_species.growth.minimum_root_depth.cm != null ? json.data.main_species.growth.minimum_root_depth.cm : this.state.min_root_depth),
                min_temp_f: (json.data.main_species.growth.minimum_temperature.deg_f != null ? json.data.main_species.growth.minimum_temperature.deg_f : this.state.min_temp_f),
                max_temp_f: (json.data.main_species.growth.maximum_temperature.deg_f != null ? json.data.main_species.growth.maximum_temperature.deg_f : this.state.max_temp_f),
                synonyms: synonymsList,
                genus: (json.data.genus.name != null ? json.data.genus.name : this.state.genus),
                family_common: (json.data.family.common_name != null ? json.data.family.common_name : this.state.family_common),
                family: (json.data.family.name != null ? json.data.family.name : this.state.family),
                species: speciesList,
                subspecies: subspeciesList,
                varieties: varietiesList,
                hybrids: hybridsList,
                forms: formsList,
                subvarieties: subvarietiesList,
                trefleDown: false
            }))
        }
        else {
            console.log(response.status)
            this.setState(() => ({
                trefleDown: true
            }))
        }
    }

    async afterPageLoads() {
        let url = "https://trefle.io/api/v1/plants/" + ((window.location.href).split("/"))[4] + "?token=" + process.env.REACT_APP_TREFLE_API_TOKEN
        await this.makeApiCall(url)

        this.setState(() => ({
            slug: ((window.location.href).split("/"))[4],
        }))
    }

    renderResults(){
        const showTrefleDown = this.state.trefleDown
        const toggleShowTrefleDown = () => this.setState(() => ({
            trefleDown: false
        }));

        return (
            <Container>
                <Toast show={showTrefleDown} onClose={toggleShowTrefleDown}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Data Sync Error</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>Our data source is currently unavailable. Please refresh this page in a few moments!</Toast.Body>
                </Toast>

                <Row>
                    <Col>
                        <div className='image-holder' height='500px'>
                            <img src={this.state.image_url} height='100%' width='100%' alt={this.state.common_name}></img>
                        </div>
                    </Col>
                    <Col show={!showTrefleDown}>
                        <button className='fav-button'>Favorite</button>
                        <div className='results-container-pic' overflow='auto'>
                            <h1><b>{this.state.common_name}</b></h1>
                            <h3><b>{this.state.scientific_name}</b></h3>
                            <p><b>Genus</b> {this.state.genus}</p>
                            <p><b>Family</b> {this.state.family}</p>
                            <p><b>First recorded by</b> {this.state.author} <b>in</b> {this.state.bibliography}</p>
                            <p><b>Also known as</b> {this.state.common_names}</p>
                            <br />
                            <h4><b>Appearance</b></h4>
                            <p><b>Flower colors</b> {this.state.flower_color}</p>
                            <p><b>Are flowers conspicuous?</b> {this.state.flower_conspicuous}</p>
                            <p><b>Flowers bloom during</b> {this.state.bloom_months}</p>
                            <p><b>Foliage texture</b> {this.state.texture}</p>
                            <p><b>Foliage colors</b> {this.state.colors}</p>
                            <p><b>Does foliage stay year-round?</b> {this.state.leaf_retention}</p>
                            <p><b>Fruit or seed color</b> {this.state.fruit_or_seed_color}</p>
                            <p><b>Fruit or seed shape</b> {this.state.shape}</p>
                            <p><b>Are fruit or seeds conspicuous?</b> {this.state.fruit_or_seed_conspicuous}</p>
                            <p><b>Fruit grows during</b> {this.state.fruit_months}</p>
                            <br />

                            <h4><b>Specifications</b></h4>
                            <p><b>Shape and orientation</b> {this.state.orientation}</p>
                            <p><b>Ligneous type</b> {this.state.ligneous_type}</p>
                            <p><b>Growth form</b> {this.state.growth_form}</p>
                            <p><b>Growth rate</b> {this.state.growth_rate}</p>
                            <p><b>Average height</b> {this.state.ave_height} cm</p>
                            <p><b>Maximum height</b> {this.state.max_height} cm</p>
                            <p><b>Nitrogen fixation</b> {this.state.nitrogen}</p>
                            <p><b>Toxicity</b> {this.state.toxicity}</p>
                            <br />

                            <h4><b>Agricultural Information</b></h4>
                            <p><b>Duration</b> {this.state.duration}</p>
                            <p><b>Description</b> {this.state.description}</p>
                            <p><b>Plant grows during</b> {this.state.growth_months}</p>
                            <p><b>Sowing</b> {this.state.sowing}</p>
                            <p><b>Days to harvest</b> {this.state.days_to_harvest}</p>
                            <p><b>Row spacing</b> {this.state.row_spacing} cm</p>
                            <p><b>Spread</b> {this.state.spread} cm</p>
                            <p><b>pH range</b> {this.state.ph_min} to {this.state.ph_max}</p>
                            <p><b>Precipitation needed</b> {this.state.min_precip} mm to {this.state.max_precip} mm</p>
                            <p><b>Minimum root depth</b> {this.state.min_root_depth} cm</p>
                            <p><b>Temperature range (degrees Fahrenheight)</b> {this.state.min_temp_f} to {this.state.max_temp_f}</p>
                            <br />
                                
                            <h4><b>Distribution</b></h4>
                            <p><b>Native to</b> {this.state.native}</p>
                            <p><b>Introduced to</b> {this.state.introduced}</p>
                            <br />

                            <h4><b>Related Plants</b></h4>
                            <p><b>Synonyms</b> {this.state.synonyms}</p>
                            <p><b>Species</b> {this.state.species}</p>
                            <p><b>Subpecies</b> {this.state.subspecies}</p>
                            <p><b>Varieties</b> {this.state.varieties}</p>
                            <p><b>Hybrids</b> {this.state.hybrids}</p>
                            <p><b>Forms</b> {this.state.forms}</p>
                            <p><b>Subvarieties</b> {this.state.subvarieties}</p>

                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    render(){
        return(
            this.renderResults()
        )
    }
}

export default Result
