function Contact(c) {
    this.id = "",
    this.favorite = false,
    this.thumbnail = "default-thumb.jpg"
    this.firstName = "",
    this.lastName = "",
    this.address = new Address(),
    this.notes = "";
    if (typeof (c) != 'undefined') {
        this.id = c.id,
        this.favorite = c.favorite || false,
        this.firstName = c.firstName || "",
        this.lastName = c.lastName || "",
        this.address = c.address || new Address,
        this.notes = c.notes || ""

    }
}

function Address(a) {
       this.street = "",
       this.city = "",
       this.state = "",
       this.zip = "";
    if (typeof (a) != 'undefined') {
        this.street = a.street || "",
        this.city = a.city || "",
        this.state = a.state || "",
        this.zip = a.zip || ""
    }
}


