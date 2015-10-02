function Contact(c) {
    if (typeof (c) == 'undefined') {
        this.id = _.uniqueId('con'),
        this.favorite = false,
        this.firstName = "",
        this.lastName = "",
        this.address = new Address(),
        this.notes = ""
    } else {
       this.id = c.id,
       this.favorite = c.favorite,
       this.firstName = c.firstName,
       this.lastName = c.lastName,
       this.address = c.address,
       this.notes = c.notes
    }
}

function Address(a) {
    if (typeof (a) == 'undefined') {
        this.street = "",
        this.city = "",
        this.state =  "",
        this.zip = ""
    } else {
        this.street = a.street || "",
        this.city = a.city || "",
        this.state = a.state || "",
        this.zip = a.zip || ""
    }
}


