import React, {Component} from "react";

// Club class datatype for storing club information

class Club extends Component {
    constructor(category, name, description, room, time) {
        super(category, name, description, room, time);

        this.category = category;
        this.name = name;
        this.description = description;
        this.room = room;
        this.time = time;
    }

    // Get name
    get get_name() {
        return this.name;
    }
}

export default Club;