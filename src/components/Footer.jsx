import React from "react"

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: "dark"
        };
    }

    render() {
        return(
            <div className={'footer primary-background'}>
                <div className="content">
                    <div className="row">
                        <div className="col-sm">
                            One of three columns
                        </div>
                        <div className="col-sm">
                            One of three columns
                        </div>
                        <div className="col-sm">
                            One of three columns
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm">
                            &copy;{new Date().getFullYear()} Names | All Rights Reserved | <a href="https://github.com/catspook/the-seed-journal">Contribution Guidelines</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer