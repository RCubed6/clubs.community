// Club class datatype for storing club information
class club{
    club(category, name, description, room, time) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.room = room;
        this.time = time;
    }

    addclub(array, club) {
    array.push(club);
    }

}